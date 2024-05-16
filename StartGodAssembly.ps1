#Launch WebApi Website and POST a request for generating client APIs
cd $PSScriptRoot
$path = "$PSScriptRoot/DemoGodAssemblyWeb"
$procArgs = @{
    FilePath         = "dotnet.exe"
    ArgumentList     = "run $path/DemoGodAssemblyWeb.csproj --no-build"
    WorkingDirectory = $path
    PassThru         = $true
}
$process = Start-Process @procArgs

Invoke-RestMethod http://localhost:5000/api/values -Method GET

