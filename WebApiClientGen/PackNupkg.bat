cd %~dp0
nuget.exe pack WebApiClientGen.csproj -Prop Configuration=Release -OutputDirectory c:\release\WebApiClientGen
pause