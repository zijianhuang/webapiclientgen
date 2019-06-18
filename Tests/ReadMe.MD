While this folder contains test suites to be executed in xUnit.NET runners, there are other test suites coded in TypeScript for testing client APIs for jQuery and Angular2+.

1. tests.html with QUnit in DemoWebApi is to ensure codes generated from ASP.NET Web API work well with jQuery.
1. tests.html with QUnit in DemoCoreWeb is to ensure codes generated from .NET Core Web API work well with jQuery.
1. WebApiNG2ClientAuto.spec.ts with "ng test" in DemoNGCli is to ensure generated from either ASP.NET Web API or .NET Core Web API work well with Angular 5+. The base URI is hard-coded, and you need to launch the Web API first, typically using "StartDemoWebApi.ps1" or "StartDemoCoreWeb.ps1".
1. Folder axios contains test suites with jest for testing client library utilizing axios. To test, run `npx jest` after installing npm packages and launching ASP.NET Web API or .NET Core Web API.