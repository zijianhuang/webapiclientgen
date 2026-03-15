1. Run Web API with `StartDemoCoreWeb.ps1` or `StartDemoTextJsonWeb.ps1`.
2. Run `npx vitest --run` to test. Or use "runtest.ps1" or "runtestRemote.ps1".

Remarks:
* Upon HTTP status code 204, AXIOS response will return empty string rather than null. The generated client API code for AXIOS respects this tradition and won't interpret this into null. Apparently many developers using AXIOS have get used to such "feature".