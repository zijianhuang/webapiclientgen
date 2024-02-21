:: pack existing release build
set packCmd=dotnet pack --no-build --output C:\NugetLocalFeeds --configuration Release
%packCmd% Fonlow.Poco2TsCore/Fonlow.Poco2TsCore.csproj
%packCmd% Fonlow.DocCommentCore/Fonlow.DocCommentCore.csproj
%packCmd% Fonlow.Web.MetaCore/Fonlow.Web.MetaCore.csproj
%packCmd% WebApiClientGenCore.Abstract/WebApiClientGenCore.Abstract.csproj
%packCmd% WebApiClientGenCore/WebApiClientGenCore.csproj
%packCmd% WebApiClientGenCore.NG2/WebApiClientGenCore.NG2.csproj
%packCmd% WebApiClientGenCore.NG2FormGroup/WebApiClientGenCore.NG2FormGroup.csproj
%packCmd% WebApiClientGenCore.Aurelia/WebApiClientGenCore.Aurelia.csproj
%packCmd% WebApiClientGenCore.Axios/WebApiClientGenCore.Axios.csproj
%packCmd% WebApiClientGenCore.Fetch/WebApiClientGenCore.Fetch.csproj
%packCmd% WebApiClientGenCore.jQuery/WebApiClientGenCore.jQuery.csproj

%packCmd% WebApiClientGenCore.Fetch/Fonlow.DateOnlyExtensions.csproj
%packCmd% WebApiClientGenCore.Fetch/Fonlow.DateOnlyExtensionsTextJson.csproj
