cd %~dp0
nuget.exe pack WebApiClientGen.jQuery.csproj -Prop Configuration=Release -OutputDirectory c:\release\WebApiClientGen
pause