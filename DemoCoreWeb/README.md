# DemoCoreWeb

This Web service contains rich data types and Web API prototypes for covering maximum number of data types in .NET and Web API prototypes in ASP.NET.

# Testing Client API for jQuery

This CS project contains TS codes for testing client API for jQuery, and the test platform is QUnit. And the JS test suites is hosted in the same Web service.

After launching DemoCoreWeb, run `tests.html`.

When saving the TS files, the compilation is done according to tsconfig.json. However, for testing alone with DemoCoreWeb hosted in IIS Express, the JS files are to be copied to wwwroot. And this step is implemented through post build events. Therefore, building after modifying TS files is convenient to refresh the tests running in browser.
