# pack existing release build
cd $PSScriptRoot
$packCmd = 'dotnet pack $Name --no-build --output Release --configuration Release'
$projList = 'Fonlow.Poco2TsCore/Fonlow.Poco2TsCore.csproj', 'Fonlow.DocCommentCore/Fonlow.DocCommentCore.csproj', 'Fonlow.Web.MetaCore/Fonlow.Web.MetaCore.csproj', 'WebApiClientGenCore.Abstract/WebApiClientGenCore.Abstract.csproj', 'WebApiClientGenCore/WebApiClientGenCore.csproj', 'WebApiClientGenCore.NG2/WebApiClientGenCore.NG2.csproj', 'WebApiClientGenCore.NG2FormGroup/WebApiClientGenCore.NG2FormGroup.csproj', 'WebApiClientGenCore.Aurelia/WebApiClientGenCore.Aurelia.csproj', 'WebApiClientGenCore.Axios/WebApiClientGenCore.Axios.csproj', 'WebApiClientGenCore.Fetch/WebApiClientGenCore.Fetch.csproj', 'WebApiClientGenCore.jQuery/WebApiClientGenCore.jQuery.csproj', 'Fonlow.DateOnlyExtensions/Fonlow.DateOnlyExtensions.csproj', 'Fonlow.DateOnlyExtensionsNet/Fonlow.DateOnlyExtensionsTextJson.csproj', 'Fonlow.IntegralExtension/Fonlow.IntegralExtensions.csproj', 'Fonlow.IntegralExtensionsTextJson/Fonlow.IntegralExtensionsTextJson.csproj'
foreach($name in $projList){
    Invoke-Expression $ExecutionContext.InvokeCommand.ExpandString($packCmd)
}