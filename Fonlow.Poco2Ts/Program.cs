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
                Console.WriteLine("Fonlow.Poco2Ts.exe generates TypeScript data classes from POCO classes decorated by DataContractAttribute.");
                Console.WriteLine("Example:  Fonlow.Poco2Ts.exe MyAssemblyWithPOCO.dll MyOutputTS.ts");
                return;
            }

            var assemblyName = args[0];
            var tsFileName = args[1];
            PocoWalker.Walk(assemblyName, tsFileName);
        }
    }
}
