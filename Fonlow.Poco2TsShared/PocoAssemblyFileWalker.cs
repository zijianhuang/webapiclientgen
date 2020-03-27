using System;
using System.Reflection;
using System.Diagnostics;
using Fonlow.Poco2Client;

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
		public static void Walk(string assemblyFilePath, string tsFilePath, CherryPickingMethods methods, string clientNamespaceSuffix, bool dataAnnotationsToComments)
		{
			var absolutePath = System.IO.Path.GetFullPath(assemblyFilePath);
			var assembly = LoadAssembly(absolutePath);
			if (assembly == null)
				return;

			var lookup = Fonlow.DocComment.DocCommentLookup.Create(DocComment.DocCommentLookup.GetXmlPath(assembly));
			var gen = new Poco2TsGen();
			gen.CreateCodeDom(assembly, methods, lookup, clientNamespaceSuffix, dataAnnotationsToComments);
			gen.SaveCodeToFile(tsFilePath);
			var msg = $"{tsFilePath} is generated.";
			Console.WriteLine(msg);
			Trace.WriteLine(msg);
		}

		static Assembly LoadAssembly(string assemblyFileName)
		{
			try
			{
				return Assembly.LoadFile(assemblyFileName);
			}
			catch (Exception ex) when (ex is System.IO.FileLoadException || ex is BadImageFormatException || ex is System.IO.FileNotFoundException || ex is ArgumentException )
			{
				var msg = String.Format("When loading {0}, errors occur: {1}", assemblyFileName, ex.Message);
				Console.WriteLine(msg);
				Trace.TraceWarning(msg);
				return null;
			}
		}


	}


}

