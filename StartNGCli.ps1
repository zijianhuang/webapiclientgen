#Launch WebApi Website and POST a request for generating client APIs
cd $PSScriptRoot
$arguments = "/site:DemoNGCli /apppool:Clr4IntegratedAppPool /config:$PSScriptRoot\.vs\WebApiClientGen\config\applicationhost.config"
echo $arguments
$processInfo = New-Object System.Diagnostics.ProcessStartInfo("C:\Program Files (x86)\IIS Express\iisexpress.exe", $arguments)
$process = [System.Diagnostics.Process]::Start($processInfo)

Invoke-RestMethod http://localhost:50232/ -Method GET
