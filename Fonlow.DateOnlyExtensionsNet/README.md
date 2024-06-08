**For ASP.NET Core 6**

**For ASP.NET Core 7 and above, needed by .NET Framework clients, JavaScript clients and any naughty client, since System.Text.Json is a bit less fault tolerant than Newtonsoft.Json**

Customized serialization for DateOnly in ASP.NET Core 6 and above.

Similar to Fonlow.DateOnlyExtensions but without using `NewtonSoft.Json`, suitable for ASP.NET Core Web API using `System.Text.Json` only.

**Usage:**

```c#
.AddJsonOptions(
options =>
{
	//Needed by .NET Framework clients, JavaScript clients and any naughty client, since System.Text.Json is a bit less fault tolerant thant Newtonsoft.Json
	options.JsonSerializerOptions.Converters.Add(new Fonlow.Text.Json.DateOnlyExtensions.DateOnlyJsonConverter());
	options.JsonSerializerOptions.Converters.Add(new Fonlow.Text.Json.DateOnlyExtensions.DateTimeJsonConverter());
	options.JsonSerializerOptions.Converters.Add(new Fonlow.Text.Json.DateOnlyExtensions.DateTimeOffsetJsonConverter());
```

**Hints:**

* Without the converters, naughty clients that provide null to struct will cause 500 error; with the converters, the client will get 400, a bit more graceful, being consistent with the good old Newtonsoft.Json.

**Remarks:**

* .NET 7 clients and above may not need this in ASP.NET Core 7 and above. However, if you have JavaScript clients or other naughty clients that give null to struct, you may want some of the converters not obsolete.

**Hints:**
* [DateOnly in .NET 6 and ASP.NET Core 6](https://www.codeproject.com/Articles/5325820/DateOnly-in-NET-6-and-ASP-NET-Core-6)
* [DateOnly in ASP.NET 7 with JavaScript Clients](https://www.codeproject.com/Tips/5347111/DateOnly-in-ASP-NET-7-with-JavaScript-Clients)