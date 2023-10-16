cd %~dp0
set targetSite=C:\Release\DemoCoreWeb\Win\
set target=%targetSite%bin\

del /S /Q %target%*

dotnet publish -r win-x64 --output %target% --configuration release --self-contained false
