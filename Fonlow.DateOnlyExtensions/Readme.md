Customized serialization for DateOnly in ASP.NET Core 6 and above, introduced in .NET 6, for the following clients:

1. .NET 6 clients
1. .NET Framework clients
1. JavaScript clients

This component depends on NewtonSoft.Json and derives from Newtonsoft.Json.JsonConverter, and can be injected to ASP.NET Core pipeline through only `IServiceCollection.AddNewtonsoftJson()`.

**Usages:**
```c#
.AddNewtonsoftJson(
	options =>
	{
		options.SerializerSettings.DateParseHandling = Newtonsoft.Json.DateParseHandling.DateTimeOffset; //Better with this for cross-timezone minValue and .NET Framework clients.
		options.SerializerSettings.NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore; //So when controller will ignore null fileds when returing data

		options.SerializerSettings.Converters.Add(new DateOnlyJsonConverter()); //not needed for ASP.NET 7 and .NET 7 clients. However .NET 6 clients and .NET Framework clients still need DateOnlyJsonConverter
		options.SerializerSettings.Converters.Add(new DateOnlyNullableJsonConverter()); // also, needed by JavaScript clients.
	}
);

```

**Remarks:**

* .NET 7 clients and above do not need this in ASP.NET Core 7 and above.

**Hints:**
* [DateOnly in .NET 6 and ASP.NET Core 6](https://www.codeproject.com/Articles/5325820/DateOnly-in-NET-6-and-ASP-NET-Core-6)
* [DateOnly in ASP.NET 7 with JavaScript Clients](https://www.codeproject.com/Tips/5347111/DateOnly-in-ASP-NET-7-with-JavaScript-Clients)