using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Fonlow.DocComment;

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
            Assert.Equal(expected, StringFunctions.TrimIndentsOfMultiLineText(s));
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
            Assert.Equal(expected, StringFunctions.TrimIndentsOfMultiLineText(s));
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

            var refined = StringFunctions.TrimIndentsOfArray(s);
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

            var refined = StringFunctions.TrimIndentsOfArray(s);
            Assert.Equal("abc", refined[0]);
        }

        [Fact]
        public void TestRemoveIndentsOrArrayEmpty()
        {
            Assert.Equal(0, StringFunctions.TrimIndentsOfArray(new string[] { String.Empty }).Count);
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
            Assert.Equal(expected, StringFunctions.TrimIndentsOfMultiLineText(s));
        }


    }
}
