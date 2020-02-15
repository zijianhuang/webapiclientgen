cd %~dp0
nuget.exe pack WebApiClientGen.Fetch.csproj -Prop Configuration=Release -OutputDirectory c:\release\WebApiClientGen
pause