# DemoCoreWeb

Utilizing Newtonsoft.Json, this Web service contains rich data types and Web API prototypes for covering maximum number of data types in .NET and Web API prototypes in ASP.NET.

# Testing Client API for jQuery

## Build Test

Folder TsScripts contains TypeScript source codes including the client API generated.

Folder Scripts contains JavaScript codes transpiled from what in TsScripts, according to `tsconfig.json`.

Run
```
tsc
```
to transpile.

Remarks:
* Legacy jQuery TypeScript codes typically  "CompileOnSave".

## Run Test
This CS project contains TS codes for testing client API for jQuery, and the test platform is QUnit. And the JS test suites is hosted in the same Web service that supports static files.

After launching DemoCoreWeb, run `http://localhost:5000/tests.html`.

**Remarks**

* Sometimes the launched Web service insists on using cached JS files somewhere, then build DemoCoreWeb and launch again.

