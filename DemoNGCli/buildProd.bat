::Build for testing in IIS Express and with Tyro Test
cd %~dp0NGSource
ng build --configuration=production && copy ..\Prod\conf\siteconfigProd.js ..\Prod\conf\siteconfig.js /y
