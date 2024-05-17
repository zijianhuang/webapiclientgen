$vsProDir="C:/Program Files/Microsoft Visual Studio/2022/Professional"
$vsCommunityDir="C:/Program Files/Microsoft Visual Studio/2022/Community"
echo %vsProPath%
$msBuildPath="$vsCommunityDir/MSBuild/Current/Bin/MsBuild.exe"
if (Test-Path $vsProDir) {
	$msBuildPath="$vsProDir/MSBuild/Current/Bin/MsBuild.exe"
}

& "$msBuildPath" WebApiClientGen.msbuild  /p:DebugSymbols=false /p:AllowedReferenceRelatedFileExtensions=none
pause
