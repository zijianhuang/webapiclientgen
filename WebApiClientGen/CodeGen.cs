using System;
using Fonlow.Web.Meta;

namespace Fonlow.CodeDom.Web
{
    public static class CodeGen
    {
        public static void GenerateClientAPIs(string webRootPath, CodeGenSettings settings, Fonlow.Web.Meta.WebApiDescription[] apiDescriptions)
        {

            if (!string.IsNullOrWhiteSpace(settings.ClientApiOutputs.ClientLibraryProjectFolderName))
            {
                string clientProjectDir = System.IO.Path.Combine(webRootPath, "..", settings.ClientApiOutputs.ClientLibraryProjectFolderName);
                if (!System.IO.Directory.Exists(clientProjectDir))
                    throw new CodeGenException("ClientLibraryProjectFolderNotExist")
                    {
                        Description= $"{clientProjectDir} not exist."
                    };                  

                var path = System.IO.Path.Combine(clientProjectDir, "WebApiClientAuto.cs");
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
                            Description = $"Invalid TypeScriptFolder {folder}"
                        };
                    }

                    if (!System.IO.Directory.Exists(theFolder))
                    {
                        throw new CodeGenException("TypeScriptFolderNotExist")
                        {
                            Description = $"TypeScriptFolder {theFolder} not exist."
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

        }
    }
}
