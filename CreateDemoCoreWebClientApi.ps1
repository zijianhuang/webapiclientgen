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
$client = [System.Net.Http.HttpClient]::new()
$request = [System.Net.Http.HttpRequestMessage]::new([System.Net.Http.HttpMethod]::Post, 'http://localhost:5000/api/codegen')

$jsonBody = Get-Content "$PSScriptRoot/DemoCoreWeb/CodeGen.json" -Raw
$request.Content = [System.Net.Http.StringContent]::new($jsonBody, [System.Text.Encoding]::UTF8, 'application/json')

try {
    $response = $client.SendAsync($request).Result
    $responseBody = $response.Content.ReadAsStringAsync().Result

    if ($response.IsSuccessStatusCode) {
        $result = $responseBody
        Write-Output $result
    }
    else {
        Write-Output "Status Code: $($response.StatusCode.value__)"
        Write-Output "Response Body:"
        Write-Output $responseBody
    }
}
catch {
    Write-Output "Request failed: $($_.Exception.Message)"
}
finally {
    $client.Dispose()
}

#Step 3: Compile generated TS codes to JS for jQuery. https://www.typescriptlang.org/docs/handbook/compiler-options.html
# make sure TS compiler is installed through npm install -g typescript, then tsc.ps1 is available in C:/Users/YourProfile/AppData/Roaming/npm
Invoke-Expression "tsc --target es2022 $PSScriptRoot/DemoCoreWeb/Scripts/ClientApi/WebApiCoreJQClientAuto.ts"
Invoke-Expression "tsc --target es2022 $PSScriptRoot/DemoCoreWeb/Scripts/tests/demo.tests.ts"
Invoke-Expression "tsc --target es2022 $PSScriptRoot/DemoCoreWeb/Scripts/tests/special.tests.ts"

#Step 4: Build the .NET lib to verify
dotnet build ./DemoCoreWeb.ClientApi/DemoCoreWeb.ClientApi.csproj

Stop-Process $process