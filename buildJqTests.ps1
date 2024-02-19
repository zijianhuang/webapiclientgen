cd $PSScriptRoot

#Step 3: Compile generated TS codes to JS for jQuery. https://www.typescriptlang.org/docs/handbook/compiler-options.html
# make sure TS compiler is installed through npm install -g typescript, then tsc.ps1 is available in C:\Users\YourProfile\AppData\Roaming\npm
Invoke-Expression "tsc.ps1 --target es2022 $PSScriptRoot\DemoCoreWeb\Scripts\ClientApi\WebApiCoreJQClientAuto.ts"
Invoke-Expression "tsc.ps1 --target es2022 $PSScriptRoot\DemoCoreWeb\Scripts\tests\demo.tests.ts"
Invoke-Expression "tsc.ps1 --target es2022 $PSScriptRoot\DemoCoreWeb\Scripts\tests\special.tests.ts"
