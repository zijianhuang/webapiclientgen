cd %~dp0
nuget.exe pack WebApiClientGen.Axios.csproj -Prop Configuration=Release -OutputDirectory c:\release\WebApiClientGen
pause