param(
    [string]$apiBaseUri="http://localhost:5000/",
    [string]$prod = "dev",
    [string]$baseHref="/"
)

# For Local app /app/ to serve frontend
Set-Location $PSScriptRoot
$baseHrefText = ($baseHref -eq "/" ? "/" : "/$baseHref/");
Write-Output "Ready to output to $outputDir with base-href $baseHrefText ..."
ng build --configuration=$prod --base-href=$baseHrefText

copy-item "./src/conf/" -Destination "../ngdist/$prod/browser/conf/" -Force -Recurse
$siteConfigTemplate= Get-Content './src/conf_template/siteconfigTemplate.js' -Raw
$updatedContent=$siteConfigTemplate -replace '\$apiBaseUri', $apiBaseUri
Set-Content -Path "../ngdist/$prod/browser/conf/siteconfig.js" -Value $updatedContent

Write-Output "apiBaseUri $apiBaseUri"
Write-Output "done $(Get-Date)"