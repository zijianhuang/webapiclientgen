::Build for testing with dotnet hosting
::set %current%=%~dp0

dotnet-serve -d C:\VSProjects\OpenSource\webapiclientgen\ngdist\prod -p 5200
