The code gen and other components serve applications developers who would quickly deliver high quality products, thus the quality of the codes generated is critical. Please make sure all test suites pass.

## Tech Doc

1. README.md files
2. [Wiki](https://github.com/zijianhuang/webapiclientgen/wiki)
3. [Doc](Doc/) contains UML diagrams stored in WebApiClientGen.vpp (Visual Paradigm) which should help you to navigate the source codes.

## Tech Stack

1. .NET
1. C#
1. TypeScript
1. JavaScript and TypeScript frameworks and libraries: Angular, Fetch, AXIOS, jQuery and Aurelia.

## Tooling

1. Visual Studio 2026
1. Visual Studio Code

Regarding build, dependencies and development setup, please refer to manifest files in root and each folders.

Once you check out the repository, you should be able to:
1. Build .NET components and applications using Visual Studio or .NET compiler.
1. Run xUnit tests in Visual Studio.
1. PowerShell scripts provide shortcuts to builds, generated client API codes and tests.

## Testing

* All tests should pass before each commit.
* GitHub Actions include only tests for .NET in release mode.
* Tests for each plugin for TypeScript are done through launching `runtest.ps1 in the following folders:
    * aurelia
    * axios
    * fetchapi
    * HeroesDemo
