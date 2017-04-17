Strongly Typed Client API Generators generate strongly typed client API in C# codes and TypeScript codes. You may then provide or publish either the generated source codes or the compiled client API libraries to other developers for developing client programs.

This project delivers these products:
1. [Code generator for strongly typed client API in C#](https://github.com/zijianhuang/webapiclientgen/wiki/Documentation) supporting desktop, Universal Windows, Android and iOS. 
1. [Code generator for strongly typed client API in TypeScript](https://github.com/zijianhuang/webapiclientgen/wiki/Code-generator-for-strongly-typed-client-API-in-TypeScript) for jQuery and Angular 2.
1. [TypeScript CodeDOM](https://github.com/zijianhuang/webapiclientgen/wiki/TypeScript-CodeDOM), a CodeDOM component for TypeScript, derived from CodeDOM of .NET Framework.
1. [POCO2TS.exe](https://github.com/zijianhuang/webapiclientgen/wiki/POCO2TS.exe), a command line program that generates TypsScript interfaces from POCO classes.
1. [Fonlow.Poco2Ts](https://github.com/zijianhuang/webapiclientgen/wiki/Fonlow.Poco2Ts), a component that generates TypsScript interfaces from POCO classes

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
1. [Generated client API C1. codes](https://github.com/zijianhuang/webapiclientgen/blob/master/DemoWebApi.ClientApi/WebApiClientAuto.cs)
1. [Client codes using the generated library in C#](https://github.com/zijianhuang/webapiclientgen/blob/master/Tests/IntegrationTests/EntitiesApiIntegration.cs)
1. [Generated client data models and API in TypeScript for jQuery](https://github.com/zijianhuang/webapiclientgen/blob/master/DemoWebApi/Scripts/ClientApi/WebApiClientAuto.ts) and [for Angular 2](https://github.com/zijianhuang/webapiclientgen/tree/master/DemoAngular2/clientapi/WebApiNG2ClientAuto.ts)
1. [Client codes using the generated library in TypeScript](https://github.com/zijianhuang/webapiclientgen/blob/master/DemoWebApi/Scripts/tests/demo.tests.ts)

# Downloads
1. [Strongly Typed Client API Generators for ASP.NET Web API](https://www.nuget.org/packages/Fonlow.WebApiClientGen/).
1. [TypeScript CodeDOM](https://www.nuget.org/packages/Fonlow.TypeScriptCodeDOM)
1. [POCO2TS.exe](https://github.com/zijianhuang/webapiclientgen/wiki/POCO2TS.zip)
1. [Fonlow.Poco2TS](https://www.nuget.org/packages/Fonlow.Poco2Ts) 

# Concepts
1. Web API vendors / developers should provide client API libraries to developers of client programs, as Google and Amazon etc. would do in order to make the RESTful Web API reach wider consumers (internal and external) efficiently.
1. To client developers, classic function prototypes like `ReturnType DoSomething(Type1 t1, Type2 t2 ...) ` is the API function, and the rest is the technical implementation details of transportations: TCP/IP, HTTP, SOAP, resource-oriented, CRUD-based URIs, RESTful, XML and JSON etc. The function prototype and a piece of API document should be good enough for calling the API function.
1. The better you have separation of concerns in your Web API design, the more you will benefit from the components of this project in order to deliver business values sooner, with less handcrafted codes , less repetitive tasks and less chances of human mistakes.

# Prerequisites

**Server side:**
1. .NET Framework 4.5
1. ASP.NET Web API 2.2


**.NET client side:**
1. .NET Framework 4.5, or Universal Windows, or Mono.Android, or Xamarin.iOS
1. ASP.NET Web API 2.2 Client Libraries
1. Json.NET of Newtonsoft [for Content-Type application/json](http://www.asp.net/web-api/overview/formats-and-model-binding/content-negotiation)
1. Microsoft Build Tools 2015

**TypeScript client side:**
1. TypeScript compiler
1. jQuery
1. Angular 2/4 and its dependencies in node_modules supported by Node.js and npm.



For more details, please check [WIKI](https://github.com/zijianhuang/webapiclientgen/wiki), and codeproject.com articles at:
1. [Generate C# .NET Client API for ASP.NET Web API](https://www.codeproject.com/Articles/1074039/Generate-Csharp-Client-API-for-ASP-NET-Web-API)
1. [Generate TypeScript Client API for ASP.NET Web API](https://www.codeproject.com/articles/1053601/generate-typescript-client-api-for-asp-net-web-api)
1. [ASP.NET Web API, Angular2, TypeScript and WebApiClientGen](https://www.codeproject.com/Articles/1165571/ASP-NET-Web-API-Angular-TypeScript-and-WebApiClie)
