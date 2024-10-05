Set-Location $PSScriptRoot
#Make sure CodeGen.json is saved in format ANSI or UTF-8 without BOM, since ASP.NET Core 2.0 Web API will fail to deserialize POST Body that contains BOM.
# Step 3 and 4 may be optional
#Step 1: Launch Website
$path = "$PSScriptRoot/DemoCoreWeb"
$procArgs = @{
    FilePath         = "dotnet.exe"
    ArgumentList     = "run $path/DemoCoreWeb.csproj --no-build"
    WorkingDirectory = $path
    PassThru         = $true
}
$process = Start-Process @procArgs

#Step 2: Run CodeGen
$restArgs = @{
    Uri         = 'http://localhost:5000/api/codegen'
    Method      = 'Post'
    InFile      = "$PSScriptRoot/DemoCoreWeb/CodeGen.json"
    ContentType = 'application/json'
}
try {
        $result = Invoke-RestMethod @restArgs
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

#Step 3: Compile generated TS codes to JS for jQuery. https://www.typescriptlang.org/docs/handbook/compiler-options.html
# make sure TS compiler is installed through npm install -g typescript, then tsc.ps1 is available in C:/Users/YourProfile/AppData/Roaming/npm
Invoke-Expression "tsc.ps1 --target es2022 $PSScriptRoot/DemoCoreWeb/Scripts/ClientApi/WebApiCoreJQClientAuto.ts"
Invoke-Expression "tsc.ps1 --target es2022 $PSScriptRoot/DemoCoreWeb/Scripts/tests/demo.tests.ts"
Invoke-Expression "tsc.ps1 --target es2022 $PSScriptRoot/DemoCoreWeb/Scripts/tests/special.tests.ts"

#Step 4: Build the .NET lib to verify
dotnet build ./DemoCoreWeb.ClientApi/DemoCoreWeb.ClientApi.csproj

Stop-Process $process