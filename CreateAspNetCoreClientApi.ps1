cd $PSScriptRoot
#Make sure CodeGen.json is saved in format ANSI or UTF-8 without BOM, since ASP.NET Core 2.0 Web API will fail to deserialize POST Body that contains BOM.
#Step 1: Launch Website
$path = "$PSScriptRoot\DemoCoreWeb\bin\Debug\netcoreapp2.2"
$procArgs = @{
    FilePath         = "dotnet.exe"
    ArgumentList     = "$path\DemoCoreWeb.dll"
    WorkingDirectory = $path
    PassThru         = $true
}
$process = Start-Process @procArgs

#Step 2: Run CodeGen
$restArgs = @{
    Uri         = 'http://localhost:5000/api/codegen'
    Method      = 'Post'
    InFile      = "$PSScriptRoot\DemoCoreWeb\CodeGen.json"
    ContentType = 'application/json'
}
Invoke-RestMethod @restArgs

#Step 3: Compile generated TS codes to JS for jQuery
# -outFile will cause the js of HttpClient.ts to be merged, so the html does not need to reference to HttpClient.js
$procTscArgs = @{
    FilePath         = "node"
    ArgumentList     = "`"C:\Program Files (x86)\Microsoft SDKs\TypeScript\3.2\tsc.js`" $PSScriptRoot\DemoCoreWeb\Scripts\ClientApi\WebApiClientAuto.ts -outFile $PSScriptRoot\DemoCoreWeb\Scripts\ClientApi\WebApiClientAuto.js"
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

#Step 4: Copy files for testing generated codes
# for launching Website through dotnet.exe 
xcopy "$PSScriptRoot\DemoCoreWeb\Scripts\ClientApi\WebApiClientAuto.js" "$PSScriptRoot\DemoCoreWeb\wwwroot\Scripts\ClientApi\" /y 
# for launching Website through IIS Express
xcopy "$PSScriptRoot\DemoCoreWeb\Scripts\ClientApi\WebApiClientAuto.js" "$PSScriptRoot\DemoCoreWeb\bin\debug\netcoreapp2.2\wwwroot\Scripts\ClientApi\" /y