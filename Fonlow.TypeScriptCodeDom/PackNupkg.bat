cd %~dp0
nuget.exe pack Fonlow.TypeScriptCodeDom.csproj -Prop Configuration=Release -OutputDirectory c:\release\WebApiClientGen
pause