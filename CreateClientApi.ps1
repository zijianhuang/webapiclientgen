#Launch WebApi Website and POST a request for generating client APIs. This only works with the DEBUG build of the Web service.
cd $PSScriptRoot
$arguments = "/site:DemoWebApi /apppool:Clr4IntegratedAppPool /config:$PSScriptRoot\.vs\WebApiClientGen\config\applicationhost.config"
echo $arguments
$procArgs = @{
    FilePath         = "C:\Program Files (x86)\IIS Express\iisexpress.exe"
    ArgumentList     = $arguments
    PassThru         = $true
}
$process = Start-Process @procArgs

try {
        $result = Invoke-RestMethod http://localhost:10965/api/codegen -Method POST -InFile "$($PSScriptRoot)\DemoWebApi\CodeGen.json" -ContentType "application/json"
        Write-Output $result
}
catch {
        Write-Output $_.Exception.Response.StatusCode
        $response = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($response)
        $reader.BaseStream.Position = 0
        $reader.DiscardBufferedData()
        $responseBody = $reader.ReadToEnd()
        Write-Output  $responseBody
}

#Step 3: Compile generated TS codes to JS for jQuery
$procTscArgs = @{
    FilePath         = "node"
    ArgumentList     = "`"C:\Program Files (x86)\Microsoft SDKs\TypeScript\3.8\tsc.js`" --target es2015 $PSScriptRoot\DemoWebApi\Scripts\ClientApi\WebApiJQClientAuto.ts"
    PassThru         = $true
    
}
$processTsc = Start-Process @procTscArgs

Stop-Process $process
