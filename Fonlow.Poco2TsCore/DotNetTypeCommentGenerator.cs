using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Numerics;

namespace Fonlow.Poco2Client
{
	public sealed class DotNetTypeCommentGenerator
	{
		/// <summary>
		/// Used if property or parameter of a numberic type is without doc comment or validation attribute.
		/// </summary>
		public DotNetTypeCommentGenerator()
		{

		}

		/// <summary>
		/// Match some C# data types to doc comment.
		/// The key is the type of an attribute object. The client codes should call dic.TryGetValue.
		/// </summary>
		/// <returns></returns>
		public IDictionary<Type, string> Get()
		{
			return generator;
		}

		readonly IDictionary<Type, string> generator = new Dictionary<Type, string>
		{
			{ typeof(sbyte), "sbyte, -128 to 127" },
			{ typeof(byte), "byte, 0 to 255" },
			{ typeof(short), "short, -32,768 to 32,767" },
			{ typeof(ushort), "ushort, 0 to 65,535" },
			{ typeof(int), "int, -2,147,483,648 to 2,147,483,647" },
			{ typeof(uint), "uint, 0 to 4,294,967,295" },
			{ typeof(long), "long, -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807" },
			{ typeof(ulong), "ulong, 0 to 18,446,744,073,709,551,615" },
			{ typeof(Int128), "Int128, -170141183460469231731687303715884105728 to 170141183460469231731687303715884105727" },
			{ typeof(UInt128), "UInt128, 0 to 340282366920938463463374607431768211455" },
			{ typeof(BigInteger), "BigInteger" },
			{ typeof(Guid), "GUID" },
			{ typeof(DateOnly), "DateOnly" },
			{ typeof(Uri), "Uri" },
			{ typeof(float), "float" },
			{ typeof(double), "double" },
			{ typeof(decimal), "decimal" },
			{ typeof(char), "char" },
		};
	}
}
