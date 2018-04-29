using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Collections.ObjectModel;
using Newtonsoft.Json;

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
        public string Street1 { get; set; }

        [DataMember]
        public string Street2 { get; set; }

        [DataMember]
        public string City { get; set; }

        [DataMember]
        public string State { get; set; }

        [DataMember]
        public string PostalCode { get; set; }

        [DataMember]
        public string Country { get; set; }

        [DataMember]
        public AddressType Type { get; set; }

        [DataMember]
        public DemoWebApi.DemoData.Another.MyPoint Location;
    }

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
        public Guid Id { get; set; }

        /// <summary>
        /// Name of the entity.
        /// </summary>
        [DataMember(IsRequired =true)]//MVC and Web API does not care
        [System.ComponentModel.DataAnnotations.Required]//MVC and Web API care about only this
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
        public Uri Web { get; set; }
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
        public DateTime? DOB { get; set; }

        public override string ToString()
        {
            return Surname + ", " + GivenName;
        }

    }

    [DataContract(Namespace = Constants.DataNamespace)]
    public class Company : Entity
    {
        /// <summary>
        /// BusinessNumber to be serialized as BusinessNum
        /// </summary>
        [DataMember(Name ="BusinessNum")]
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
