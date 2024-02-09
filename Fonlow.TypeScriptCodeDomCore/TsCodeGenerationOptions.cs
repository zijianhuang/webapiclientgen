using System.CodeDom.Compiler;

namespace Fonlow.TypeScriptCodeDom
{
	/// <summary>
	/// Singleton of CodeGeneratorOptions, with property CamelCase
	/// </summary>
	public class TsCodeGenerationOptions : System.CodeDom.Compiler.CodeGeneratorOptions
	{
		public bool CamelCase { get; set; }

		#region Singleton
		TsCodeGenerationOptions()
		{
		}

		public static TsCodeGenerationOptions Instance { get { return Nested.instance; } }

		private static class Nested
		{
			static Nested()
			{
			}

			internal static readonly TsCodeGenerationOptions instance = new TsCodeGenerationOptions();
		}
		#endregion
	}

}
