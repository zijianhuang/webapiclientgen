#Launch WebApi Website and POST a request for generating client APIs
Set-Location $PSScriptRoot
$path = "$PSScriptRoot/_DebugWeb"
$procArgs = @{
    FilePath         = "dotnet.exe"
    ArgumentList     = "run $path/DebugWeb.csproj --no-build"
    WorkingDirectory = $path
    PassThru         = $true
}
$process = Start-Process @procArgs

Invoke-RestMethod http://localhost:5000/api/values -Method GET

