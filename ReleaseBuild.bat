set vsProDir=C:\Program Files\Microsoft Visual Studio\2022\Professional\
set vsCommunityDir=C:\Program Files\Microsoft Visual Studio\2022\Community\
echo %vsProPath%
if exist "%vsProDir%" (
	set msBuildPath=%vsProDir%MSBuild\Current\Bin\MsBuild.exe
) else (
	set msBuildPath=%vsCommunityDirh%MSBuild\Current\Bin\MsBuild.exe
)

"%msBuildPath%" WebApiClientGen.msbuild  /p:DebugSymbols=false /p:AllowedReferenceRelatedFileExtensions=none 
pause
