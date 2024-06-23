using Fonlow.CodeDom.Web.Ts;
using Fonlow.Web.Meta;
using System;
using System.Reflection;
using System.Text;

namespace Fonlow.CodeDom.Web
{
	public static class PluginFactory
	{
		/// <summary>
		/// Load the first ICommand type found in the assembly and instantiate it.
		/// </summary>
		/// <param name="assemblyName">The assembly must have a concrete class derived from ICommand, and generally from CommandBase, CommandWithOptions or CommandWithParametersAndOptions;
		/// and the class must have a constructor without parameter that calls a base constructor with proper options type and parameters type.</param>
		/// <param name="jsOutput"></param>
		/// <param name="handleHttpRequestHeaders"></param>
		/// <param name="docCommentTranslate"></param>
		/// <returns>ICommand object. Null if not found</returns>
		/// <exception cref="CodeGenLoadPluginException">Throws when doing loading plugin assembly</exception>
		/// <exception cref="CodeGenReadPluginException">Throws when reading plugin assembly.</exception>
		public static ControllersTsClientApiGenBase CreateImplementationsFromAssembly(string assemblyName, JSOutput jsOutput, bool handleHttpRequestHeaders, Poco2Client.IDocCommentTranslate docCommentTranslate)
		{
			Assembly assembly;
			try
			{
				assembly = Assembly.Load(assemblyName);
				Console.WriteLine("Assembly {0} is loaded for type {1}.", assemblyName, "ICommand");
			}
			catch (Exception ex) when (ex is System.IO.FileLoadException || ex is BadImageFormatException || ex is System.IO.FileNotFoundException || ex is ArgumentException)
			{
				var s = $"When loading plugin {assemblyName}, {ex.GetType().FullName}: {ex.Message}";
				throw new CodeGenLoadPluginException(s, ex);
			}

			ControllersTsClientApiGenBase controllersTsClientApiGen = null;
			try
			{
				foreach (Type type in assembly.GetTypes())
				{
					if (type.IsClass && type.IsSubclassOf(typeof(ControllersTsClientApiGenBase)))
					{
						controllersTsClientApiGen = (ControllersTsClientApiGenBase)Activator.CreateInstance(type, jsOutput, handleHttpRequestHeaders, docCommentTranslate);
						break;
					}
				}

				if (controllersTsClientApiGen == null)
				{
					throw new ArgumentException($"Cannot find derived class of ControllersTsClientApiGenBase from {assemblyName}");
				}

				return controllersTsClientApiGen;

			}
			catch (ReflectionTypeLoadException reflectionTypeLoadException)
			{
				var sb = new StringBuilder();
				foreach (Exception ex in reflectionTypeLoadException.LoaderExceptions)
				{
					sb.AppendLine(String.Format("When reading plugin {0}, GetTypes errors occur: {1}", assemblyName, ex.Message));
				}

				var s = $"When reading plugin {assemblyName}, ReflectionTypeLoadException: {sb.ToString()}";
				throw new CodeGenReadPluginException(s, reflectionTypeLoadException);
			}
			catch (TargetInvocationException ex)
			{
				var s = $"When reading plugin {assemblyName}, {ex.GetType().FullName}: {ex}";
				throw new CodeGenReadPluginException(s, ex);
			}
		}
	}
}
