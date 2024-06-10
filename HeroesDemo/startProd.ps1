#Run prod build with dotnet hosting
cd $PSScriptRoot
dotnet-serve -d ../ngdist/prod -p 5200
