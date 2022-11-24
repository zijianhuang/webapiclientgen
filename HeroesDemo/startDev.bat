::Build for testing with dotnet hosting
::set %current%=%~dp0

call "c:\green\SimpleHost\SimpleHost.exe" C:\VSProjects\OpenSource\webapiclientgen\ngdist\dev http://localhost:5200
