cd %~dp0
nuget.exe pack WebApiClientGen.NG2.csproj -Prop Configuration=Release -OutputDirectory c:\release\WebApiClientGen
pause