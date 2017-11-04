#Launch WebApi Website and POST a request for generating client APIs. This only works with the DEBUG build of the Web service.
cd $PSScriptRoot
$arguments = "/site:DemoWebApi /apppool:Clr4IntegratedAppPool /config:$PSScriptRoot\.vs\config\applicationhost.config"
echo $arguments
$processInfo = New-Object System.Diagnostics.ProcessStartInfo("C:\Program Files (x86)\IIS Express\iisexpress.exe", $arguments)
$process = [System.Diagnostics.Process]::Start($processInfo)
Invoke-RestMethod http://localhost:10965/api/codegen -Method POST -InFile "$($PSScriptRoot)\DemoWebApi\CodeGen.json" -ContentType "application/json"

$processInfo2 = New-Object System.Diagnostics.ProcessStartInfo("C:\Program Files (x86)\Microsoft SDKs\TypeScript\2.5\tsc.exe", "$PSScriptRoot\DemoWebApi\Scripts\ClientApi\WebApiClientAuto.ts")
$process2 = [System.Diagnostics.Process]::Start($processInfo2)

$processInfo2 = New-Object System.Diagnostics.ProcessStartInfo("C:\Program Files (x86)\Microsoft SDKs\TypeScript\2.5\tsc.exe", "$PSScriptRoot\DemoAngular2\clientapi\WebApiNG2ClientAuto.ts")
$process2 = [System.Diagnostics.Process]::Start($processInfo2)

$process.CloseMainWindow()
