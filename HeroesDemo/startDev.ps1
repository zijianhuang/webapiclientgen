#Run prod build with dotnet hosting
cd $PSScriptRoot
dotnet-serve -d ../ngdist/dev -p 5200
