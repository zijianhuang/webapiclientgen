using Fonlow.DocComment;
using System;
using Xunit;

namespace Poco2TsTests
{
	public class StringFunctionsTests
	{
		[Fact]
		public void TestRemoveIndentInString()
		{
			const string s = @"    abc
	  efg hijk       
	  lmn
";
			const string expected = @"abc
efg hijk
lmn";
			Assert.Equal(expected, StringFunctions.TrimIndentsOfMultiLineText(s), ignoreLineEndingDifferences: true);
		}

		[Fact]
		public void TestRemoveIndentInStringWithoutTrialNewLine()
		{
			const string s = @"    abc
	  efg hijk       
	  lmn";
			const string expected = @"abc
efg hijk
lmn";
			Assert.Equal(expected, StringFunctions.TrimIndentsOfMultiLineText(s), ignoreLineEndingDifferences: true);
		}

		[Fact]
		public void TestRemoveIndentInOneLine()
		{
			Assert.Equal("abc efg", StringFunctions.TrimIndentsOfMultiLineText("abc efg"));
		}

		[Fact]
		public void TestRemoveIndentOfNull()
		{
			Assert.Null(StringFunctions.TrimIndentsOfMultiLineText(null));
		}

		[Fact]
		public void TestRemoveIndentOfEmpty()
		{
			Assert.Null(StringFunctions.TrimIndentsOfMultiLineText("    "));
		}

		[Fact]
		public void TestRemoveIndentsOfArray()
		{
			string[] s = new string[]
			{
				"    abc",
				"      efg hijk",
				"   lmn"
			};

			System.Collections.Generic.IList<string> refined = StringFunctions.TrimIndentsOfArray(s);
			Assert.Equal("abc", refined[0]);
			Assert.Equal("efg hijk", refined[1]);
			Assert.Equal("lmn", refined[2]);
		}

		[Fact]
		public void TestRemoveIndentsOfArrayOfXmlDocComent()
		{
			string[] s = new string[]
			{
				 @"    abc
	  efg hijk       
	  lmn"
		};

			System.Collections.Generic.IList<string> refined = StringFunctions.TrimIndentsOfArray(s);
			Assert.Equal("abc", refined[0]);
		}

		[Fact]
		public void TestRemoveIndentsOrArrayEmpty()
		{
			Assert.Empty(StringFunctions.TrimIndentsOfArray(new string[] { String.Empty }));
		}


		[Fact]
		public void TestRemoveIndentInStringWithTrialNewLine()
		{
			const string s = @"
	abc
	  efg hijk       
	  lmn

";

			const string expected = @"abc
efg hijk
lmn";
			Assert.Equal(expected, StringFunctions.TrimIndentsOfMultiLineText(s), ignoreLineEndingDifferences: true);
		}

		[Fact]
		public void TestIssue8()
		{
			string s = "this.baseUri+'/api/admin/order/{id}/history+''";
			int p = s.IndexOf("+''");
			Assert.True(p > -1);
		  //  return s.Remove(p, 3);
		}

	}
}
