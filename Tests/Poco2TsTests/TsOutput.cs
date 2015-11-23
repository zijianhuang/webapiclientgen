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
    public class TsOutput
    {
        static void Verify(Type type, string expected)
        {
            var gen = new Poco2TsGen();
            gen.CreateCodeDom(new Type[] { type }, CherryPickingMethods.DataContract);
            using (var writer = new StringWriter())
            {
                gen.WriteCode(writer);
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
