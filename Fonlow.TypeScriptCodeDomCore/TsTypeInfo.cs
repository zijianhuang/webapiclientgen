namespace Fonlow.TypeScriptCodeDom
{
	/// <summary>
	/// Used in UserData to deliver type info to a code generator.
	/// </summary>
	public class TsTypeInfo
	{
		public TypeOfType TypeOfType { get; set; }
	}

	/// <summary>
	/// To give signal to a code generator which could decide adjustments for outputs.
	/// </summary>
	public enum TypeOfType { IsInterface, IsClass, IsEnum }

}
