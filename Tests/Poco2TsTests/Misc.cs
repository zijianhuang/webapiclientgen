using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Poco2TsTests
{
    public class Misc
    {
        [Fact]
        public void TestUriTemplate()
        {
            UriTemplate template = new UriTemplate("weather/{state}/{city}?forecast={day}");
            Uri prefix = new Uri("http://localhost");

            foreach (string name in template.PathSegmentVariableNames)
            {
                Console.WriteLine("     {0}", name);
            }


            Console.WriteLine("QueryValueVariableNames:");
            foreach (string name in template.QueryValueVariableNames)
            {
                System.Diagnostics.Trace.WriteLine("{0}", name);
            }

        }

    }
}
