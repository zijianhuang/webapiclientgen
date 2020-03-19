using System;
using Fonlow.Web.Meta;

namespace Fonlow.CodeDom.Web
{
	public static class CodeGen
	{
		public static void GenerateClientAPIs(string webRootPath, CodeGenSettings settings, WebApiDescription[] webApiDescriptions)
		{
			if (webRootPath == null)//Run the .net core web through dotnet may have IHostingEnvironment.WebRootPath==null
			{
				webRootPath = "";
			}

			var currentDir = System.IO.Directory.GetCurrentDirectory();

			if (!string.IsNullOrWhiteSpace(settings.ClientApiOutputs.ClientLibraryProjectFolderName))
			{
				string csharpClientProjectDir = System.IO.Path.IsPathRooted(settings.ClientApiOutputs.ClientLibraryProjectFolderName) ?
					settings.ClientApiOutputs.ClientLibraryProjectFolderName : System.IO.Path.Combine(webRootPath, settings.ClientApiOutputs.ClientLibraryProjectFolderName);

				if (!System.IO.Directory.Exists(csharpClientProjectDir))
					throw new CodeGenException("Client Library Project Folder Not Exist")
					{
						Description = $"{csharpClientProjectDir} not exist while current directory is {currentDir}"
					};

				var path = System.IO.Path.Combine(csharpClientProjectDir, settings.ClientApiOutputs.FileName);
				var gen = new Cs.ControllersClientApiGen(settings);
				gen.ForBothAsyncAndSync = settings.ClientApiOutputs.GenerateBothAsyncAndSync;
				gen.CreateCodeDom(webApiDescriptions);
				gen.Save(path);
			}


			Func<string, string, string> CreateTsPath = (folder, fileName) =>
			{
				if (!string.IsNullOrEmpty(folder))
				{
					string theFolder;
					try
					{
						theFolder = System.IO.Path.IsPathRooted(folder) ?
							folder : System.IO.Path.Combine(webRootPath, folder);

					}
					catch (ArgumentException e)
					{
						System.Diagnostics.Trace.TraceWarning(e.Message);
						throw new CodeGenException("Invalid TypeScript Folder")
						{
							Description = $"Invalid TypeScriptFolder {folder} while current directory is {currentDir}"
						};
					}

					if (!System.IO.Directory.Exists(theFolder))
					{
						throw new CodeGenException("TypeScript Folder Not Exist")
						{
							Description = $"TypeScriptFolder {theFolder} not exist while current directory is {currentDir}"
						};
					}
					return System.IO.Path.Combine(theFolder, fileName);
				};

				return null;
			};

			if (settings.ClientApiOutputs.Plugins != null)
			{
				foreach (var plugin in settings.ClientApiOutputs.Plugins)
				{
					var jsOutput = new JSOutput
					{
						CamelCase = settings.ClientApiOutputs.CamelCase,
						JSPath = CreateTsPath(plugin.TargetDir, plugin.TSFile),
						AsModule = plugin.AsModule,
						ContentType = plugin.ContentType,
						StringAsString = settings.ClientApiOutputs.StringAsString,

						ApiSelections = settings.ApiSelections,
						ClientNamespaceSuffix=plugin.ClientNamespaceSuffix,
						ContainerNameSuffix=plugin.ContainerNameSuffix,
					};

					var tsGen = PluginFactory.CreateImplementationsFromAssembly(plugin.AssemblyName, jsOutput);
					if (tsGen != null)
					{
						tsGen.CreateCodeDom(webApiDescriptions);
						tsGen.Save();
					}
					else
					{
						var s = $"Cannot instantiate plugin {plugin.AssemblyName}. Please check if the plugin assembly is in place.";
						System.Diagnostics.Trace.TraceError(s);
						throw new CodeGenException(s);
					}
				}
			}
		}
	}
}
