cd %~dp0
set target=C:\inetpub\wwwroot\DemoWebApi\
robocopy bin\ %target%bin\ /MIR
robocopy Views\ %target%Views\ /MIR
robocopy Scripts\ %target%Scripts\ /MIR
robocopy Content\ %target%Content\ /MIR
robocopy fonts\ %target%fonts\ /MIR
robocopy App_data\ %target%\App_data\ /MIR

copy Web.config %target%web.config /Y /D
copy Global.asax %target% /Y /D
copy ..\3rdParty\EssentialDiagnostics\*.dll %target%bin /Y /D
pause