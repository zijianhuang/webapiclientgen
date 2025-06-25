# after buildRelease of the sln
Set-Location $PSScriptRoot
$target="../Release/Poco2TsCore_Win"

Remove-Item -Recurse $target*

dotnet publish -r win-x64 --output $target --configuration release --self-contained false

