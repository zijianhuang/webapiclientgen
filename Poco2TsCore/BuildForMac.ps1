# after buildRelease of the sln
Set-Location $PSScriptRoot
$target="../Release/Poco2TsCore_Mac"

Remove-Item -Recurse $target*

dotnet publish -r osx-x64 --output $target --configuration release --self-contained false
