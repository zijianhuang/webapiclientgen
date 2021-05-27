# Settings

## ApiSelection

### ExcludedControllerNames
```c#
/// <summary>
/// To exclude some controllers. For example, [My.Namespace.Home, My.Namespace.FileUpload] for My.Namespace.HomeController and My.Namespace.FileUploadController.
/// </summary>
public string[] ExcludedControllerNames { get; set; }
```

WebApiClientGen is focused on Strong Typed Web API, while some Web APIs not strongly typed. Thus this setting excludes them, otherwise, the generated codes are not usable. For such APIs, it is better to hand craft client codes according to their dynamic behaviors.

### DataModelAssemblyNames and CherryPickingMethods
```c#
/// <summary>
/// To include assemblies containing data models. Assembly names should be without file extension.
/// </summary>
public string[] DataModelAssemblyNames { get; set; }

/// <summary>
/// Cherry picking methods of POCO classes
/// </summary>
public int? CherryPickingMethods { get; set; }
```

It is a good practice to put data models into a stand-alone assembly, so multiple domain sepcific assemblies could access the same data models without acknowledging the other domains. And such practice is good to generating client side data models too, since you may want to expose only a subset of data models used on the server side. Such stand-alone assemblies make it easier to cherry-pick what you would expose through grouping by assembly.
WebApiClientGen will use the same `CherryPickingMethods` for all assemblies defined in `DataModelAssemblyNames`.

**Remarks**

POCO2TS.exe shares the same CherryPickingMethods setting with WebApiClientGen. POCO2TS.exe uses command line argument to define the setting, while WebApiClientGen uses CodeGen.json.


### DataModels
```c#
/// <summary>
/// Similar to DataModelAssemblyNames however, each assembly could have a CherryPickingMethods. An assembly should appear in either DataModelAssemblyNames or DataModels, not both.
/// </summary>
public DataModel[] DataModels { get; set; }

public class DataModel
{
	public string AssemblyName { get; set; }

	public int? CherryPickingMethods { get; set; }
}

```

The server side data models may be used for various purposes and different serialization methods. With `DataModels` you may define a set cherry picking methods for each data model assembly.

## ClientApiOutputs (Applied to C# only)

### CSClientNamespaceSuffix
```c#
/// <summary>
/// The naming of namespace is after the controller's namespace. To distinguish from the server side namespace, it is better to add a suffix like ".Client". The default is ".Client".
/// </summary>
public string CSClientNamespaceSuffix { get; set; } = ".Client";

```

"Proxy " and "Agent" could be good candidates too.

### DataAnnotationsEnabled
```c#
/// <summary>
/// System.ComponentModel.DataAnnotations attributes are to be copied over, including Required, Range, MaxLength, MinLength and StringLength.
/// </summary>
public bool DataAnnotationsEnabled { get; set; }

```

When System.ComponentModel.DataAnnotations attributes are used in the data binding of Web API parameters, .NET runtime may validate the incoming data and throw exceptions with sepecific messages, and the client programs which catch resepctive HTTP errors may display the errors.
If the client API generated is used in a service broker, having these attributes copied over will make the broker have the same abilities of error handling, so the broker handles more of user input errors.

### DataAnnotationsToComments
```c#
/// <summary>
/// System.ComponentModel.DataAnnotations attributes are translated into Doc Comments, 
/// including Required, Range, MaxLength, MinLength, StringLength, DataType and RegularExpression..
/// </summary>
public bool DataAnnotationsToComments { get; set; }

```

Having these in the doc comments is handy for client UI programming. In C#, some UI components may provide data input constraints through reading these attributes.

### DecorateDataModelWithDataContract and DataContractNamespace
```c#
		/// <summary>
		/// Generated data types will be decorated with DataContractAttribute and DataMemberAttribute.
		/// </summary>
		public bool DecorateDataModelWithDataContract { get; set; }

		/// <summary>
		/// When DecorateDataModelWithDataContract is true, this is the namespace of DataContractAttribute. For example, "http://mybusiness.com/09/2019
		/// </summary>
		public string DataContractNamespace { get; set; }
```

The generated client API codes may be used in a service broker based on .NET Web API, WCF or Biztalk. DataContractAttribute is preferred way of cherry picking and data binding.
Another reason why DataContractAttribute is preferred is that DataContractAttbibute supports namespace. This is important in complex business applications, service brokers and Biztalks involving tons of data models for different business domains from different vendors.

### DecorateDataModelWithSerializable
Occasionally you may find decorating data models with SerializableAttribute is useful.

