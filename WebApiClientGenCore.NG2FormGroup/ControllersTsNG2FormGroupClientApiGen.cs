﻿using Fonlow.TypeScriptCodeDom;

namespace Fonlow.CodeDom.Web.Ts
{
	/// <summary>
	/// Generate Angular 2 TypeScript codes of the client API of the controllers, along with FormGroup creations.
	/// </summary>
	public class ControllersTsNG2FormGroupClientApiGen : ControllersTsNG2ClientApiGen

	{
		/// <summary>
		/// 
		/// </summary>
		/// <param name="jsOutput"></param>
		/// <remarks>The client data types should better be generated through SvcUtil.exe with the DC option. The client namespace will then be the original namespace plus suffix ".client". </remarks>
		public ControllersTsNG2FormGroupClientApiGen(JSOutput jsOutput, bool handleHttpRequestHeaders, Fonlow.Poco2Client.IDocCommentTranslate docCommentTranslate)
			: base(jsOutput, handleHttpRequestHeaders, docCommentTranslate)
		{
			CreatePoco2TsGen(jsOutput.ClientNamespaceSuffix);
		}

		protected override void CreatePoco2TsGen(string clientNamespaceSuffix)
		{
			Poco2TsGen = jsOutput.ApiSelections.CherryPickingMethods == Poco2Client.CherryPickingMethods.ApiOnly ? new Fonlow.Poco2Ts.PocoToTsResponseGen(TargetUnit, clientNamespaceSuffix, jsOutput.HelpStrictMode, CreateCodeObjectHelper(true), jsOutput.ApiSelections.DataModelAssemblyNames, jsOutput.ApiSelections.CherryPickingMethods)
			: new Fonlow.Poco2Ts.PocoToTsResponseGen(TargetUnit, clientNamespaceSuffix, jsOutput.HelpStrictMode, CreateCodeObjectHelper(true)); //CodeObjectHelperForNg2FormGroup
		}

		protected override CodeObjectHelper CreateCodeObjectHelper(bool asModule)
		{
			return new CodeObjectHelperForNg2FormGroup(TargetUnit.Namespaces, jsOutput.NgDateOnlyFormControlEnabled);
		}

		protected override void AddBasicReferences()
		{
			TargetUnit.ReferencedAssemblies.Add("import { Injectable, Inject } from '@angular/core';");
			TargetUnit.ReferencedAssemblies.Add("import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';");
			TargetUnit.ReferencedAssemblies.Add("import { Observable } from 'rxjs';");
			TargetUnit.ReferencedAssemblies.Add("import { FormControl, FormGroup, Validators } from '@angular/forms';");

			if (jsOutput.NgDateOnlyFormControlEnabled)
			{
				TargetUnit.ReferencedAssemblies.Add(@"
function CreateDateOnlyFormControl(){
	const fc = new FormControl<any | null | undefined>(undefined);
	fc.valueChanges.subscribe(v=>{
		if (v && v instanceof Date){
			fc.setValue(v.toLocaleDateString(""sv"").substring(0, 10));
		}
	});

	return fc;
}
");
			}
		}
	}


}