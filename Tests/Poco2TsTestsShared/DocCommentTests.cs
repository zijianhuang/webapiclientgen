using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Fonlow.DocComment;

namespace Poco2TsTests
{
    public class DocCommentTest
    {
        [Fact]
        public void TestReadDocComment()
        {
            var d = DocCommentLookup.Create(@"C:\VsProjects\webapiclientgen\DemoCoreWeb\bin\Debug\net5.0\DemoCoreWeb.xml");
            Assert.NotNull(d);
            Assert.Equal("DemoCoreWeb", d.XmlDoc.assembly.name);
            var summary = d.GetMember("T:DemoWebApi.Controllers.HeroesController").summary;

            const string expected = "\n            Heroes operations\n            ";
            Assert.Equal(expected, summary.Text[0]);

        }

        [Fact]
        public void TestReadNotExist()
        {
            var r = DocCommentLookup.Create(@"C:\VsProjects\webapiclientgen\NotExist\App_Data\xmlDocument.xml");
            Assert.Null(r);
        }

    }
}
