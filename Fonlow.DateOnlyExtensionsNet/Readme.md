**!For ASP.NET Core 6 only!**

Customized serialization for DateOnly in ASP.NET Core 6 and above.

Similar to Fonlow.DateOnlyExtensions but without using `NewtonSoft.Json`, suitable for ASP.NET Core Web API using `System.Text.Json` only.

**Usage:**

```c#
.AddJsonOptions(
options =>
{
	options.JsonSerializerOptions.Converters.Add(new Fonlow.Text.Json.DateOnlyExtensions.DateOnlyJsonConverter()); //needed by JS clients
	options.JsonSerializerOptions.Converters.Add(new Fonlow.Text.Json.DateOnlyExtensions.DateOnlyNullableJsonConverter());
	//options.JsonSerializerOptions.Converters.Add(new Fonlow.Text.Json.DateOnlyExtensions.DateTimeJsonConverter()); // needed by only .NET Framework clients
	//options.JsonSerializerOptions.Converters.Add(new Fonlow.Text.Json.DateOnlyExtensions.DateTimeNullableJsonConverter());
	//options.JsonSerializerOptions.Converters.Add(new Fonlow.Text.Json.DateOnlyExtensions.DateTimeOffsetJsonConverter()); // needed by only .NET Framework clients
	//options.JsonSerializerOptions.Converters.Add(new Fonlow.Text.Json.DateOnlyExtensions.DateTimeOffsetNullableJsonConverter());

});

```


**Remarks:**

* .NET 7 clients and above do not need this in ASP.NET Core 7 and above.

**Hints:**
* [DateOnly in .NET 6 and ASP.NET Core 6](https://www.codeproject.com/Articles/5325820/DateOnly-in-NET-6-and-ASP-NET-Core-6)
* [DateOnly in ASP.NET 7 with JavaScript Clients](https://www.codeproject.com/Tips/5347111/DateOnly-in-ASP-NET-7-with-JavaScript-Clients)