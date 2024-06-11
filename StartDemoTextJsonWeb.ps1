#Launch WebApi Website and POST a request for generating client APIs
cd $PSScriptRoot
$path = "$PSScriptRoot/DemoTextJsonWeb"
$procArgs = @{
    FilePath         = "dotnet.exe"
    ArgumentList     = "run --project $path/DemoTextJsonWeb.csproj --no-build --launch-profile CodeGen"
    WorkingDirectory = $path
    PassThru         = $true
}
$process = Start-Process @procArgs

Invoke-RestMethod http://localhost:5000/api/values -Method GET

