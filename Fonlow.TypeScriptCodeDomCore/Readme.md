[CodeDOM](https://learn.microsoft.com/en-us/dotnet/framework/reflection-and-codedom/using-the-codedom) in .NET (Framework) has come with 3 [providers](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.compiler.codedomprovider):
1. [CSharpCodeProvider](https://learn.microsoft.com/en-us/dotnet/api/microsoft.csharp.csharpcodeprovider?view=dotnet-plat-ext-8.0)
1. [VBCodeProvider](https://learn.microsoft.com/en-us/dotnet/api/microsoft.visualbasic.vbcodeprovider?view=dotnet-plat-ext-8.0)
1. [JScriptCodeProvider](https://learn.microsoft.com/en-us/dotnet/api/microsoft.jscript.jscriptcodeprovider?view=dotnet-plat-ext-8.0)

While JSCriptCodeProvider is good enough for generating JavaScript codes for Internet Explorer however IE had been discoutinued. TypeScriptCodeProvider provides extra benefits over a "JavaScript Provider":
1. Strongly typed interfaces and function prototypes for validation during design time and compile time.
1. Re-use some portion of CodeDOM codes if a code generator toolset like [WebApiClientGen](https://github.com/zijianhuang/webapiclientgen) and [OpenApiClientGen](https://github.com/zijianhuang/openapiclientgen) targets multiple OO languages.
1. Naturally and inheriently adapt the evolution of the JavaScript standard as long as TypeScript will.
1. Live well with TypeScript frameworks like Angular 2+ and Auralia. And with Angular Reactive Forms, [runtime validation](https://github.com/zijianhuang/webapiclientgen/wiki/Angular-Reactive-Forms) could become possible, similar to the use cases of using validation attributes to decorate a member property of a .NET class.

![TypeScript CodeDOM logo](https://raw.githubusercontent.com/zijianhuang/webapiclientgen/master/Doc/icons/TypeScriptCodeDOM128.png)

## What Supported and Not

CodeDOM cover almost every essential C# language features, however, not every features of such coverage is applicable to TypeScript.

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

Most supported classes are covered by unit testing, while some are covered by integration testing in some code generator projects, marked as "Indirectly" in the table below.

| Class | Unit Tests
| --- | --- |
| [CodeArgumentReferenceExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeargumentreferenceexpression) | TestCodeArgumentReferenceExpression |
| [CodeArrayCreateExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codearraycreateexpression) | TestCodeArrayCreateExpression* |
| [CodeArrayIndexerExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codearrayindexerexpression) | TestCodeArrayIndexerExpression* |
| [CodeAssignStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeassignstatement) | TestCodeAssignStatement |
| [CodeAttributeDeclaration](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeattributedeclaration) / [CodeAttributeDeclarationCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeattributedeclarationcollection) | Test*Decorators |
| [CodeAttributeArgument](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeattributeargument) / [CodeAttributeArgumentCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeattributeargumentcollection) | Indirectly |
| [CodeBaseReferenceExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codebasereferenceexpression) | TestCodeBaseReferenceExpression |
| [CodeBinaryOperatorExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codebinaryoperatorexpression) | TestCodeIterationStatement |
| [CodeBinaryOperatorType](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codebinaryoperatortype) | TestCodeIterationStatement |
| [CodeCastExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codecastexpression) | TestCodeCastExpression |
| [CodeCatchClause](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codecatchclause) / [CodeCatchClauseCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codecatchclausecollection) | TestCodeTryCatchFinallyStatement, TestCodeTryCatchFinallyStatement |
| [CodeCommentStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codecommentstatement) / [CodeCommentStatementCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codecommentstatementcollection) | TestCodeCommentStatement* |
| [CodeCompileUnit](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codecompileunit) | Indirectly |
| [CodeConditionStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeconditionstatement) | TestCodeConditionStatement* |
| [CodeConstructor](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeconstructor) | Indirectly |
| [CodeDirective](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codedirective) / [CodeDirectiveCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codedirectivecollection) | Indirectly with CodeRegionDirective |
| [CodeTypeDelegate](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetypedelegate) | TestCodeTypeDelegate |
| [CodeExpressionStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeexpressionstatement) | TestCodeIterationStatement |
| [CodeExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeexpression) | TestCodeExpression |
| [CodeExpressionCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeexpressioncollection) | Indirectly |
| [CodeFieldReferenceExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codefieldreferenceexpression) | TestCodeFieldReferenceExpression |
| [CodeIndexerExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeindexerexpression) | TestCodeIterationStatement |
| [CodeIterationStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeiterationstatement) | TestCodeIterationStatement |
| [CodeMemberField](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codememberfield) | TestCodeTypeDeclarationWithMembers |
| [CodeMemberMethod](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codemembermethod) | TestCodeTypeDeclarationWithMethodAndParameterDecorators |
| [CodeMemberProperty](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codememberproperty) | TestCodeTypeDeclarationWithPropertyMembers |
| [CodeMethodInvokeExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codemethodinvokeexpression) | TestCodeIterationStatement, TestCodeTryCatchFinallyStatement, TestCodeTryCatchStatement |
| [CodeMethodReferenceExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codemethodreferenceexpression) | TestCodeMethodReferenceExpression, TestCodeMethodReferenceExpressionGeneric, TestCodeIterationStatement |
| [CodeMethodReturnStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codemethodreturnstatement) | TestCodeMethodReturnStatement |
| [CodeNamespace](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codenamespace) / [CodeNamespaceCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codenamespacecollection) | Indirectly |
| [CodeObject](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeobject) | Indirectly in many derived classes |
| [CodeObjectCreateExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeobjectcreateexpression) | TestCodeObjectCreateExpression* |
| [CodeParameterDeclarationExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeparameterdeclarationexpression) / [CodeParameterDeclarationExpressionCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeparameterdeclarationexpressioncollection) | TestTuple4Callback, TestTupleCallbackSnipet, TestTupleCallbackSnipet, TestCodeParameterDeclarationExpression |
| [CodePrimitiveExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeprimitiveexpression) | TestCodeArrayCreateExpressionWithInit, and many |
| [CodePropertyReferenceExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codepropertyreferenceexpression) | TestCodePropertyReferenceExpression |
| [CodeRegionDirective](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.coderegiondirective) | TestPersonWithRegions, Test2TypesWithRegions |
| [CodeSnippetExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codesnippetexpression) | TestCodeArrayIndexerExpression, and many |
| [CodeSnippetStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codesnippetstatement) | TestCodeConditionStatement, and many |
| [CodeSnippetTypeMember](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codesnippettypemember) | Indirectly |
| [CodeStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codestatement) / [CodeStatementCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codestatementcollection) | TestCodeConditionStatementElse, and many |
| [CodeThisReferenceExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codethisreferenceexpression) | TestCodePropertyReferenceExpression, and many |
| [CodeThrowExceptionStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codethrowexceptionstatement) | TestCodeThrowExceptionStatement |
| [CodeTryCatchFinallyStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetrycatchfinallystatement) | TestCodeTryCatchFinallyStatement, TestCodeTryFinallyStatement, TestCodeTryCatchStatement |
| [CodeTypeDeclaration](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetypedeclaration) | TestCodeTypeDeclaration* |
| [CodeTypeDeclarationCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetypedeclarationcollection) | Indirectly with namespace.Types |
| [CodeTypeMember](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetypemember) / [CodeTypeMemberCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetypemembercollection) | Indirectly |
| [CodeTypeOfExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetypeofexpression) | TestCodeTypeOfExpression |
| [CodeTypeParameter](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetypeparameter) / [CodeTypeParameterCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetypeparametercollection) | Indirectly |
| [CodeTypeReference](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetypereference) / [CodeTypeReferenceCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetypereferencecollection) | TestCodeArrayCreateExpressionWithoutInit, and many |
| [CodeTypeReferenceExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetypereferenceexpression) | TestCodeTypeReferenceExpression, TestCodeIterationStatement |
| [CodeVariableDeclarationStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codevariabledeclarationstatement) | TestCodeVariableDeclarationStatement* |
| [CodeVariableReferenceExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codevariablereferenceexpression) | TestCodeVariableReferenceExpression, and many |


**Hints:**

* There are integration tests in PocoToTS, WebApiClientGen and OpenApiClientGen, covering some classes like XxxCollection.

#### Examples Utilizing TypeScriptProvider

* [Unit Testing](https://github.com/zijianhuang/webapiclientgen/tree/master/Tests/TypeScriptCodeDomTestsCore)
* [Integration Testing with PocoToTS](https://github.com/zijianhuang/webapiclientgen/blob/master/Tests/Poco2NgFormTests/TsOutput.cs)
* [Code Generator for Angular Reactive Forms](https://github.com/zijianhuang/webapiclientgen/blob/master/WebApiClientGenCore.NG2FormGroup/CodeObjectHelperForNg2FormGroup.cs)

#### Generated Code Examples

* [Client API codes with typed forms and validators generated from Web API](https://github.com/zijianhuang/webapiclientgen/blob/master/HeroesDemo/src/clientapi/WebApiCoreNG2FormGroupClientAuto.ts)
* [OpenAPI to Angular 5+](https://github.com/zijianhuang/openapiclientgen/blob/master/Tests/SwagTsTests/NG2Results/) and [integration tests for pet.yaml](https://github.com/zijianhuang/openapiclientgen/tree/master/ng2/src)
* [OpenAPI to Angular Reactive Typed Forms](https://github.com/zijianhuang/openapiclientgen/blob/master/Tests/SwagTsTests/NG2FormGroupResults) 
* [OpenAPI to Aurelia](https://github.com/zijianhuang/openapiclientgen/tree/master/Tests/SwagTests/AureliaResults) and [integration tests for pet.yaml](https://github.com/zijianhuang/openapiclientgen/tree/master/aurelia/src)
* [OpenAPI to AXIOS](https://github.com/zijianhuang/openapiclientgen/tree/master/Tests/SwagTests/AxiosResults) and [integration tests for pet.yaml](https://github.com/zijianhuang/openapiclientgen/tree/master/axios/src)
* [OpenAPI to Fetch API](https://github.com/zijianhuang/openapiclientgen/tree/master/Tests/SwagTests/FetchResults) and [integration tests for pet.yaml](https://github.com/zijianhuang/openapiclientgen/tree/master/fetchapi/src)
* [OpenAPI to jQuery](https://github.com/zijianhuang/openapiclientgen/tree/master/Tests/SwagTests/JqResults) and [integration tests for pet.yaml](https://github.com/zijianhuang/openapiclientgen/tree/master/jq/src)



### CodeDOM Features Applicable to TypeScript but not Supported in TypeScriptProvider

* [CodeComment](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codecomment)
* [CodeGotoStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codegotostatement)
* [CodeLabeledStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codelabeledstatement)


### CodeDOM Features Not Applicable to TypeScript

* [CodeAttachEventStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeattacheventstatement)
* [CodeChecksumPragma](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codechecksumpragma)
* [CodeDefaultValueExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codedefaultvalueexpression)
* [CodeDelegateCreateExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codedelegatecreateexpression)
* [CodeDelegateInvokeExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codedelegateinvokeexpression)
* [CodeDirectionExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codedirectionexpression)
* [CodeEntryPointMethod](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeentrypointmethod)
* [CodeEventReferenceExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codeeventreferenceexpression)
* [CodeLinePragma](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codelinepragma)
* [CodeMemberEvent](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codememberevent)
* [CodeNamespaceImport](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codenamespaceimport)
* [CodeNamespaceImportCollection](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codenamespaceimportcollection)
* [CodePropertySetValueReferenceExpression](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codepropertysetvaluereferenceexpression)
* [CodeRemoveEventStatement](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.coderemoveeventstatement)
* [CodeSnippetCompileUnit](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codesnippetcompileunit)
* [CodeTypeConstructor](https://learn.microsoft.com/en-us/dotnet/api/system.codedom.codetypeconstructor) . [Alternative](https://github.com/Microsoft/TypeScript/issues/265).


