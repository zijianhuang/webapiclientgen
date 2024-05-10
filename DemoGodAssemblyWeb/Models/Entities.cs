using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Collections.ObjectModel;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using DemoWebApi.DemoData.Base;
using System.Numerics;

namespace DemoWebApi.DemoData.Base
{
	/// <summary>
	/// Base class of company and person
	/// </summary>
	
	public class Entity
	{
		public Entity()
		{
			Addresses = new List<Address>();
		}

		
		public Guid? Id { get; set; }

		/// <summary>
		/// Name of the entity.
		/// </summary>
		[DataMember(IsRequired = true)]//MVC and Web API does not care
		[System.ComponentModel.DataAnnotations.Required]//MVC and Web API care about only this
		[MinLength(2), MaxLength(255)]
		public string Name { get; set; }

		/// <summary>
		/// Multiple addresses
		/// </summary>
		
		public IList<Address> Addresses { get; set; }


		
		public virtual ObservableCollection<PhoneNumber> PhoneNumbers { get; set; }

		public override string ToString()
		{
			return Name;
		}

		
		[RegularExpression(@"https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)")]
		public Uri Web { get; set; }

		[DataMember, EmailAddress, MaxLength(255)]
		public string EmailAddress { get; set; }
	}
}

namespace DemoWebApi.DemoData
{
	public sealed class Constants
	{
		public const string DataNamespace = "http://fonlow.com/DemoData/2014/02";
	}

	
	public enum AddressType
	{
		
		Postal,
		
		Residential,
	};

	
	public enum MyEnumType
	{
		
		First = 1,
		
		Two = 2,
	};

	
	public enum Days
	{
		
		Sat = 1,
		
		Sun,
		
		Mon,
		
		Tue,
		
		Wed,
		/// <summary>
		/// Thursday
		/// </summary>
		
		Thu,
		
		Fri
	};

	
	public class PhoneNumber
	{
		public PhoneNumber()
		{

		}

		public Guid Id { get; set; }


		
		[MaxLength(120), Phone]
		public string FullNumber { get; set; }

		
		public PhoneType PhoneType { get; set; }

		public Guid EntityId { get; set; }
	}


	/// <summary>
	/// Phone type
	/// Tel, Mobile, Skyp and Fax
	/// 
	/// </summary>
	
	public enum PhoneType
	{
		/// <summary>
		/// Land line
		/// </summary>
		
		Tel = 0,

		/// <summary>
		/// Mobile phone
		/// </summary>
		
		Mobile = 1,

		
		Skype = 2,
		
		Fax = 3,
	}

	
	public class Address
	{
		
		public Guid Id { get; set; }

		public Entity Entity { get; set; }

		/// <summary>
		/// Foreign key to Entity
		/// </summary>
		public Guid EntityId { get; set; }

		
		[StringLength(100, MinimumLength = 2)]
		public string Street1 { get; set; }

		
		[StringLength(100, MinimumLength = 2)]
		public string Street2 { get; set; }

		
		[StringLength(50, MinimumLength = 2)]
		public string City { get; set; }

		
		[StringLength(30, MinimumLength = 2)]
		public string State { get; set; }

		
		[StringLength(10, MinimumLength = 2)]
		public string PostalCode { get; set; }

		
		[StringLength(30, MinimumLength = 2)]
		[System.ComponentModel.DefaultValue("Australia")]
		public string Country { get; set; }

		[System.ComponentModel.DefaultValue(AddressType.Residential)]
		
		public AddressType Type { get; set; }

		/// <summary>
		/// It is a field
		/// </summary>
		
		public DemoWebApi.DemoData.Another.MyPoint Location;
	}

	
	public class IntegralEntity : Entity
	{
		
		public sbyte SByte { get; set; }

		
		public byte Byte { get; set; }

		
		public short Short { get; set; }

		
		public ushort UShort { get; set; }

		
		public int Int { get; set; }

		
		public uint UInt { get; set; }

		[Range(-1000, 1000000)]
		
		public int ItemCount { get; set; }
	}


	
	public class Person : Entity
	{
		/// <summary>
		/// 
		/// </summary>
		public string Surname { get; set; }
		
		public string GivenName { get; set; }

		/// <summary>
		/// Date of Birth.
		/// This is optional.
		/// </summary>
		
		public DateOnly? DOB { get; set; }

		
		[DataType(DataType.Date)]
		public DateTimeOffset? Baptised { get; set; }

		public override string ToString()
		{
			return Surname + ", " + GivenName;
		}

	}

	
	public class Company : Entity
	{
		/// <summary>
		/// BusinessNumber to be serialized as BusinessNum
		/// </summary>
		[DataMember(Name = "BusinessNum")]
		public string BusinessNumber { get; set; }

		
		public string BusinessNumberType { get; set; }

		
		public string[][] TextMatrix
		{ get; set; }

		
		public int[][] Int2DJagged;

		
		public int[,] Int2D;

		
		public IEnumerable<string> Lines;

		
		public DateOnly RegisterDate { get; set; }

		
		[DataType(DataType.Date)]
		public DateTimeOffset FoundDate { get; set; }
	}

	
	public class MyPeopleDic
	{
		
		public IDictionary<string, Person> Dic { get; set; }

		
		public IDictionary<string, string> AnotherDic { get; set; }

		
		public IDictionary<int, string> IntDic { get; set; }

	}

	
	public class MimsResult<T>
	{
		
		public T Result { get; set; }
		
		public DateTime GeneratedAt { get; set; }
		
		public bool Success { get; set; } = true;
		
		public string Message { get; set; }
	}

	
	public class MimsPackage
	{
		
		public MimsResult<decimal> Result { get; set; }

		
		public string Tag { get; set; }

		
		[Range(10, 100, ErrorMessage = "KK has to be between 10 and 100.")]
		[System.ComponentModel.DefaultValue(20)]
		public int KK { get; set; }

		/// <summary>
		/// Having an initialized value in the property is not like defining a DefaultValueAttribute. Such intialization happens at run time, 
		/// and there's no reliable way for a codegen to know if the value is declared by the programmer, or is actually the natural default value like 0.
		/// </summary>
		
		public int KK2 { get; set; } = 2;

		
		public int? OptionalInt { get; set; }

		
		public MyEnumType? OptionalEnum { get; set; }
	}

	
	public class MyGeneric<T, K, U>
	{
		
		public T MyT { get; set; }

		
		public K MyK { get; set; }

		
		public U MyU { get; set; }

		
		public string Status { get; set; }
	}

	
	[JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
	public enum MedicalContraindiationResponseTypeReason
	{

		[System.Runtime.Serialization.EnumMemberAttribute(Value = "Mm")]
		M = 0,

		[System.Runtime.Serialization.EnumMemberAttribute(Value = "Ss")]
		S = 1,

		[System.Runtime.Serialization.EnumMemberAttribute(Value = "Pp")]
		P = 2,

		[System.Runtime.Serialization.EnumMemberAttribute(Value = "I")]
		I = 3,

		[System.Runtime.Serialization.EnumMemberAttribute(Value = "A")]
		A = 4,
	}

	
	//[System.Text.Json.Serialization.JsonConverter(typeof(System.Text.Json.Serialization.JsonStringEnumConverter))]
	public enum MedicalContraindiationResponseTypeTypeCode
	{

		[System.Runtime.Serialization.EnumMemberAttribute(Value = "P")]
		P = 0,

		[System.Runtime.Serialization.EnumMemberAttribute(Value = "Tt")]
		T = 1,
	}

	/// <summary>
	/// To test different serializations against Guid
	/// </summary>
	
	public class IdMap
	{
		
		public Guid Id { get; set; }

		
		public Guid? NullableId { get; set; }

		[DataMember(EmitDefaultValue = false)]
		public Guid IdNotEmitDefaultValue { get; set; }

		[DataMember(IsRequired = true)]
		[Required] // ASP.NET with System.Text.Json won't respect DataMember(IsRequired = true), thus add this.
		public string RequiredName { get; set; }

		[DataMember()]
		public string Text { get; set; }
	}

	/// <summary>
	/// 
	/// </summary>
	
	public class BigNumbers
	{
		
		public long Signed64 { get; set; }

		
		public ulong Unsigned64 { get; set; }

		
		public Int128 Signed128 { get; set; }

		
		public UInt128 Unsigned128 { get; set; }

		[DataMember()]
		public BigInteger BigInt { get; set; }
	}

}

namespace DemoWebApi.DemoData.Another
{
	/// <summary>
	/// 2D position
	///         with X and Y
	/// for Demo
	/// </summary>
	[JsonObject]
	public struct MyPoint
	{
		/// <summary>
		/// X
		/// </summary>
		public double X;

		/// <summary>
		/// Y
		/// </summary>
		public double Y;
	}
}
