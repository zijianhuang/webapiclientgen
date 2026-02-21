#Launch WebApi Website and POST a request for generating client APIs
Set-Location $PSScriptRoot
$path = "$PSScriptRoot/_DebugWeb"
$procArgs = @{
    FilePath         = "dotnet.exe"
    ArgumentList     = "run --project $path/DebugWeb.csproj --no-build --launch-profile http"
    WorkingDirectory = $path
    PassThru         = $true
}
$process = Start-Process @procArgs


