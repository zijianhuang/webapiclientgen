Poco2Ts.exe generates TypeScript data  model interfaces from POCO classes decorated by DataContractAttribute, JsonObjectAttribute and SerializableAttribute etc.

# Getting Started
You have POCO classes in assembly DemoWebApi.DemoData.dll, which are decorated by DataContractAttribute, to be used for data models, WCF, Entity Framework Code First and serialization with XML or JSON.

```C#
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
    enum Days
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
        [EnumMember]
        Thu,
        [EnumMember]
        Fri
    };


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


    [DataContract(Namespace = Constants.DataNamespace)]
    public class Entity
    {
        public Entity()
        {
            Addresses = new List<Address>();
        }

        [DataMember]
        public Guid Id { get; set; }

        [DataMember(IsRequired =true)]
        public string Name { get; set; }

        [DataMember]
        public IList<Address> Addresses { get; set; }

        public override string ToString()
        {
            return Name;
        }
    }

    [DataContract(Namespace = Constants.DataNamespace)]
    public class Person : Entity
    {
        [DataMember]
        public string Surname { get; set; }
        [DataMember]
        public string GivenName { get; set; }
        [DataMember]
        public DateTime? BirthDate { get; set; }

        public override string ToString()
        {
            return Surname + ", " + GivenName;
        }

    }

    [DataContract(Namespace = Constants.DataNamespace)]
    public class Company : Entity
    {
        [DataMember]
        public string BusinessNumber { get; set; }

        [DataMember]
        public string BusinessNumberType { get; set; }

        [DataMember]
        public string[][] TextMatrix
        { get; set; }

        [DataMember]
        public int[][][] Int3D;

        [DataMember]
        public IEnumerable<string> Lines;
    }

}

namespace DemoWebApi.DemoData.Another
{
    [DataContract(Namespace = Constants.DataNamespace)]
    public struct MyPoint
    {
        [DataMember]
        public double X;
        [DataMember]
        public double Y;
    }
}
```

After running
```
POCO2TS.exe demowebapi.demodata.dll TypeScriptDataModels.ts
```

TypeScriptDataModels.ts will contain TypeScript interfaces:

```js
namespace DemoWebApi_DemoData_Client {
    export enum AddressType {Postal, Residential}

    export enum Days {Sat=1, Sun=2, Mon=3, Tue=4, Wed=5, Thu=6, Fri=7}

    export interface Address {
        Id?: string;
        Street1?: string;
        Street2?: string;
        City?: string;
        State?: string;
        PostalCode?: string;
        Country?: string;
        Type?: DemoWebApi_DemoData_Client.AddressType;
        Location?: DemoWebApi_DemoData_Another_Client.MyPoint;
    }

    export interface Entity {
        Id?: string;
        Name: string;
        Addresses?: Array<DemoWebApi_DemoData_Client.Address>;
    }

    export interface Person extends DemoWebApi_DemoData_Client.Entity {
        Surname?: string;
        GivenName?: string;
        BirthDate?: Date;
    }

    export interface Company extends DemoWebApi_DemoData_Client.Entity {
        BusinessNumber?: string;
        BusinessNumberType?: string;
        TextMatrix?: Array<Array<string>>;
        Int3D?: Array<Array<Array<number>>>;
        Lines?: Array<string>;
    }

}

namespace DemoWebApi_DemoData_Another_Client {
    export interface MyPoint {
        X?: number;
        Y?: number;
    }

}
```

POCO2TS.exe as a command line program by default will just process all classes decorated by DataContractAttribute and publish those members decorated by DataMemberAttribute. However, members of enum types will be all processed, regardless of EnumMemberAttribute.

Foreign keys in Code First generally should not be exposed to client programs, and they are not decorated by DataMemberAttribute, thus they are not included in the generated TypeScript interfaces.

**Remarks:**

* If demowebapi.demodata.dll has dependency on other assemblies that .NET run time could not resolve, POCO2TS.exe will try to locate the dependency in the same directory of demowebapi.demodata.dll.

**Hints:**

* NewtonSoft.Json is used by default in ASP.NET MVC and Web API for JSON serialization, and NewtonSoft.Json takes care of DataContractAttribute. Thus, using DataContractAttribute for cherry-picking of POCO classes make the integration of the frontend and the Web API more seamless.

## Cherry-picking
While your assembly may contain a lot public classes, you may just want to expose a portion to client programs. POCO2TS supports cherry-picking through data annotations with popular attributes like DataContractAttribute and JsonObjectAttribute etc. Please find out more in [Cherry-picking methods](Cherry-picking-methods).

Please check **[Data Mapping with TypeScript](Data-Mapping-with-TypeScript)**.

## XSD to TypeScript interfaces
Some vendors of Web sites/services may provide XSD files defining plain old data types, you may actually use POCO2TS.exe to generate TypeScript interfaces.

Steps:
1. Generate a CS file from XSD files.
1. Compile the CS file to a .NET assembly.
1. Generate a TypeScript file.

An example batch file XSD2TS.bat is included in POCO2TS.zip available in the DOWNLOADS section.

**Appendix:**
* [Compare with TypeLITE and TypeWriter](Compare-with-TypeLITE-and-TypeWriter)
* [The Advantages of Cherry-Picking with DataContractAttribute](The-Advantages-of-Cherry-Picking-with-DataContractAttribute)


Please also check:

* https://github.com/zijianhuang/webapiclientgen/wiki/POCO2TS.exe
* https://www.codeproject.com/Articles/1247700/Generate-TypeScript-Interfaces-from-POCO-Classes
