For testing the runtime behavior of .NET Core Client API codes utilizing System.Text.Json rather than Newtonsoft.Json.

The primary test endpoint is DemoTextJsonWeb. And DemoCoreWeb that uses Newtonsoft.Json should be used as well from time to time.

**Remarks:**

* As of .NET 3, 5, 6, 7 and 8, System.Text.Json has been approaching total replacement of Newtonsoft.Json, covering more and more CLR strongly typed data models. 
* However, as of .NET 8, there are still around 27 test cases revealing that what System.Text.Json is not yet capable of.