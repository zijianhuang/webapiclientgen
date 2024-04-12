WebApiClientGen supports primarily Newtonsoft.Json, while System.Text.Json is also well supported. 

There are 2 almost identical Web API services through shared lib of controllers:

1. DemoCoreWeb utilizing Newtonsoft.Json.
1. DemoTextJsonWeb utilizing System.Text.Json.

The local launch of both services use port 5000 by default.

There are 2 almost identical test suites through shared codes:

1. IntegrationTestsCore utilizing Newtonsoft.Json and talking to DemoCoreWeb primmarily.
1. IntegrationTestsTextJson utilizing System.Text.Json and talking to DemoTextJsonWeb primarily.

From time to time, especially after sigificant changes in the codegen, cross talking between Newtonsoft.Json and System.Text.Json should be carried out:

1. Launch DemoCoreWeb through "StartDemoCoreWeb.ps1", then run IntegrationTestsTextJson.
1. Launch DemoTextJsonWeb through "StartDemoTextJsonWeb.ps1", then run IntegrationTestsCore.

**Remarks:**

1. Because both Web API services use the same port 5000, the prelaunched one by PS1 will stay there, while the one launched by the test suite will fail and quit during startup. Therefore, cross talking could happen.

### For JavaScript / TypeScript

While this folder contains test suites to be executed in xUnit.NET runners, there are other test suites coded in TypeScript for testing client APIs for jQuery and Angular2+.

1. tests.html with QUnit in DemoCoreWeb is to ensure codes generated from .NET Core Web API work well with jQuery.
1. WebApiNG2ClientAuto.spec.ts with "ng test" in DemoNGCli is to ensure generated from either ASP.NET Web API or .NET Core Web API work well with Angular 5+. The base URI is hard-coded, and you need to launch the Web API first, typically using "StartDemoWebApi.ps1" or "StartDemoCoreWeb.ps1".
1. Folder axios contains test suites with jest for testing client library utilizing axios. To test, run `npx jest` after installing npm packages and launching ASP.NET Web API or .NET Core Web API.