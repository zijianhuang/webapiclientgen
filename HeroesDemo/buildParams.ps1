
<#
.SYNOPSIS
    Default build script for development. And this can be used for the other build profiles with parameters, and different deployment targets.

.DESCRIPTION
    Build according to angular.json, adjust config and copy non-assets files.

.PARAMETER apiBaseUri
    Backend API base URI. Default to "http://localhost:5000/".

.PARAMETER buildConfig
    Build configuration, default to "development". This will be passed to ng build --configuration.

.PARAMETER baseHref
	Base href for the Angular app. Default to "/".

.PARAMETER outputPath
	Output path for the build output. Default to "../ngdist/dev".

#>
param(
    [string]$apiBaseUri="http://localhost:5000/",
    [string]$buildConfig = "development",
    [string]$baseHref="/",
	[string]$outputPath="../ngdist/dev" # under dir browser
)

# For Local app /app/ to serve frontend
Set-Location $PSScriptRoot
$baseHrefText = ($baseHref -eq "/" ? "/" : "/$baseHref/")
Write-Output "Ready to output to $outputPath with base-href $baseHrefText ..."
ng build --configuration=$buildConfig --output-path=$outputPath --base-href=$baseHrefText

$confPath = [System.IO.Path]::Combine($outputPath, "browser/conf")
copy-item "./src/conf/" -Destination $confPath -Force -Recurse
$siteConfigTemplate= Get-Content './src/conf_template/siteconfigTemplate.js' -Raw
$updatedContent=$siteConfigTemplate -replace '\$apiBaseUri', $apiBaseUri
Set-Content -Path "$confPath/siteconfig.js" -Value $updatedContent

Write-Output "apiBaseUri $apiBaseUri"
Write-Output "done $(Get-Date)"