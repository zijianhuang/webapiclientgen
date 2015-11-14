using System;
using Fonlow.Poco2Client;

namespace Fonlow.Poco2Ts
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length<2)
            {
                Console.WriteLine("Poco2Ts.exe generates TypeScript data model interfaces from POCO classes.");
                Console.WriteLine(@"Example:  
For classes decorated by DataContractAttribute:
  Fonlow.Poco2Ts.exe MyAssemblyWithPOCO.dll MyOutputTS.ts
For classes decorated by Newtonsoft.Json.JsonObjectAttribute:
  Fonlow.Poco2Ts.exe MyAssemblyWithPOCO.dll MyOutputTS.ts /2
For classes decorated by SerializableAttribute:
  Fonlow.Poco2Ts.exe MyAssemblyWithPOCO.dll MyOutputTS.ts /4
For public classes, properties and properties, and use System.ComponentModel.DataAnnotations.RequiredAttribute:
  Fonlow.Poco2Ts.exe MyAssemblyWithPOCO.dll MyOutputTS.ts /8
For all classes, properties and fields
  Fonlow.Poco2Ts.exe MyAssemblyWithPOCO.dll MyOutputTS.ts /0

");
                return;
            }

            var assemblyName = args[0];
            var tsFileName = args[1];
            CherryPickingMethods methods = CherryPickingMethods.DataContract;
            if (args.Length>2)
            {
                methods = ReadMethods(args[2]);
            }
            AppDomain appDomain = AppDomain.CurrentDomain;
            appDomain.AssemblyResolve += AppDomain_AssemblyResolve;
            PocoAssemblyFileWalker.Walk(assemblyName, tsFileName, methods);
        }

        static CherryPickingMethods ReadMethods(string s)
        {
            var r = s.Remove(0, 1);
            int m = 1;
            if (int.TryParse(r, out m))
                return (CherryPickingMethods)m;

            return CherryPickingMethods.DataContract;
        }

        private static System.Reflection.Assembly AppDomain_AssemblyResolve(object sender, ResolveEventArgs args)
        {
            System.Reflection.Assembly assembly;
            try
            {
                if (args.RequestingAssembly == null)
                    return null;

                assembly = System.Reflection.Assembly.Load(args.Name);
                System.Diagnostics.Trace.TraceInformation("Load {0} that {1} depends on.", args.Name, args.RequestingAssembly.FullName);
                return assembly;
            }
            catch (System.IO.FileNotFoundException e)
            {
                System.Diagnostics.Debug.WriteLine(e.ToString());
                var dirOfRequestingAssembly = System.IO.Path.GetDirectoryName(args.RequestingAssembly.Location);
                var assemblyShortName = args.Name.Substring(0, args.Name.IndexOf(','));
                var assemblyFullPath = System.IO.Path.Combine(dirOfRequestingAssembly, assemblyShortName + ".dll");//hopefully nobody would use exe.
                assembly = System.Reflection.Assembly.LoadFrom(assemblyFullPath);
                return assembly;
            }
        }
    }
}
