WebApiClientGen supports primarily Newtonsoft.Json, while System.Text.Json is also well supported. 

There are 2 almost identical Web API services through shared lib of controllers:

1. DemoCoreWeb utilizing Newtonsoft.Json.
1. DemoTextJsonWeb utilizing System.Text.Json.

The local launch of both services use port 5000 by default.

During development, any possible breaking changes should be verified through running all or some tests described following.

## For .NET Clients

There are 2 almost identical .NET test suites through shared codes:

1. IntegrationTestsCore utilizing Newtonsoft.Json and talking to DemoCoreWeb primmarily.
1. IntegrationTestsTextJson utilizing System.Text.Json and talking to DemoTextJsonWeb primarily.

### Test Run 1

Run all xUnit test suites including 2 integration test suites in Test Explorer of VS, or using `Dotnet test`.

### Test Run 2

From time to time, especially after sigificant changes in the codegen, cross talking between Newtonsoft.Json and System.Text.Json should be carried out:

1. Launch DemoCoreWeb through "StartDemoCoreWeb.ps1", then run IntegrationTestsTextJson.
1. Launch DemoTextJsonWeb through "StartDemoTextJsonWeb.ps1", then run IntegrationTestsCore.

**Remarks:**

1. Because both Web API services use the same port 5000, the prelaunched one by PS1 will stay there, while the one launched by the test suite will fail and quit during startup. Therefore, cross talking could happen.
1. When testing with "DemoTextJsonWeb" or "IntegrationTestsTextJson", there will be around 6 failed test cases. This is because some missing features of `System.Text.Json` as of .NET 7. The failed cases are kept to monitor the improvement of `System.Text.Json`.

## For JavaScript / TypeScript Clients

While this folder contains test suites to be executed in xUnit.NET runners, there are other test suites coded in TypeScript for testing client APIs for jQuery and Angular2+ etc.

**Prerequsites**

* JavaScript dependencies are installed.
* Either DemoCoreWeb or DemoTextJsonWeb is running

### Test with jQuery
In folder "DemoCoreWeb", "tests.html" with QUnit in DemoCoreWeb is to ensure codes generated from .NET Core Web API work well with jQuery.

### Test with Angularr 2+

WebApiNG2ClientAuto.spec.ts with "ng test" in folder "HeroesDemo" is to ensure generated from either ASP.NET Web API or .NET Core Web API work well with Angular 5+. The base URI is hard-coded.

### Test with AXIOS

Folder axios contains test suites with jest for testing client library utilizing axios.

### Test with FetchAPI

Folder fetchapi contains test suites with jest for testing client library utilizing axios.

### Test with Aurelia

Folder aurelia contains test suites with karrma for testing client library utilizing axios.


## Summary

With 2 .NET integration test suites and 5 JavaScript/TypeScript integration test suites, a full test requires 7x2 test runs.

### Extra Tests for Cross Time Zone Issues

http://fonlow.org/ hosting DemoTextJsonWeb is located in US east coast with -10:00 Timezone. Two .NET integration test suites and 1 JavaScript test suite should be used to test against this backend from time to time to ensure the generated codes can handle cross time zone issues.

**Hints:**

* When tests are carried out locally, it takes around 0.6-0.7 second to finish around 200 test cases of a .NET integration test suite. When the coversations occur between Australia and USA, it takes around 4.5 seconds.


