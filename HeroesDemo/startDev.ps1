#Run prod build with dotnet hosting
Set-Location $PSScriptRoot
dotnet-serve -d ../ngdist/dev -p 5200
