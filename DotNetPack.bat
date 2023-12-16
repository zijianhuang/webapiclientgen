set packCmd=dotnet pack --no-build --output PublishNuGetPackages --configuration Release
%packCmd% Fonlow.TypeScriptCodeDomCore/Fonlow.TypeScriptCodeDomCore.csproj
%packCmd% Fonlow.Poco2TsCore/Fonlow.Poco2TsCore.csproj
%packCmd% Fonlow.DocCommentCore/Fonlow.DocCommentCore.csproj
%packCmd% Fonlow.Web.MetaCore/Fonlow.Web.MetaCore.csproj
%packCmd% WebApiClientGenCore.Abstract/WebApiClientGenCore.Abstract.csproj
%packCmd% WebApiClientGenCore/WebApiClientGenCore.csproj
