cd %~dp0
nuget.exe pack WebApiClientGen.Aurelia.csproj -Prop Configuration=Release -OutputDirectory c:\release\WebApiClientGen
pause