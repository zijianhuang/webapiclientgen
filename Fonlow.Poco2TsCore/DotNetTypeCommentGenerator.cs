using System;
using System.Collections.Generic;
using System.Numerics;

namespace Fonlow.Poco2Client
{
	public static class DotNetTypeCommentGenerator
	{
		/// <summary>
		/// Match some C# data types to doc comment.
		/// The key is the type of an attribute object. The client codes should call dic.TryGetValue.
		/// This should be used if property or parameter of a numberic type is without doc comment or validation attribute.
		/// </summary>
		/// <returns></returns>
		public static IDictionary<Type, string> Get()
		{
			return generator;
		}

		static readonly IDictionary<Type, string> generator = new Dictionary<Type, string>
		{
			{ typeof(sbyte), "Type: sbyte, -128 to 127" },
			{ typeof(byte), "Type: byte, 0 to 255" },
			{ typeof(short), "Type: short, -32,768 to 32,767" },
			{ typeof(ushort), "Type: ushort, 0 to 65,535" },
			{ typeof(int), "Type: int, -2,147,483,648 to 2,147,483,647" },
			{ typeof(uint), "Type: uint, 0 to 4,294,967,295" },
			{ typeof(long), "Type: long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807" },
			{ typeof(ulong), "Type: ulong, 0 to 18,446,744,073,709,551,615" },
			{ typeof(Int128), "Type: Int128, -170141183460469231731687303715884105728 to 170141183460469231731687303715884105727" },
			{ typeof(UInt128), "Type: UInt128, 0 to 340282366920938463463374607431768211455" },
			{ typeof(BigInteger), "Type: BigInteger" },
			{ typeof(Guid), "Type: GUID" },
			{ typeof(DateOnly), "Type: DateOnly" },
			{ typeof(Uri), "Type: Uri" },
			{ typeof(float), "Type: float" },
			{ typeof(double), "Type: double" },
			{ typeof(decimal), "Type: decimal" },
			{ typeof(char), "Type: char" },
		};
	}
}
