﻿using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Collections.ObjectModel;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using DemoWebApi.DemoData.Base;
using System.Numerics;
using System.Text.Json.Serialization;

namespace DemoWebApi.DemoData.Base
{
	/// <summary>
	/// Base class of company and person
	/// </summary>
	[DataContract(Namespace = Constants.DataNamespace)]
	public class Entity
	{
		public Entity()
		{
			Addresses = new List<Address>();
		}

		[DataMember]
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
		[DataMember]
		public IList<Address> Addresses { get; set; }


		[DataMember]
		public virtual ObservableCollection<PhoneNumber> PhoneNumbers { get; set; }

		public override string ToString()
		{
			return Name;
		}

		[DataMember]
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

	[DataContract(Namespace = Constants.DataNamespace)]
	public enum AddressType
	{
		[EnumMember]
		Postal,
		[EnumMember]
		Residential,
	};

	[DataContract(Namespace = Constants.DataNamespace)]
	public enum MyEnumType
	{
		[EnumMember]
		First = 1,
		[EnumMember]
		Two = 2,
	};

	[DataContract(Namespace = Constants.DataNamespace)]
	public enum Days
	{
		[EnumMember]
		Sat = 1,
		[EnumMember]
		Sun,
		[EnumMember]
		Mon,
		[EnumMember]
		Tue,
		[EnumMember]
		Wed,
		/// <summary>
		/// Thursday
		/// </summary>
		[EnumMember]
		Thu,
		[EnumMember]
		Fri
	};

	[DataContract(Namespace = Constants.DataNamespace)]
	public class PhoneNumber
	{
		public PhoneNumber()
		{

		}

		public Guid Id { get; set; }


		[DataMember]
		[MaxLength(120), Phone]
		public string FullNumber { get; set; }

		[DataMember]
		public PhoneType PhoneType { get; set; }

		public Guid EntityId { get; set; }
	}


	/// <summary>
	/// Phone type
	/// Tel, Mobile, Skyp and Fax
	/// 
	/// </summary>
	[DataContract(Namespace = Constants.DataNamespace)]
	public enum PhoneType
	{
		/// <summary>
		/// Land line
		/// </summary>
		[EnumMember]
		Tel = 0,

		/// <summary>
		/// Mobile phone
		/// </summary>
		[EnumMember]
		Mobile = 1,

		[EnumMember]
		Skype = 2,
		[EnumMember]
		Fax = 3,
	}

	[DataContract(Namespace = Constants.DataNamespace)]
	public class Address
	{
		[DataMember]
		public Guid Id { get; set; }

		public Entity Entity { get; set; }

		/// <summary>
		/// Foreign key to Entity
		/// </summary>
		public Guid EntityId { get; set; }

		[DataMember]
		[StringLength(100, MinimumLength = 2)]
		public string Street1 { get; set; }

		[DataMember]
		[Length(2, 100)]
		public string Street2 { get; set; }

		[DataMember]
		[StringLength(50, MinimumLength = 2)]
		public string City { get; set; }

		[DataMember]
		[StringLength(30, MinimumLength = 2)]
		public string State { get; set; }

		[DataMember]
		[StringLength(10, MinimumLength = 2)]
		public string PostalCode { get; set; }

		[DataMember]
		[StringLength(30, MinimumLength = 2)]
		[System.ComponentModel.DefaultValue("Australia")]
		public string Country { get; set; }

		[System.ComponentModel.DefaultValue(AddressType.Residential)]
		[DataMember]
		public AddressType Type { get; set; }

		/// <summary>
		/// It is a field
		/// </summary>
		[DataMember]
		public DemoWebApi.DemoData.Another.MyPoint Location;
	}

	[DataContract(Namespace = Constants.DataNamespace)]
	public class IntegralEntity : Entity
	{
		[DataMember]
		public sbyte SByte { get; set; }

		[DataMember]
		public byte Byte { get; set; }

		[DataMember]
		public short Short { get; set; }

		[DataMember]
		public ushort UShort { get; set; }

		[DataMember]
		public int Int { get; set; }

		[DataMember]
		public uint UInt { get; set; }

		[Range(-1000, 1000000)]
		[DataMember]
		public int ItemCount { get; set; }
	}


	[DataContract(Namespace = Constants.DataNamespace)]
	public class Person : Entity
	{
		[DataMember]
		public string Surname { get; set; }
		[DataMember]
		public string GivenName { get; set; }

		/// <summary>
		/// Date of Birth.
		/// This is optional.
		/// </summary>
		[DataMember]
		public DateOnly? DOB { get; set; }

		[DataMember]
		[DataType(DataType.Date)]
		public DateTimeOffset? Baptised { get; set; }

		public override string ToString()
		{
			return Surname + ", " + GivenName;
		}

	}

	[DataContract(Namespace = Constants.DataNamespace)]
	public class BizEntity : Entity {

		[DataMember]
		public DateOnly RegisterDate { get; set; }

		[DataMember]
		[DataType(DataType.Date)]
		public DateTimeOffset FoundDate { get; set; }
	};

	[DataContract(Namespace = Constants.DataNamespace)]
	public class Company : BizEntity
	{
		/// <summary>
		/// BusinessNumber to be serialized as BusinessNum
		/// </summary>
		[DataMember(Name = "business_no")]
		[JsonPropertyName("business_no")]
		public string BusinessNumber { get; set; }

		[DataMember]
		public string BusinessNumberType { get; set; }

		[DataMember]
		public string[][] TextMatrix
		{ get; set; }

		[DataMember]
		public int[][] Int2DJagged;

		[DataMember]
		public int[,] Int2D;

		[DataMember]
		public IEnumerable<string> Lines;

	}

	[DataContract(Namespace = Constants.DataNamespace)]
	public class MyPeopleDic
	{
		[DataMember]
		public IDictionary<string, Person> Dic { get; set; }

		[DataMember]
		public IDictionary<string, string> AnotherDic { get; set; }

		[DataMember]
		public IDictionary<int, string> IntDic { get; set; }

	}

	[DataContract(Namespace = Constants.DataNamespace)]
	public class MimsResult<T>
	{
		[DataMember]
		public T Result { get; set; }
		[DataMember]
		public DateTime GeneratedAt { get; set; }
		[DataMember]
		public bool Success { get; set; } = true;
		[DataMember]
		public string Message { get; set; }
	}

	[DataContract(Namespace = Constants.DataNamespace)]
	public class MimsPackage
	{
		[DataMember]
		public MimsResult<decimal> Result { get; set; }

		[DataMember]
		public string Tag { get; set; }

		[DataMember]
		[Range(10, 100, ErrorMessage = "KK has to be between 10 and 100.")]
		[System.ComponentModel.DefaultValue(20)]
		public int KK { get; set; }

		/// <summary>
		/// Having an initialized value in the property is not like defining a DefaultValueAttribute. Such intialization happens at run time, 
		/// and there's no reliable way for a codegen to know if the value is declared by the programmer, or is actually the natural default value like 0.
		/// </summary>
		[DataMember]
		public int KK2 { get; set; } = 2;

		[DataMember]
		public int? OptionalInt { get; set; }

		[DataMember]
		public MyEnumType? OptionalEnum { get; set; }
	}

	[DataContract(Namespace = Constants.DataNamespace)]
	public class MyGeneric<T, K, U>
	{
		[DataMember]
		public T MyT { get; set; }

		[DataMember]
		public K MyK { get; set; }

		[DataMember]
		public U MyU { get; set; }

		[DataMember]
		public string Status { get; set; }
	}

	[DataContract(Namespace = Constants.DataNamespace)]
	[Newtonsoft.Json.JsonConverter(typeof(Newtonsoft.Json.Converters.StringEnumConverter))]
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

	[DataContract(Namespace = Constants.DataNamespace)]
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
	[DataContract(Namespace = Constants.DataNamespace)]
	public class IdMap
	{
		[DataMember]
		public Guid Id { get; set; }

		[DataMember]
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
	[DataContract(Namespace = Constants.DataNamespace)]
	public class BigNumbers
	{
		[DataMember]
		public long Signed64 { get; set; }

		[DataMember]
		public ulong Unsigned64 { get; set; }

		[DataMember]
		public Int128 Signed128 { get; set; }

		[DataMember]
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
