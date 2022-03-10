# DemoCoreWeb

This Web service contains rich data types and Web API prototypes for covering maximum number of data types in .NET and Web API prototypes in ASP.NET.

# Testing Client API for jQuery

This CS project contains TS codes for testing client API for jQuery, and the test platform is QUnit. And the JS test suites is hosted in the same Web service.

The TS files in Scripts are compiled into `./wwwroot/scripts/` according to `tsconfig.json` when saving, then run "UpdateJqTests.bat" to copy to `bin/Debug/Net6.0/wwwroot'.

After launching DemoCoreWeb, run `tests.html`.


**Hints**
When using the DEBUG build hosting in IIS, you need to modify `DemoCoreWeb.staticwebassets.runtime.json` and change CurrentRoots to:
`"ContentRoots":["C:\\inetpub\\wwwroot\\DemoCoreWebService\\wwwroot\\"]` or alike, absolute path needed.
