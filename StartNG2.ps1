#Launch WebApi Website and POST a request for generating client APIs
cd $PSScriptRoot
$arguments = "/site:DemoAngular2 /apppool:Clr4IntegratedAppPool /config:$PSScriptRoot\.vs\WebApiClientGen\config\applicationhost.config"
echo $arguments
$processInfo = New-Object System.Diagnostics.ProcessStartInfo("C:\Program Files (x86)\IIS Express\iisexpress.exe", $arguments)
$process = [System.Diagnostics.Process]::Start($processInfo)

Invoke-RestMethod https://localhost:28274/ -Method GET
