﻿using System.Linq;
using System.Reflection;
namespace Fonlow.CodeDom
{
	public static class MethodHelper
	{
		public static bool ReturnIsNullableReferenceType(MethodInfo methodInfo)
		{
			CustomAttributeData nullableAttribute = methodInfo.ReturnParameter.CustomAttributes.FirstOrDefault(d => d.AttributeType.FullName == "System.Runtime.CompilerServices.NullableAttribute");
			if (nullableAttribute != null)
			{
				return GetNullableAttributeFirstByteValue(nullableAttribute) == 2;
			}

			CustomAttributeData[] customAttributes = methodInfo.CustomAttributes.ToArray();
			CustomAttributeData nullableContextAttribute = customAttributes.FirstOrDefault(d => d.AttributeType.FullName == "System.Runtime.CompilerServices.NullableContextAttribute");
			if (nullableContextAttribute != null)
			{
				byte v = (byte)(nullableContextAttribute.ConstructorArguments[0].Value);
				CustomAttributeData nullableAttributeInCustomAttribute = methodInfo.ReturnParameter.CustomAttributes.FirstOrDefault(d => d.AttributeType.FullName == "System.Runtime.CompilerServices.NullableAttribute");
				return v == 2 && (nullableAttributeInCustomAttribute == null || GetNullableAttributeFirstByteValue(nullableAttributeInCustomAttribute) == 2);
			}

			CustomAttributeData nullableAttributeOfReflectedType = methodInfo.ReflectedType.CustomAttributes.FirstOrDefault(d => d.AttributeType.FullName == "System.Runtime.CompilerServices.NullableContextAttribute");
			if (nullableAttributeOfReflectedType != null)
			{
				return GetNullableAttributeFirstByteValue(nullableAttributeOfReflectedType) == 2;
			}

			return false;
		}

		static byte GetNullableAttributeFirstByteValue(CustomAttributeData nullableAttribute)
		{
			if (nullableAttribute.ConstructorArguments[0].ArgumentType.IsArray)
			{
				System.Collections.ObjectModel.ReadOnlyCollection<CustomAttributeTypedArgument> typedArguments = (System.Collections.ObjectModel.ReadOnlyCollection<CustomAttributeTypedArgument>)nullableAttribute.ConstructorArguments[0].Value;
				return (byte)typedArguments[0].Value;
			}

			return (byte)nullableAttribute.ConstructorArguments[0].Value;
		}

		static bool NotNullableReturnWithAllNullableReferenceTypes(MethodInfo methodInfo)
		{
			CustomAttributeData[] customAttributes = methodInfo.CustomAttributes.ToArray();
			CustomAttributeData nullableContextAttributeInCustomAttributes = customAttributes.FirstOrDefault(d => d.AttributeType.FullName == "System.Runtime.CompilerServices.NullableContextAttribute");
			if (nullableContextAttributeInCustomAttributes != null)
			{
				byte v = (byte)(nullableContextAttributeInCustomAttributes.ConstructorArguments[0].Value);
				CustomAttributeData nullableAttributeInCustomAttributes = methodInfo.ReturnParameter.CustomAttributes.FirstOrDefault(d => d.AttributeType.FullName == "System.Runtime.CompilerServices.NullableAttribute");
				return v == 2 && (nullableAttributeInCustomAttributes != null && GetNullableAttributeFirstByteValue(nullableAttributeInCustomAttributes) == 1);
			}

			CustomAttributeData nullableAttribute = methodInfo.ReflectedType.CustomAttributes.FirstOrDefault(d => d.AttributeType.FullName == "System.Runtime.CompilerServices.NullableContextAttribute");
			return nullableAttribute != null && GetNullableAttributeFirstByteValue(nullableAttribute) == 2;
		}

		public static bool ParameterIsNullable(MethodInfo methodInfo, ParameterInfo parameterInfo)
		{
			bool returnIsNullable = ReturnIsNullableReferenceType(methodInfo);
			CustomAttributeData[] customAttributes = parameterInfo.CustomAttributes.ToArray();
			if (returnIsNullable)
			{
				return customAttributes.Length == 0;
			}
			else
			{
				if (NotNullableReturnWithAllNullableReferenceTypes(methodInfo))
				{
					return true;
				}

				CustomAttributeData nullableAttribute = customAttributes.FirstOrDefault(d => d.AttributeType.FullName == "System.Runtime.CompilerServices.NullableAttribute");
				return nullableAttribute != null && (byte)nullableAttribute.ConstructorArguments[0].Value == 2;
			}
		}

	}
}
