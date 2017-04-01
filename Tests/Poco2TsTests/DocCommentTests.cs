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
            var d = DocCommentLookup.Create(@"C:\VsProjects\webapiclientgen\DemoWebApi\App_Data\xmlDocument.xml");
            Assert.NotNull(d);
            Assert.Equal("DemoWebApi", d.XmlDoc.assembly.name);
            Assert.Contains("Use this class to customize the Help Page", d.GetMember("T:DemoWebApi.Areas.HelpPage.HelpPageConfig").summary.Text[0]);

        }

        [Fact]
        public void TestReadNotExist()
        {
            var r = DocCommentLookup.Create(@"C:\VsProjects\webapiclientgen\NotExist\App_Data\xmlDocument.xml");
            Assert.Null(r);
        }

    }
}
