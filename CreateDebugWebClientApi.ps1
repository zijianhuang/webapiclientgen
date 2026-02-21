Set-Location $PSScriptRoot
#Make sure CodeGen.json is saved in format ANSI or UTF-8 without BOM, since ASP.NET Core 2.0 Web API will fail to deserialize POST Body that contains BOM.
#Step 1: Launch Website
$path = "$PSScriptRoot/_DebugWeb"
$procArgs = @{
    FilePath         = "dotnet.exe"
    ArgumentList     = "run $path/DebugWeb.csproj --no-build --launch-profile http"
    WorkingDirectory = $path
    PassThru         = $true
}
$process = Start-Process @procArgs

#Step 2: Run CodeGen
$jsonBody = Get-Content "$path/CodeGen.json" -Raw
$restArgs = @{
    Uri         = 'http://localhost:5000/api/codegen'
    Method      = 'Post'
    Body        = $jsonBody
    ContentType = 'application/json'
}

$response = Invoke-WebRequest @restArgs -SkipHttpErrorCheck
Write-Output $response.GetType().FullName

$status = $response.StatusCode
$body = $response.Content

Write-Output "Status: $status"
if ($status -lt 299) {
    Write-Output $body
}
else {
    Write-Warning "Response body: $body"
    Stop-Process $process
    return
}


Stop-Process $process