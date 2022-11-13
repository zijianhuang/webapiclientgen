::Build for testing with dotnet hosting
::set %current%=%~dp0

call "c:\green\SimpleHost\SimpleHost.exe" C:\VSProjects\Fonlow\PoemsCollection\ngdist\poemsng http://localhost:5200
