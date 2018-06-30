:Copy to a virtual directory under C:\inetpub\wwwroot\
cd %~dp0
if [%1]==[] exit 1

set targetSite=%1
set target=C:\inetpub\wwwroot\%targetSite%\

del %target%*.* /q
xcopy NG\*.* %target% /s /y
xcopy Web.config %target%web.config* /Y /D
