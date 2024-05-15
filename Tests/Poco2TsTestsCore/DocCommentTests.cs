using Fonlow.DocComment;
using Xunit;

namespace Poco2TsTests
{
	public class DocCommentTest
	{
		[Fact]
		public void TestReadDocComment()
		{
			DocCommentLookup d = DocCommentLookup.Create(@"DemoCoreWebControllers.xml");
			Assert.NotNull(d);
			Assert.Equal("DemoCoreWebControllers", d.XmlDoc.assembly.name);
			docMemberSummary summary = d.GetMember("T:DemoWebApi.Controllers.HeroesController").summary;

			const string expected = "\n            Heroes operations. Decorated by nullable directive.\n            ";
			Assert.Equal(expected, summary.Text[0]);

		}

		[Fact]
		public void TestReadNotExist()
		{
			DocCommentLookup r = DocCommentLookup.Create(@"C:\VsProjects\webapiclientgen\NotExist\App_Data\xmlDocument.xml");
			Assert.Null(r);
		}

	}
}
