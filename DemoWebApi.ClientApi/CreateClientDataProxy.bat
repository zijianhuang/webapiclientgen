cd %~dp0
rem generate client proxy classes with the wsdl
rem generate syncOnly (not documented in msdn) so I can used the same client api for client broker.
"C:\Program Files (x86)\Microsoft SDKs\Windows\v8.1A\bin\NETFX 4.5.1 Tools\svcutil.exe"  /dconly ..\DemoWebApi.DemoData\wsdl\fonlow.com.DemoData.2014.02.xsd /n:http://fonlow.com/DemoData/2014/02,DemoWebApi.DemoData.Client /language:C#  /o:DemoWebApiClientDataAuto.cs
pause