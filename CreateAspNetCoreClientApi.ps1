cd $PSScriptRoot
#Make sure CodeGen.json is saved in format ANSI or UTF-8 without BOM, since ASP.NET Core 2.0 Web API will fail to deserialize POST Body that contains BOM.
$path = "$PSScriptRoot\DemoCoreWeb\bin\Debug\netcoreapp2.0"
$procArgs = @{
    FilePath         = "dotnet.exe"
    ArgumentList     = "$path\DemoCoreWeb.dll"
    WorkingDirectory = $path
    PassThru         = $true
}
$process = Start-Process @procArgs

$restArgs = @{
    Uri         = 'http://localhost:5000/api/codegen'
    Method      = 'Post'
    InFile      = "$PSScriptRoot\DemoCoreWeb\CodeGen.json"
    ContentType = 'application/json'
}
Invoke-RestMethod @restArgs

Stop-Process $process