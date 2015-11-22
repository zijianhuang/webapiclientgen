using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.CodeDom;
using Xunit;
using Fonlow.Poco2Ts;
using Fonlow.Poco2Client;
using Fonlow.TypeScriptCodeDom;
using System.CodeDom.Compiler;
using System.IO;


namespace Poco2TsTests
{
    public class Poco2TsFixture
    {
        public Poco2TsFixture()
        {
            AppDomain appDomain = AppDomain.CurrentDomain;
            DemoWebApi.DemoData.AddressType k = DemoWebApi.DemoData.AddressType.Postal;
            System.Diagnostics.Debug.Write(k);
            var myDataAssembly = appDomain.GetAssemblies().FirstOrDefault(d => d.FullName.Contains("DemoData"));
            if (myDataAssembly == null)
                throw new InvalidOperationException("Hey, how can you miss DemoWebApi.DemoData");

            Gen = new Poco2TsGen();
            //          Gen.CreateTsCodeDom(myDataAssembly, CherryPickingMethods.DataContract);

        }

        public Poco2TsGen Gen { get; private set; }
    }


    public class TsOutput
    {
        static void Verify(Type type, string expected)
        {
            Poco2TsGen gen = new Poco2TsGen();
            gen.CreateTsCodeDom(new Type[] { type }, CherryPickingMethods.DataContract);
            using (var writer = new StringWriter())
            {
                gen.WriteTsCode(writer);
                var s = writer.ToString();
                Assert.Equal(expected, s);
            }
        }

        [Fact]
        public void TestEnumAddressType()
        {
            Verify(typeof(DemoWebApi.DemoData.AddressType),
@"namespace DemoWebApi_DemoData_Client {
    export enum AddressType {Postal, Residential}

}

");
        }

        [Fact]
        public void TestEnumDays()
        {
            Verify(typeof(DemoWebApi.DemoData.Days),
@"namespace DemoWebApi_DemoData_Client {
    export enum Days {Sat=1, Sun=2, Mon=3, Tue=4, Wed=5, Thu=6, Fri=7}

}

");
        }

        [Fact]
        public void TestStrutMyPoint()
        {
            Verify(typeof(DemoWebApi.DemoData.Another.MyPoint),
@"namespace DemoWebApi_DemoData_Another_Client {
    export interface MyPoint {
        X?: number;
        Y?: number;
    }

}

");
        }



    }
}
