using Fonlow.TypeScriptCodeDom;
using System.CodeDom;
using System.CodeDom.Compiler;
using System.IO;
using System.Text;
using Xunit;


namespace TypeScriptCodeDomTests
{
	public class TsTypes
	{
		static void AssertCodeTypeDeclaration(CodeTypeDeclaration e, string expected)
		{
			var builder = new StringBuilder();
			var options = new CodeGeneratorOptions() { IndentString = "\t" };
			using (var textWriter = new StringWriter(builder))
			{
				ICodeGenerator gen = new TypeScriptCodeProvider(new TsCodeGenerator(new CodeObjectHelper(false)));
				gen.GenerateCodeFromType(e, textWriter, options);
			}
			var s = builder.ToString();
			Assert.Equal(expected, s);
		}

		[Fact]
		public void TestCodeTypeDeclaration()
		{
			CodeTypeDeclaration newType = new CodeTypeDeclaration("TestType")
			{
				TypeAttributes = System.Reflection.TypeAttributes.NotPublic
			};
			AssertCodeTypeDeclaration(newType,
@"	class TestType {
	}
");

		}

		[Fact]
		public void TestCodeTypeDeclarationWithBaseType()
		{
			CodeTypeDeclaration newType = new CodeTypeDeclaration("TestType")
			{
				TypeAttributes = System.Reflection.TypeAttributes.NotPublic
			};
			newType.BaseTypes.Add("BaseType");
			AssertCodeTypeDeclaration(newType,
@"	class TestType extends BaseType {
	}
");
		}

		[Fact]
		public void TestCodeTypeDeclarationWithBaseTypePublic()
		{
			CodeTypeDeclaration newType = new CodeTypeDeclaration("TestType");
			newType.BaseTypes.Add("BaseType");
			AssertCodeTypeDeclaration(newType,
@"	export class TestType extends BaseType {
	}
");
		}

		[Fact]
		public void TestCodeTypeDeclarationWithMembers()
		{
			CodeTypeDeclaration newType = new CodeTypeDeclaration("TestType")
			{
				TypeAttributes = System.Reflection.TypeAttributes.NotPublic
			};
			newType.Members.Add(new CodeMemberField("string", "name"));
			AssertCodeTypeDeclaration(newType,
@"	class TestType {
		name: string;
	}
");

		}

		[Fact]
		public void TestCodeTypeDeclarationWithPropertyMembers()
		{
			CodeTypeDeclaration newType = new CodeTypeDeclaration("TestType2")
			{
				TypeAttributes = System.Reflection.TypeAttributes.NotPublic
			};


			var p = new CodeMemberProperty()
			{
				Name = "Something",
				Type = new CodeTypeReference(typeof(string)),
				Attributes= MemberAttributes.Public,
			};

			p.GetStatements.Add(new CodeCommentStatement("something before returning"));
			p.GetStatements.Add(new CodeSnippetStatement("return 'abc';"));
			p.SetStatements.Add(new CodeCommentStatement("do nothing"));
			p.SetStatements.Add(new CodeCommentStatement("maybe more later"));
			newType.Members.Add(p);
			AssertCodeTypeDeclaration(newType,
@"	class TestType2 {
		get Something(): string {
				// something before returning
				return 'abc';
		}
		set Something(value: string) {
				// do nothing
				// maybe more later
		}
	}
");

		}


		//[Fact]

		//public void TestTypeOfType()

		//{

		//    Type companyType = typeof(DemoWebApi.DemoData.Company);

		//    var s = companyType.ToString();

		//    Type typeOfType = companyType.GetType();

		//    var s2 = typeOfType.ToString();

		//}

	}
}
