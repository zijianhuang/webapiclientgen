::To local IIS website for local testing
cd %~dp0
set targetSite=Heroes
call CopyToIISBase.bat %targetSite%
c:\green\XmlPreprocess\bin\XmlPreprocess.exe /i Web.config /o %target%web.config /d production=true /e Test /clean
copy NGSource\src\siteconfigProd.js C:\inetpub\wwwroot\%targetSite%\siteconfig.js /y