:Generate TypeScript interfaces for plain old data types defined in XSD files.
:You may use either svcutil.exe or xsd.exe to generate POCO classes in C# 
:The batch file is provided as an example, and you should be able to modify it according to your development process
:The example is designed to be running inside Developer Command Prompt for VS. 
:If your computer doesn't have Visual Studio installed, you may need to defined the folders of svcutil.exe and csc.exe like "C:\Program Files (x86)\Microsoft SDKs\Windows\v8.1A\bin\NETFX 4.5.1 Tools\"
:, or just make these folders available the default search paths.
svcutil.exe  /dconly ..\DemoWebApi.DemoData\wsdl\schemas.microsoft.com.2003.10.Serialization.Arrays.xsd  ..\DemoWebApi.DemoData\wsdl\fonlow.com.DemoData.2014.02.xsd /n:http://fonlow.com/DemoData/2014/02,DemoWebApi.DemoData /language:C#  /o:%temp%\CodeGenTempAuto.cs
csc.exe /target:library %temp%\CodeGenTempAuto.cs /out:%temp%\CodeGenTempAuto.dll
POCO2TS.exe %temp%\CodeGenTempAuto.dll ClientTypes.ts