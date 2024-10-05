#Run prod build with dotnet hosting
Set-Location $PSScriptRoot
dotnet-serve -d ../ngdist/prod -p 5200
