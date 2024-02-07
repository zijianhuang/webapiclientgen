[CodeDOM](https://learn.microsoft.com/en-us/dotnet/framework/reflection-and-codedom/using-the-codedom) in .NET (Framework) has come with 3 [providers](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.compiler.codedomprovider):
1. [CSharpCodeProvider](https://learn.microsoft.com/en-us/dotnet/api/microsoft.csharp.csharpcodeprovider?view=dotnet-plat-ext-8.0)
1. [VBCodeProvider](https://learn.microsoft.com/en-us/dotnet/api/microsoft.visualbasic.vbcodeprovider?view=dotnet-plat-ext-8.0)
1. [JScriptCodeProvider](https://learn.microsoft.com/en-us/dotnet/api/microsoft.jscript.jscriptcodeprovider?view=dotnet-plat-ext-8.0)

While JSCriptCodeProvider is good enough for generating JavaScript codes for Internet Explorer while IE had been discoutinued, TypeScriptCodeProvider provides other benefits:
1. Strongly typed interfaces and function prototypes for validation during design time and compile time.
1. Re-use some portion of CodeDOM codes if a code generator toolset like [WebApiClientGen](https://github.com/zijianhuang/webapiclientgen) and [OpenApiClientGen](https://github.com/zijianhuang/openapiclientgen) targets multiple OO languages.
1. Naturally and inheriently adapt the evolution of the JavaScript standard as long as TypeScript will.
1. Live well with TypeScript frameworks like Angular 2+ and Auralia. And with Angular Reactive Forms, [runtime validation](https://github.com/zijianhuang/webapiclientgen/wiki/Angular-Reactive-Forms) could become possible, similar to the use cases of using validation attributes to decorate a member property of a .NET class.

![TypeScript CodeDOM logo](https://raw.githubusercontent.com/zijianhuang/webapiclientgen/master/Doc/icons/TypeScriptCodeDOM128.png)

## What Supported and Not

CodeDOM cover almost every essential C# language features, however, not every features such coverage is applicable to TypeScript.

### [GeneratorSupport Enum](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.compiler.generatorsupport)

```cs
bool ICodeGenerator.Supports(GeneratorSupport supports)
{
	return (supports & supported) != 0;
}

const GeneratorSupport supported = GeneratorSupport.ArraysOfArrays
	| GeneratorSupport.MultidimensionalArrays
	| GeneratorSupport.TryCatchStatements
	| GeneratorSupport.DeclareValueTypes
	| GeneratorSupport.DeclareEnums
	| GeneratorSupport.StaticConstructors
	| GeneratorSupport.DeclareInterfaces
	| GeneratorSupport.DeclareDelegates
	| GeneratorSupport.NestedTypes
	| GeneratorSupport.MultipleInterfaceMembers
	| GeneratorSupport.ComplexExpressions
	| GeneratorSupport.GenericTypeReference
	| GeneratorSupport.GenericTypeDeclaration
   ;
```

### [Supported CodeDOM Classes](https://learn.microsoft.com/en-us/dotnet/api/system.codedom)


```





```

| Class | Unit Tests
| --- | --- |
| [CodeArgumentReferenceExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeargumentreferenceexpression) | TestCodeArgumentReferenceExpression |
| [CodeArrayCreateExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codearraycreateexpression) | TestCodeArrayCreateExpression* |
| [CodeArrayIndexerExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codearrayindexerexpression) | TestCodeArrayIndexerExpression* |
| [CodeAssignStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeassignstatement) | TestCodeAssignStatement |
| [CodeBaseReferenceExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codebasereferenceexpression) | TestCodeBaseReferenceExpression |
| [CodeBinaryOperatorExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codebinaryoperatorexpression) | TestCodeIterationStatement |
| [CodeBinaryOperatorType](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codebinaryoperatortype) | TestCodeIterationStatement |
| [CodeCastExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codecastexpression) | TestCodeCastExpression |
| [CodeCatchClause](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codecatchclause) / [CodeCatchClauseCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codecatchclausecollection) | TestCodeTryCatchFinallyStatement, TestCodeTryCatchFinallyStatement |
| [CodeCommentStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codecommentstatement) / [CodeCommentStatementCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codecommentstatementcollection) | TestCodeCommentStatement* |
| [CodeCompileUnit](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codecompileunit) | indirectly |
| [CodeConditionStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeconditionstatement) | TestCodeConditionStatement* |
| [CodeTypeDelegate](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetypedelegate) | TestCodeTypeDelegate |
| [CodeExpressionStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeexpressionstatement) | TestCodeIterationStatement |
| [CodeExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeexpression) | TestCodeExpression |
| [CodeExpressionCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeexpressioncollection) | indirectly |
| [CodeFieldReferenceExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codefieldreferenceexpression) | TestCodeFieldReferenceExpression |
| [CodeIndexerExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeindexerexpression) | TestCodeIterationStatement |
| [CodeIterationStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeiterationstatement) | TestCodeIterationStatement |
| [CodeMemberField](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codememberfield) | TestCodeTypeDeclarationWithMembers |
| [CodeMemberProperty](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codememberproperty) | TestCodeTypeDeclarationWithPropertyMembers |
| [CodeMethodInvokeExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codemethodinvokeexpression) | TestCodeIterationStatement, TestCodeTryCatchFinallyStatement, TestCodeTryCatchStatement |
| [CodeMethodReferenceExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codemethodreferenceexpression) | TestCodeMethodReferenceExpression, TestCodeMethodReferenceExpressionGeneric, TestCodeIterationStatement |
| [CodeMethodReturnStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codemethodreturnstatement) | TestCodeMethodReturnStatement |
| [CodeNamespace](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codenamespace) / [CodeNamespaceCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codenamespacecollection) | indirectly |
| [CodeObject](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeobject) | indirectly in many derived classes |
| [CodeObjectCreateExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeobjectcreateexpression) | TestCodeObjectCreateExpression* |
| [CodeParameterDeclarationExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeparameterdeclarationexpression) / [CodeParameterDeclarationExpressionCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeparameterdeclarationexpressioncollection) | TestTuple4Callback, TestTupleCallbackSnipet, TestTupleCallbackSnipet, TestCodeParameterDeclarationExpression |
| [CodePrimitiveExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeprimitiveexpression) | TestCodeArrayCreateExpressionWithInit, and many |
| [CodePropertyReferenceExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codepropertyreferenceexpression) | TestCodePropertyReferenceExpression |
| [CodeRegionDirective](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.coderegiondirective) | TestPersonWithRegions, Test2TypesWithRegions |
| [CodeSnippetExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codesnippetexpression) | TestCodeArrayIndexerExpression, and many |
| [CodeStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codestatement) / [CodeStatementCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codestatementcollection) | TestCodeConditionStatementElse, and many |
| [CodeThisReferenceExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codethisreferenceexpression) | TestCodePropertyReferenceExpression, and many |
| [CodeThrowExceptionStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codethrowexceptionstatement) | TestCodeThrowExceptionStatement |
| [CodeTryCatchFinallyStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetrycatchfinallystatement) | TestCodeTryCatchFinallyStatement, TestCodeTryFinallyStatement, TestCodeTryCatchStatement |
| [CodeTypeDeclaration](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetypedeclaration) | TestCodeTypeDeclaration* |
| [CodeTypeDeclarationCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetypedeclarationcollection) | indirectly with namespace.Types |
| [CodeTypeMember](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetypemember) / [CodeTypeMemberCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetypemembercollection) | indirectly |
| [CodeTypeOfExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetypeofexpression) | TestCodeTypeOfExpression |
| [CodeTypeParameter](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetypeparameter) / [CodeTypeParameterCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetypeparametercollection) | indirectly |
| [CodeTypeReference](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetypereference) / [CodeTypeReferenceCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetypereferencecollection) | TestCodeArrayCreateExpressionWithoutInit, and many |
| [CodeTypeReferenceExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetypereferenceexpression) | TestCodeTypeReferenceExpression, TestCodeIterationStatement |
| [CodeVariableDeclarationStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codevariabledeclarationstatement) | TestCodeVariableDeclarationStatement* |
| [CodeVariableReferenceExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codevariablereferenceexpression) | TestCodeVariableReferenceExpression, and many |
| [CodeSnippetTypeMember](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codesnippettypemember) | indirectly |
| [CodeSnippetStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codesnippetstatement) | TestCodeConditionStatement, and many |
| [CodeAttributeArgument](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeattributeargument) / [CodeAttributeArgumentCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeattributeargumentcollection)
 | indirectly |
|  |  |



### CodeDOM features applicable to TypeScript but not Supported in TypeScriptProvider

* [CodeComment](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codecomment)
* [CodeGotoStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codegotostatement)
* [CodeLabeledStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codelabeledstatement)


**Hints:**

* There are integration tests in PocoToTS, WebApiClientGen and OpenApiClientGen, covering some classes like XxxCollection.



[CodeAttachEventStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeattacheventstatement)
[CodeAttributeDeclaration](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeattributedeclaration)
[CodeAttributeDeclarationCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeattributedeclarationcollection)
[CodeChecksumPragma](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codechecksumpragma)
[CodeConstructor](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeconstructor)
[CodeDefaultValueExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codedefaultvalueexpression)
[CodeDelegateCreateExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codedelegatecreateexpression)
[CodeDelegateInvokeExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codedelegateinvokeexpression)
[CodeDirectionExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codedirectionexpression)
[CodeDirective](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codedirective)
[CodeDirectiveCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codedirectivecollection)
[CodeEntryPointMethod](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeentrypointmethod)
[CodeEventReferenceExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeeventreferenceexpression)
[CodeLinePragma](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codelinepragma)
[CodeMemberEvent](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codememberevent)
[CodeMemberMethod](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codemembermethod)
[CodeNamespaceImport](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codenamespaceimport)
[CodeNamespaceImportCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codenamespaceimportcollection)

[CodePropertySetValueReferenceExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codepropertysetvaluereferenceexpression)
[CodeRemoveEventStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.coderemoveeventstatement)
[CodeSnippetCompileUnit](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codesnippetcompileunit)
[CodeTypeConstructor](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetypeconstructor)




Fonlow.TypeScriptCodeDom.TypeScriptCodeProvider supports major TypeScript language features, good enough for generating data models and strongly typed client API codes. Only a [small portion of CodeObject derived classes](CodeObject-Derived-Classes-Not-Supported) are not supported.

* [Getting started with TypeScript CodeDOM](Getting-started-with-TypeScript-CodeDOM)

**Hints:**

TypeScript CodeDOM is a by-product of the development of WebApiClientGen, thus POCO2TS and WebApiClientGen are the first 2 applications of TypeScript CodeDOM. In the future, there may be a spin-off for developing TypeScript CodeDOM following the evolution of TypeScript.

