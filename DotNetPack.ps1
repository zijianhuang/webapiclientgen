# pack existing release build
$packCmdParams="pack --no-build --output C:/NugetLocalFeeds --configuration Release Fonlow.Poco2TsCore/Fonlow.Poco2TsCore.csproj"
dotnet pack --no-build --output C:/NugetLocalFeeds --configuration Release Fonlow.Poco2TsCore/Fonlow.Poco2TsCore.csproj
dotnet pack --no-build --output C:/NugetLocalFeeds --configuration Release Fonlow.DocCommentCore/Fonlow.DocCommentCore.csproj
dotnet pack --no-build --output C:/NugetLocalFeeds --configuration Release Fonlow.Web.MetaCore/Fonlow.Web.MetaCore.csproj
dotnet pack --no-build --output C:/NugetLocalFeeds --configuration Release WebApiClientGenCore.Abstract/WebApiClientGenCore.Abstract.csproj
dotnet pack --no-build --output C:/NugetLocalFeeds --configuration Release WebApiClientGenCore/WebApiClientGenCore.csproj
dotnet pack --no-build --output C:/NugetLocalFeeds --configuration Release WebApiClientGenCore.NG2/WebApiClientGenCore.NG2.csproj
dotnet pack --no-build --output C:/NugetLocalFeeds --configuration Release WebApiClientGenCore.NG2FormGroup/WebApiClientGenCore.NG2FormGroup.csproj
dotnet pack --no-build --output C:/NugetLocalFeeds --configuration Release WebApiClientGenCore.Aurelia/WebApiClientGenCore.Aurelia.csproj
dotnet pack --no-build --output C:/NugetLocalFeeds --configuration Release WebApiClientGenCore.Axios/WebApiClientGenCore.Axios.csproj
dotnet pack --no-build --output C:/NugetLocalFeeds --configuration Release WebApiClientGenCore.Fetch/WebApiClientGenCore.Fetch.csproj
dotnet pack --no-build --output C:/NugetLocalFeeds --configuration Release WebApiClientGenCore.jQuery/WebApiClientGenCore.jQuery.csproj

dotnet pack --no-build --output C:/NugetLocalFeeds --configuration Release Fonlow.DateOnlyExtensions/Fonlow.DateOnlyExtensions.csproj
dotnet pack --no-build --output C:/NugetLocalFeeds --configuration Release Fonlow.DateOnlyExtensionsNet/Fonlow.DateOnlyExtensionsTextJson.csproj
dotnet pack --no-build --output C:/NugetLocalFeeds --configuration Release Fonlow.IntegralExtension/Fonlow.IntegralExtensions.csproj
dotnet pack --no-build --output C:/NugetLocalFeeds --configuration Release Fonlow.IntegralExtensionsTextJson/Fonlow.IntegralExtensionsTextJson.csproj