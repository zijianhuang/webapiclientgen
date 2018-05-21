#Launch WebApi Website and POST a request for generating client APIs. This only works with the DEBUG build of the Web service.
cd $PSScriptRoot
$arguments = "/site:DemoWebApi /apppool:Clr4IntegratedAppPool /config:$PSScriptRoot\.vs\config\applicationhost.config"
echo $arguments
$procArgs = @{
    FilePath         = "C:\Program Files (x86)\IIS Express\iisexpress.exe"
    ArgumentList     = $arguments
    PassThru         = $true
}
$process = Start-Process @procArgs

Invoke-RestMethod http://localhost:10965/api/codegen -Method POST -InFile "$($PSScriptRoot)\DemoWebApi\CodeGen.json" -ContentType "application/json"

$procTscArgs = @{
    FilePath         = "C:\Program Files (x86)\Microsoft SDKs\TypeScript\2.6\tsc.exe"
    ArgumentList     = "$PSScriptRoot\DemoWebApi\Scripts\ClientApi\WebApiClientAuto.ts"
    PassThru         = $true
}
$processTsc = Start-Process @procTscArgs

Stop-Process $process
