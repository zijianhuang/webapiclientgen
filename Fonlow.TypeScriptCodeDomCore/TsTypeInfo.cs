namespace Fonlow.TypeScriptCodeDom
{
	public class TsTypeInfo
	{
		public TypeOfType TypeOfType { get; set; }
	}

	public enum TypeOfType { IsInterface, IsClass, IsEnum }

}
