using Fonlow.CodeDom.Web.Ts;
using Fonlow.OpenApiClientGen.ClientTypes;
using System;
using System.Diagnostics;
using System.Reflection;

namespace Fonlow.CodeDom.Web
{
	public sealed class PluginFactory
	{
		PluginFactory()
		{

		}

		/// <summary>
		/// Load the first ICommand type found in the assembly and instantiate it.
		/// </summary>
		/// <param name="assemblyFilePath">Absolute assembly file path. The assembly must have a concrete class derived from ICommand, and generally 
		/// from CommandBase, CommandWithOptions or CommandWithParametersAndOptions;
		/// and the class must have a constructor without parameter that calls a base constructor with proper options type and parameters type.</param>
		/// <param name="jsOutput"></param>
		/// <returns>ICommand object. Null if not found</returns>
		public static ControllersTsClientApiGenBase CreateImplementationsFromAssembly(string assemblyFilePath, Settings settings, JSOutput jsOutput)
		{
			Assembly assembly = null;
			try
			{
				assembly = Assembly.LoadFile(assemblyFilePath); // the main program does not generally has the plugin assembly registered in deps.json, so it is better to load file.
				Trace.TraceInformation("Assembly {0} is loaded for type {1}.", assemblyFilePath, "ICommand");
			}
			catch (System.IO.FileLoadException e)
			{
				Trace.TraceWarning(String.Format("When loading plugin {0}, FileLoadException: {1}", assemblyFilePath, e.Message));
				return null;
			}
			catch (BadImageFormatException e)
			{
				Trace.TraceWarning(String.Format("When loading plugin {0}, BadImageFormatException: {1}", assemblyFilePath, e.Message));
				//when file is a win32 dll.
				return null;
			}
			catch (System.IO.FileNotFoundException e)
			{
				Trace.TraceWarning(String.Format("When loading plugin {0}, FileNotFoundException: {1}", assemblyFilePath, e.Message));
				return null;
			}
			catch (ArgumentException e)
			{
				Trace.TraceWarning(String.Format("When loading plugin {0}, ArgumentException: {1}", assemblyFilePath, e.Message));
				return null;
			}

			ControllersTsClientApiGenBase controllersTsClientApiGen = null;
			try
			{
				foreach (Type type in assembly.GetTypes())
				{
					if (type.IsClass && type.IsSubclassOf(typeof(ControllersTsClientApiGenBase)))
					{
						controllersTsClientApiGen = (ControllersTsClientApiGenBase)Activator.CreateInstance(type, settings, jsOutput);
						break;
					}
				}

				if (controllersTsClientApiGen == null)
				{
					throw new ArgumentException($"Cannot find derived class of ControllersTsClientApiGenBase from {assemblyFilePath}");
				}

				return controllersTsClientApiGen;

			}
			catch (System.IO.FileNotFoundException e)
			{
				Trace.TraceError($"When loading plugin {assemblyFilePath}: {e.Message}");
			}
			catch (ReflectionTypeLoadException e)
			{
				foreach (Exception ex in e.LoaderExceptions)
				{
					Trace.TraceWarning(String.Format("When loading plugin {0}, GetTypes errors occur: {1}", assemblyFilePath, ex.Message));
				}
			}
			catch (TargetInvocationException e)
			{
				Trace.TraceWarning(String.Format("When loading plugin {0}, GetTypes errors occur: {1}", assemblyFilePath, e.Message + "~~" + e.InnerException.Message));
			}

			return null;
		}
	}
}
