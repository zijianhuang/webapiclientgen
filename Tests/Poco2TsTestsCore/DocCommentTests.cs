using Fonlow.DocComment;
using Xunit;

namespace Poco2TsTests
{
	public class DocCommentTest
	{
		[Fact]
		public void TestReadDocComment()
		{
			var d = DocCommentLookup.Create(@"C:\VsProjects\OpenSource\webapiclientgen\DemoCoreWeb\bin\Debug\net6.0\DemoCoreWeb.xml");
			Assert.NotNull(d);
			Assert.Equal("DemoCoreWeb", d.XmlDoc.assembly.name);
			var summary = d.GetMember("T:DemoWebApi.Controllers.HeroesController").summary;

			const string expected = "\n            Heroes operations. Decorated by nullable directive.\n            ";
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
