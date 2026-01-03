#Run prod build with dotnet hosting
Set-Location $PSScriptRoot
dotnet-serve -d ../ngdist/prod/browser -p 5200
