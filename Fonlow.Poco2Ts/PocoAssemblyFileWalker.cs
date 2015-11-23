using System;
using System.Reflection;
using System.Diagnostics;
using Fonlow.Poco2Client;

namespace Fonlow.Poco2Ts
{
    /// <summary>
    /// Pick types in the assembly for further processing.
    /// </summary>
    public static class PocoAssemblyFileWalker
    {

        /// <summary>
        /// Walk classes in the assembly decorated by cherry picking data annotation attributes, and save TypeScript codes to the file.
        /// </summary>
        /// <param name="assemblyFilePath">Absolute or relative path, including the assembly file extension name dll or exe.</param>
        /// <param name="tsFilePath"></param>
        public static void Walk(string assemblyFilePath, string tsFilePath, CherryPickingMethods methods)
        {
            var absolutePath = System.IO.Path.GetFullPath(assemblyFilePath);
            var assembly = LoadAssembly(absolutePath);
            if (assembly == null)
                return;

            var gen = new Poco2TsGen();
            gen.CreateCodeDom(assembly, methods);
            gen.SaveCodeToFile(tsFilePath);
            Trace.WriteLine($"{tsFilePath} is generated.");
        }


        static Assembly LoadAssembly(string assemblyFileName)
        {
            try
            {
                 return Assembly.LoadFile(assemblyFileName);
            }
            catch (System.IO.FileLoadException e)
            {
                Trace.TraceWarning(String.Format("When loading {0}, errors occur: {1}", assemblyFileName, e.Message));
                return null;
            }
            catch (BadImageFormatException e)
            {
                Trace.TraceWarning(String.Format("When loading {0}, errors occur: {1}", assemblyFileName, e.Message));
                //when file is a win32 dll.
                return null;
            }
            catch (System.IO.FileNotFoundException e)
            {
                Trace.TraceWarning(String.Format("When loading {0}, errors occur: {1}", assemblyFileName, e.Message));
                return null;
            }
            catch (ArgumentException e)
            {
                Trace.TraceWarning(String.Format("When loading {0}, errors occur: {1}", assemblyFileName, e.Message));
                return null;
            }

        }


    }


}

