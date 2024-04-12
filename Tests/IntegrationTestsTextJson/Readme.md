For testing the runtime behavior of .NET Core Client API codes utilizing System.Text.Json rather than Newtonsoft.Json.

The primary test endpoint is DemoTextJsonWeb. And DemoCoreWeb that uses Newtonsoft.Json should be used as well from time to time.

**Hints:**

* When testing with DemoCoreWeb, just launch DemoCoreWeb first, then the auto launch of DemoTextJsonWeb will fail, and the test suite will actually talk to DemoCoreWeb.


**Remarks:**

* As of .NET 3, 5, 6, 7 and 8, System.Text.Json has been approaching total replacement of Newtonsoft.Json, covering more and more CLR strongly typed data models. 
* However, as of .NET 8, there are still around 6 test cases failed revealing that what System.Text.Json is not yet capable of, when talking to DemoTextJsonWeb. Please read the doc documents of failed cases for details.
* When talking to DemoCoreWeb, 4 cases failed.
* Class TextJsonNegativeCases documents the behaviors of system.text.json.JsonSerilizer, related to the failed integration test cases.
