cd %~dp0
nuget.exe pack Fonlow.DateOnlyExtensionsNF.csproj -Prop Configuration=Release -OutputDirectory c:\release\WebApiClientGen
pause