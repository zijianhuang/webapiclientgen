using System;
using System.Collections.Generic;
using System.Text;
using System.Text.RegularExpressions;
using System.Reflection;
using Fonlow.CodeDom.Web.Ts;
using System.Diagnostics;

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
		/// <param name="assemblyName">The assembly must have a concrete class derived from ICommand, and generally from CommandBase, CommandWithOptions or CommandWithParametersAndOptions;
		/// and the class must have a constructor without parameter that calls a base constructor with proper options type and parameters type.</param>
		/// <param name="jsOutput"></param>
		/// <param name="handleHttpRequestHeaders"></param>
		/// <param name="docCommentTranslate"></param>
		/// <returns>ICommand object. Null if not found</returns>
		public static ControllersTsClientApiGenBase CreateImplementationsFromAssembly(string assemblyName, JSOutput jsOutput, bool handleHttpRequestHeaders, Poco2Client.DocCommentTranslate docCommentTranslate)
		{
			Assembly assembly;
			try
			{
				assembly = Assembly.Load(assemblyName);
				Trace.TraceInformation("Assembly {0} is loaded for type {1}.", assemblyName, "ICommand");
			}
			catch (System.IO.FileLoadException e)
			{
				Trace.TraceWarning(String.Format("When loading plugin {0}, FileLoadException: {1}", assemblyName, e.Message));
				return null;
			}
			catch (BadImageFormatException e)
			{
				Trace.TraceWarning(String.Format("When loading plugin {0}, BadImageFormatException: {1}", assemblyName, e.Message));
				//when file is a win32 dll.
				return null;
			}
			catch (System.IO.FileNotFoundException e)
			{
				Trace.TraceWarning(String.Format("When loading plugin {0}, FileNotFoundException: {1}", assemblyName, e.Message));
				return null;
			}
			catch (ArgumentException e)
			{
				Trace.TraceWarning(String.Format("When loading plugin {0}, ArgumentException: {1}", assemblyName, e.Message));
				return null;
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
			catch (ReflectionTypeLoadException e)
			{
				foreach (Exception ex in e.LoaderExceptions)
				{
					Trace.TraceWarning(String.Format("When loading plugin {0}, GetTypes errors occur: {1}", assemblyName, ex.Message));
				}
			}
			catch (TargetInvocationException e)
			{
				Trace.TraceWarning(String.Format("When loading plugin {0}, GetTypes errors occur: {1}", assemblyName, e.Message + "~~" + e.InnerException.Message));
			}

			return null;
		}
	}
}
