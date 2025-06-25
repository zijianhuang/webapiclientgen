# after buildRelease of the sln
Set-Location $PSScriptRoot
$target="../Release/Poco2TsCore_MacSelfContained"

Remove-Item -Recurse $target*

dotnet publish -r osx-x64 --output $target --configuration release --self-contained true
