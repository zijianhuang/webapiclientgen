#Launch WebApi Website and POST a request for generating client APIs
Set-Location $PSScriptRoot
$path = "$PSScriptRoot/DemoCoreWeb/bin/Debug/net8.0"
$procArgs = @{
    FilePath         = "dotnet.exe"
    ArgumentList     = "$path/DemoCoreWeb.dll"
    WorkingDirectory = $path
    PassThru         = $true
}
$process = Start-Process @procArgs

Invoke-RestMethod http://localhost:5000/api/values -Method GET

