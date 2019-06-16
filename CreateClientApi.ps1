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

#Step 3: Compile generated TS codes to JS for jQuery
# -outFile will cause the js of HttpClient.ts to be merged, so the html does not need to reference to HttpClient.js
$procTscArgs = @{
    FilePath         = "node"
    ArgumentList     = "`"C:\Program Files (x86)\Microsoft SDKs\TypeScript\3.2\tsc.js`" $PSScriptRoot\DemoWebApi\Scripts\ClientApi\WebApiClientAuto.ts -outFile $PSScriptRoot\DemoWebApi\Scripts\ClientApi\WebApiClientAuto.js"
    PassThru         = $true
    
}
$processTsc = Start-Process @procTscArgs

# Compile for axios, if the app is coded on JS
$procTscArgs = @{
    FilePath         = "node"
    ArgumentList     = "`"C:\Program Files (x86)\Microsoft SDKs\TypeScript\3.2\tsc.js`" $PSScriptRoot\axios\src\clientapi\WebApiAxiosClientAuto.ts"
    PassThru         = $false
    
}
$processTsc = Start-Process @procTscArgs


Stop-Process $process
