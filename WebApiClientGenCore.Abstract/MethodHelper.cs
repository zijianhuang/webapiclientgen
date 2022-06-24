using System.Linq;

namespace Fonlow.CodeDom
{
	public class MethodHelper
	{
		public static bool ReturnIsNullableReferenceType(System.Reflection.MethodInfo methodInfo)
		{
			var customAttributes = methodInfo.CustomAttributes.ToArray();
			if (customAttributes.Length > 0)
			{
				var nullableContextAttribute = customAttributes.FirstOrDefault(d => d.AttributeType.FullName == "System.Runtime.CompilerServices.NullableContextAttribute");
				if (nullableContextAttribute != null)
				{
					var v = (byte)(nullableContextAttribute.ConstructorArguments[0].Value);
					return v == 2 && methodInfo.ReturnParameter.CustomAttributes.FirstOrDefault() == null;
				}
			}

			return false;
		}
	}
}
