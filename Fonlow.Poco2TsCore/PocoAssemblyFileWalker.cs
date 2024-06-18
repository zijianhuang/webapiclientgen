using System;
using System.Reflection;
using System.Diagnostics;
using Fonlow.Poco2Client;
using System.CodeDom;

namespace Fonlow.Poco2Ts
{
	/// <summary>
	/// Pick types in the assembly for further processing.
	/// </summary>
	public static class PocoAssemblyFileWalker
	{

		/// <summary>
		/// Walk classes in the assembly decorated by cherry picking data annotation attributes, and save TypeScript codes to the file.
		/// </summary>
		/// <param name="assemblyFilePath">Absolute or relative path, including the assembly file extension name dll or exe.</param>
		/// <param name="tsFilePath">TypeScript output file path.</param>
		/// <param name="methods"></param>
		/// <param name="clientNamespaceSuffix"></param>
		/// <param name="dataAnnotationsToComments"></param>
		/// <param name="helpStrictMode"></param>
		public static void Walk(string assemblyFilePath, string tsFilePath, CherryPickingMethods methods, string clientNamespaceSuffix, bool dataAnnotationsToComments, bool helpStrictMode)
		{
			string absolutePath = System.IO.Path.GetFullPath(assemblyFilePath);
			Assembly assembly = LoadAssemblyFile(absolutePath);
			if (assembly == null)
				return;

			DocComment.DocCommentLookup lookup = Fonlow.DocComment.DocCommentLookup.Create(DocComment.DocCommentLookup.GetXmlPath(assembly));
			CodeCompileUnit targetUnit = new CodeCompileUnit();
			Poco2TsGen gen = new Poco2TsGen(targetUnit, clientNamespaceSuffix, helpStrictMode, new TypeScriptCodeDom.CodeObjectHelper(true));
			gen.CreateCodeDomInAssembly(assembly, methods, lookup, dataAnnotationsToComments);
			gen.SaveCodeToFile(tsFilePath);
			string msg = $"{tsFilePath} is generated.";
			Console.WriteLine(msg);
			Trace.WriteLine(msg);
		}

		static Assembly LoadAssemblyFile(string assemblyFilePath)
		{
			try
			{
				return Assembly.LoadFrom(assemblyFilePath);
			}
			catch (Exception ex) when (ex is System.IO.FileLoadException || ex is BadImageFormatException || ex is System.IO.FileNotFoundException || ex is ArgumentException )
			{
				string msg = String.Format("When loading {0}, errors occur: {1}", assemblyFilePath, ex.Message);
				Console.WriteLine(msg);
				Trace.TraceWarning(msg);
				return null;
			}
		}


	}


}

