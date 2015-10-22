using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Fonlow.Poco2Ts
{
    class Program
    {
        static void Main(string[] args)
        {
            if (args.Length<2)
            {
                Console.WriteLine("Poco2Ts.exe generates TypeScript data  model interfaces from POCO classes decorated by DataContractAttribute.");
                Console.WriteLine("Example:  Fonlow.Poco2Ts.exe MyAssemblyWithPOCO.dll MyOutputTS.ts");
                return;
            }

            var assemblyName = args[0];
            var tsFileName = args[1];
            AppDomain appDomain = AppDomain.CurrentDomain;
            appDomain.AssemblyResolve += AppDomain_AssemblyResolve;
            PocoWalker.Walk(assemblyName, tsFileName);
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
