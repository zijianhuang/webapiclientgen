For testing the runtime behavior of .NET Core Client with System.Text.Json during serialization, using DemoCoreWeb.ClientApiTextJson.

The codegen.json of DemoCoreWeb should be temporarily changed to:
1. `"UseSystemTextJson": true`
1. `"ClientLibraryProjectFolderName": "..\\..\\..\\..\\..\\DemoCoreWeb.ClientApiTextJson"`


**Remarks:**

* As of .NET 3, 5, 6, 7 and 8, System.Text.Json has been approaching total replacement of Newtonsoft.Json, covering more and more CLR strongly typed data models. 
* However, as of .NET 8, there are still around 27 test cases revealing that what System.Text.Json is not yet capable of.