For testing the runtime behavior of .NET Core Client API codes utilizing Newtonsoft.Json on both sides.

The primary test endpoint is DemoCoreWeb. And DemoTextJsonWeb that uses System.Text.Json should be used as well from time to time.

**Hints:**

* When testing with DemoTextJsonWeb, just launch DemoTextJsonWeb first, then the auto launch of DemoCoreWeb will fail, and the test suite will actually talk to DemoTextJsonWeb.


**Remarks:**

* As of .NET 3, 5, 6, 7 and 8, System.Text.Json has been approaching total replacement of Newtonsoft.Json, covering more and more CLR strongly typed data models. 
* However, as of .NET 8, when this test suite talks to DemoTextJsonWeb, there are still around 6 test cases failed revealing that what System.Text.Json is not yet capable of, when talking to DemoTextJsonWeb. Please read the doc documents of failed cases for details.
* When talking to DemoCoreWeb, 4 cases failed.
