Strongly Typed Client API Generators generate strongly typed client API in C# codes and TypeScript codes. You may then provide or publish either the generated source codes or the compiled client API libraries to other developers for developing client programs.

This project delivers these products:
1. [Code generator for strongly typed client API in C#](https://github.com/zijianhuang/webapiclientgen/wiki/Documentation) supporting .NET Framework, .NET Core and Xamarin.Forms. 
1. [Code generators for strongly typed client API in TypeScript](https://github.com/zijianhuang/webapiclientgen/wiki/Code-generator-for-strongly-typed-client-API-in-TypeScript) for jQuery, Angular 2, Aurelia, Axios and Fetch API.
1. [TypeScript CodeDOM](https://github.com/zijianhuang/webapiclientgen/wiki/TypeScript-CodeDOM), a CodeDOM component for TypeScript, derived from CodeDOM of .NET Framework.
1. [POCO2TS.exe](https://github.com/zijianhuang/webapiclientgen/wiki/POCO2TS.exe), a command line program that generates TypeScript interfaces from POCO classes.
1. [Fonlow.Poco2Ts](https://github.com/zijianhuang/webapiclientgen/wiki/Fonlow.Poco2Ts), a component that generates TypeScript interfaces from POCO classes.


![Packages](/Doc/WebApiClientGen.PNG)

**Hints:**

* The packages could be used independently as long as the usages conform to the dependencies.
* [OpenApiClientGen](https://github.com/zijianhuang/openapiclientgen) based on key components of WebApiClientGen is a spin-off for generating client API codes in C# and TypeScript according to a definition file of Swagger/Open API Specification.

# Key Features
1. Client API codes generated are directly mapped from the Web API controller methods, .NET primitive types and POCO classes. This is similar to what svcutil.exe in WCF has offered.
1. Doc comments of controller methods and POCO classes are copied. 

# Key Benefits

1. WebApiClientGen is seamlessly integrated with ASP.NET Web API with very little steps/overheads to setup, maintain and synchronize between Web API and client APIs, during RAD or Agile Software Development.
1. Support all .NET primitive types including decimal.
1. Support DataTime, DataTimeOffset, Array, Tuple, Dynamic Object, Dictionary and KeyValuePair
1. Strongly typed generated codes are subject to design time type checking and compile time type checking.
1. Provide high level of abstraction, shielding application developers from repetitive technical details of RESTful practices and traditional AJAX calls.  
1. Rich meta info including doc comments make IDE intellisense more helpful, so application developers have less need of reading separated API documents.


# Examples

1. [POCO classes](https://github.com/zijianhuang/webapiclientgen/blob/master/DemoWebApi.DemoData/Entities.cs)
1. [Web API](https://github.com/zijianhuang/webapiclientgen/blob/master/DemoWebApi/Controllers/EntitiesController.cs)
1. [Generated client API C# codes](https://github.com/zijianhuang/webapiclientgen/blob/master/DemoWebApi.ClientApi/WebApiClientAuto.cs)
1. [Client codes using the generated library in C#](https://github.com/zijianhuang/webapiclientgen/blob/master/Tests/IntegrationTests/EntitiesApiIntegration.cs)
1. [Generated client data models and API in TypeScript for jQuery](https://github.com/zijianhuang/webapiclientgen/blob/master/DemoWebApi/Scripts/ClientApi/WebApiClientAuto.ts), [for Angular 2](https://github.com/zijianhuang/webapiclientgen/tree/master/DemoAngular2/clientapi/WebApiNG2ClientAuto.ts), [for Aurelia](https://github.com/zijianhuang/webapiclientgen/blob/master/aurelia/src/clientapi/WebApiAureliaClientAuto.ts) and [for Axios](https://github.com/zijianhuang/webapiclientgen/blob/master/axios/src/clientapi/WebApiAxiosClientAuto.ts)
1. [Client codes using the generated library in TypeScript](https://github.com/zijianhuang/webapiclientgen/blob/master/DemoWebApi/Scripts/tests/demo.tests.ts)

**Remarks:**
1. JavaScript codes compiled from generated TypeScript codes could be used in JS applications, however, obviously no type info will be available, while application programmers may still enjoy intellisense and abstraction from AJAX details.
1. React and Vue.js applications typically use Axios for HTTP requests. Currently [babel](https://github.com/babel/babel) does not support namespaces. So you may not do React TSX programming with generated TypeScript codes. However, this may be changed in near future because of [this pull request](https://github.com/babel/babel/pull/9785).

# Downloads

## For .NET Framework
1. [Strongly Typed Client API Generators for ASP.NET Web API](https://www.nuget.org/packages/Fonlow.WebApiClientGen/)
1. [TypeScript CodeDOM](https://www.nuget.org/packages/Fonlow.TypeScriptCodeDOM)
1. [POCO2TS.exe](https://github.com/zijianhuang/webapiclientgen/wiki/POCO2TS.zip)
1. [Fonlow.Poco2TS](https://www.nuget.org/packages/Fonlow.Poco2Ts) 

### Plugins for TypeScript/JavaScript Frameworks/Libraries

1. [jQuery](https://www.nuget.org/packages/Fonlow.WebApiClientGen.jQuery/) and [HttpClient helper library](https://github.com/zijianhuang/webapiclientgen/blob/master/DemoWebApi/Scripts/ClientApi/HttpClient.ts)
1. [Angular 6+](https://www.nuget.org/packages/Fonlow.WebApiClientGen.NG2/)
1. [AXIOS](https://www.nuget.org/packages/Fonlow.WebApiClientGen.Axios/)
1. [Aurelia](https://www.nuget.org/packages/Fonlow.WebApiClientGen.Aurelia/)
1. [Fetch API](https://www.nuget.org/packages/Fonlow.WebApiClientGen.Fetch/)

## For .NET Core
1. [Strongly Typed Client API Generators for ASP.NET Core Web API](https://www.nuget.org/packages/Fonlow.WebApiClientGenCore/).
1. [TypeScript CodeDOM](https://www.nuget.org/packages/Fonlow.TypeScriptCodeDOMCore)
1. [Fonlow.Poco2TS](https://www.nuget.org/packages/Fonlow.Poco2TsCore) 

### Plugins for TypeScript/JavaScript Frameworks/Libraries

1. [jQuery](https://www.nuget.org/packages/Fonlow.WebApiClientGenCore.jQuery/) and [HttpClient helper library](https://github.com/zijianhuang/webapiclientgen/blob/master/DemoWebApi/Scripts/ClientApi/HttpClient.ts)
1. [Angular 6+](https://www.nuget.org/packages/Fonlow.WebApiClientGenCore.NG2/)
1. [AXIOS](https://www.nuget.org/packages/Fonlow.WebApiClientGenCore.Axios/)
1. [Aurelia](https://www.nuget.org/packages/Fonlow.WebApiClientGenCore.Aurelia/)
1. [Fetch API](https://www.nuget.org/packages/Fonlow.WebApiClientGenCore.Fetch/)

# Concepts
1. Web API vendors / developers should provide client API libraries to developers of client programs, as Google and Amazon etc. would do in order to make the RESTful Web API reach wider consumers (internal and external) efficiently.
1. To client developers, classic function prototypes like `ReturnType DoSomething(Type1 t1, Type2 t2 ...) ` is the API function, and the rest is the technical implementation details of transportations: TCP/IP, HTTP, SOAP, resource-oriented, CRUD-based URIs, RESTful, XML and JSON etc. The function prototype and a piece of API document should be good enough for calling the API function.
1. The better you have separation of concerns in your Web API design, the more you will benefit from the components of this project in order to deliver business values sooner, with less handcrafted codes , less repetitive tasks and less chances of human mistakes.

# Prerequisites

**Server side:**
1. .NET Framework 4.6.2, or .NET Core 3.1
1. ASP.NET Web API 2.2, or ASP.NET Core 3.1

**Remarks:** 

* WebApiClientGenCore v3.5 supports .NET Core 3.1. If your .NET Core API projects are still with .NET Core 2.0/2.1/2.2/3.0, please use previous releases.
* .NET Core 2.x had dependency on Newtonsoft.JSON, while .NET Core 3.0 had been decoupled from Neewtonsoft.JSON and the default serializer is working well in most scenarios except for Tuple, 2D array and anonymous object etc. If you would support these data types or would keep 100% compitability with the serialization of NewtonSoft.JSON, you should explicitly include package `Microsoft.AspNetCore.Mvc.NewtonsoftJson` and add add `AddNewtonsoftJson()` in `Startup.cs`.
* WebApiClientGen v3.0 supports .NET Framework 4.6.2. If your Web API projects are still with .NET Framework 4.5.2, please use previous releases.


**.NET client side:**
1. .NET Framework 4.5.2, or Universal Windows, or Mono.Android, or Xamarin.iOS, or .NET Core 2.0/2.1
1. ASP.NET Web API 2.2 Client Libraries
1. Json.NET of Newtonsoft [for Content-Type application/json](http://www.asp.net/web-api/overview/formats-and-model-binding/content-negotiation)
1. Microsoft Build Tools 2015

**TypeScript client side:**
1. TypeScript compiler
1. jQuery
1. Angular 2-9
1. Aurelia
1. Axios
1. Fetch API



For more details, please check [WIKI](https://github.com/zijianhuang/webapiclientgen/wiki), and codeproject.com articles at:
1. [Generate C# .NET Client API for ASP.NET Web API](https://www.codeproject.com/Articles/1074039/Generate-Csharp-Client-API-for-ASP-NET-Web-API)
1. [Generate TypeScript Client API for ASP.NET Web API](https://www.codeproject.com/articles/1053601/generate-typescript-client-api-for-asp-net-web-api)
1. [ASP.NET Web API, Angular2, TypeScript and WebApiClientGen](https://www.codeproject.com/Articles/1165571/ASP-NET-Web-API-Angular-TypeScript-and-WebApiClie)
1. [Generate C# Client API for ASP.NET Core Web API](https://www.codeproject.com/Articles/1243908/Generate-Csharp-Client-API-for-ASP-NET-Core-Web-AP)

# Demo Applications

The Demo applications in this repository are mainly for testing WebApiClientGen during development. And there are other demo applications in the following repositories, demostrating how real world applications could utilize WebApiClientGen:

1. [WebApiClientGen Examples](https://github.com/zijianhuang/webapiclientgenexamples)
2. [.NET Core Demo](https://github.com/zijianhuang/DemoCoreWeb)
3. [WebApiClientGen vs Swagger](https://github.com/zijianhuang/DemoCoreWeb/tree/SwaggerDemo)

These demo applications are actively maintained and kept up-to-date with the latest frameworks. If you are still staying with some older frameworks like Angular 4 or 5 or .NET Core 2.0, you may navigate to respective tags of the repositories and checkout.
