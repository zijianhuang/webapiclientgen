cd %~dp0
nuget.exe pack Fonlow.Poco2Ts.csproj -Prop Configuration=Release -OutputDirectory c:\release\WebApiClientGen
pause