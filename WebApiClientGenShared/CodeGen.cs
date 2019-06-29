using System;
using Fonlow.Web.Meta;

namespace Fonlow.CodeDom.Web
{
	public static class CodeGen
	{
		public static void GenerateClientAPIs(string webRootPath, CodeGenSettings settings, Fonlow.Web.Meta.WebApiDescription[] apiDescriptions)
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
					throw new CodeGenException("ClientLibraryProjectFolderNotExist")
					{
						Description = $"{csharpClientProjectDir} not exist while current directory is {currentDir}"
					};

				var path = System.IO.Path.Combine(csharpClientProjectDir, "WebApiClientAuto.cs");
				var gen = new Fonlow.CodeDom.Web.Cs.ControllersClientApiGen(settings);
				gen.ForBothAsyncAndSync = settings.ClientApiOutputs.GenerateBothAsyncAndSync;
				gen.CreateCodeDom(apiDescriptions);
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
					catch (System.ArgumentException e)
					{
						System.Diagnostics.Trace.TraceWarning(e.Message);
						throw new CodeGenException("InvalidTypeScriptFolder")
						{
							Description = $"Invalid TypeScriptFolder {folder} while current directory is {currentDir}"
						};
					}

					if (!System.IO.Directory.Exists(theFolder))
					{
						throw new CodeGenException("TypeScriptFolderNotExist")
						{
							Description = $"TypeScriptFolder {theFolder} not exist while current directory is {currentDir}"
						};
					}
					return System.IO.Path.Combine(theFolder, fileName);
				};

				return null;
			};


			var jQueryPath = CreateTsPath(settings.ClientApiOutputs.TypeScriptJQFolder, settings.ClientApiOutputs.TypeScriptJQFile);
			if (!String.IsNullOrEmpty(jQueryPath))
			{
				var jQueryOutput = new JSOutput(settings, jQueryPath, false);
				var tsGen = new Fonlow.CodeDom.Web.Ts.ControllersTsClientApiGen(jQueryOutput);
				tsGen.CreateCodeDom(apiDescriptions);
				tsGen.Save();
			}

			var ng2Path = CreateTsPath(settings.ClientApiOutputs.TypeScriptNG2Folder, settings.ClientApiOutputs.TypeScriptNG2File);
			if (!String.IsNullOrEmpty(ng2Path))
			{
				var ng2Output = new JSOutput(settings, ng2Path, true);
				var tsGen = new Fonlow.CodeDom.Web.Ts.ControllersTsNG2ClientApiGen(ng2Output);
				tsGen.CreateCodeDom(apiDescriptions);
				tsGen.Save();
			}

			var axiosPath = CreateTsPath(settings.ClientApiOutputs.TypeScriptAxiosFolder, settings.ClientApiOutputs.TypeScriptAxiosFile);
			if (!String.IsNullOrEmpty(axiosPath))
			{
				var axiosOutput = new JSOutput(settings, axiosPath, true);
				var tsGen = new Fonlow.CodeDom.Web.Ts.ControllersTsAxiosClientApiGen(axiosOutput);
				tsGen.CreateCodeDom(apiDescriptions);
				tsGen.Save();
			}

			var aureliaPath = CreateTsPath(settings.ClientApiOutputs.TypeScriptAureliaFolder, settings.ClientApiOutputs.TypeScriptAureliaFile);
			if (!String.IsNullOrEmpty(aureliaPath))
			{
				var aureliaOutput = new JSOutput(settings, aureliaPath, true);
				var tsGen = new Fonlow.CodeDom.Web.Ts.ControllersTsAureliaClientApiGen(aureliaOutput);
				tsGen.CreateCodeDom(apiDescriptions);
				tsGen.Save();
			}

		}
	}
}
