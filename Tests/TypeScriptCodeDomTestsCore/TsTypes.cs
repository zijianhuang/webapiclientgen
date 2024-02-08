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
				Attributes = MemberAttributes.Public,
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

		[Fact]
		public void TestCodeTypeDelegate()
		{
			var myDelegate = new CodeTypeDelegate("MyDelegate");
			myDelegate.Parameters.Add(new CodeParameterDeclarationExpression("string", "name"));
			myDelegate.Parameters.Add(new CodeParameterDeclarationExpression("number", "count"));
			myDelegate.ReturnType = new CodeTypeReference("string");

			AssertCodeTypeDeclaration(myDelegate,
@"	export type MyDelegate = (name: string, count: number) => string;
");

		}

		[Fact]
		public void TestCodeTypeDeclarationWithMembersAndClassDecorators()
		{
			CodeTypeDeclaration newType = new CodeTypeDeclaration("TestType")
			{
				TypeAttributes = System.Reflection.TypeAttributes.NotPublic
			};
			newType.Members.Add(new CodeMemberField("string", "name"));
			newType.CustomAttributes.Add(new CodeAttributeDeclaration("sealed"));
			AssertCodeTypeDeclaration(newType,
@"	@sealed
	class TestType {
		name: string;
	}
");
		}


		[Fact]
		public void TestCodeTypeDeclarationWithMembersAndClassDecoratorsWithInterface()
		{
			CodeTypeDeclaration newType = new CodeTypeDeclaration("TestType")
			{
				TypeAttributes = System.Reflection.TypeAttributes.NotPublic
			};
			newType.Members.Add(new CodeMemberField("string", "name"));
			//var targetClass = new CodeTypeDeclaration("Injectable")
			//{
			//	TypeAttributes = TypeAttributes.Public | TypeAttributes.Interface, //setting IsInterface has no use
			//};

			var c = new CodeTypeReference("Injectable");
			c.UserData.Add("TsTypeInfo", new TsTypeInfo { TypeOfType = TypeOfType.IsInterface });
			newType.CustomAttributes.Add(new CodeAttributeDeclaration(c));
			AssertCodeTypeDeclaration(newType,
@"	@Injectable()
	class TestType {
		name: string;
	}
");
		}

		/// <summary>
		/// TypeScript disallows decorating both the get and set accessor for a single member. 
		/// Instead, all decorators for the member must be applied to the first accessor specified in document order. 
		/// This is because decorators apply to a Property Descriptor, which combines both the get and set accessor, not each declaration separately.
		/// </summary>
		[Fact]
		public void TestCodeTypeDeclarationWithPropertyMembersAndAccessorDecorators()
		{
			CodeTypeDeclaration newType = new CodeTypeDeclaration("TestType2")
			{
				TypeAttributes = System.Reflection.TypeAttributes.NotPublic
			};


			var p = new CodeMemberProperty()
			{
				Name = "Something",
				Type = new CodeTypeReference(typeof(string)),
				Attributes = MemberAttributes.Public,
			};

			var newAtr = new CodeAttributeDeclaration("SomeAttr");
			newAtr.Arguments.Add(new CodeAttributeArgument(new CodeSnippetExpression("false")));
			p.CustomAttributes.Add(newAtr);

			p.GetStatements.Add(new CodeCommentStatement("something before returning"));
			p.GetStatements.Add(new CodeSnippetStatement("return 'abc';"));
			p.SetStatements.Add(new CodeCommentStatement("do nothing"));
			p.SetStatements.Add(new CodeCommentStatement("maybe more later"));
			newType.Members.Add(p);
			AssertCodeTypeDeclaration(newType,
@"	class TestType2 {
		@SomeAttr(false)
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

		[Fact]
		public void TestCodeTypeDeclarationWithMembersAndPropertyDecorators()
		{
			CodeTypeDeclaration newType = new CodeTypeDeclaration("TestType")
			{
				TypeAttributes = System.Reflection.TypeAttributes.NotPublic
			};

			var f = new CodeMemberField("string", "name");
			var newAtr = new CodeAttributeDeclaration("format");
			newAtr.Arguments.Add(new CodeAttributeArgument(new CodeSnippetExpression("'Hello, %s'")));
			f.CustomAttributes.Add(newAtr);

			newType.Members.Add(f);
			newType.CustomAttributes.Add(new CodeAttributeDeclaration("sealed"));
			AssertCodeTypeDeclaration(newType,
@"	@sealed
	class TestType {
		@format('Hello, %s')
		name: string;
	}
");
		}

		[Fact]
		public void TestCodeTypeDeclarationWithMethodAndParameterDecorators()
		{
			CodeTypeDeclaration newType = new CodeTypeDeclaration("TestType")
			{
				TypeAttributes = System.Reflection.TypeAttributes.NotPublic
			};
			newType.Members.Add(new CodeMemberField("string", "name"));
			var m = new CodeMemberMethod() { 
				Name="doSomething",
				ReturnType = new CodeTypeReference("System.Int32"),
			};

			var mp = new CodeParameterDeclarationExpression("System.Int32", "pp");
			mp.CustomAttributes.Add(new CodeAttributeDeclaration("required"));
			m.Parameters.Add(mp);

			var newAtr = new CodeAttributeDeclaration("enumerable");
			newAtr.Arguments.Add(new CodeAttributeArgument(new CodeSnippetExpression("false")));
			m.CustomAttributes.Add(newAtr);

			newType.Members.Add(m);
			AssertCodeTypeDeclaration(newType,
@"	class TestType {
		name: string;
		@enumerable(false)
		doSomething(@required pp: number): number {
		}
	}
");

		}


	}
}
