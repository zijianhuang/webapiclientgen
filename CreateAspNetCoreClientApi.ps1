cd $PSScriptRoot
#The Web API Website hosted in IIS Express or IIS or whatever Web server should already be running
#Make sure CodeGen.json is saved in format ANSI or UTF-8 without BOM, since ASP.NET Core 2.0 Web API will fail to deserialize POST Body that contains BOM.
Invoke-RestMethod http://localhost:56321/api/codegen -Method POST -InFile "$($PSScriptRoot)\DemoCoreWeb\CodeGen.json" -ContentType "application/json"

$processInfo2 = New-Object System.Diagnostics.ProcessStartInfo("C:\Program Files (x86)\Microsoft SDKs\TypeScript\2.6\tsc.exe", "$PSScriptRoot\DemoCoreWeb\Scripts\ClientApi\WebApiClientAuto.ts")
$process2 = [System.Diagnostics.Process]::Start($processInfo2)
