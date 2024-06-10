This is a testbed for supporting god assembly of ASP.NET Core Web API.

WebApiClientGen presumes that application developers use opt-in approaches for cherry picking of POCO types for generated client API codes:
1. Publish some service data models to clients, but without API functions.
1. Publish custom data models used in Web API functions plus some data models not used in Web API functions directly.

Typical scaffolding codes of Visual Studio for Web projects as well as other host projects like WinForms, WPF, Xamarin and MAUI are typically contained in a "god assembly", a single application project. Many so called enterprise applications or ASP.NET Web API projects have been evolving from such god assembly from the initial scaffolding codes, becoming a bigger and bigger god assembly.

Having a god assembly is not wrong, since it is just a fact or an inconvenient truth in the software development industries, thus WebApiClientGen provides some reluctant support to god ASP.NET Core Web API assembly.

Having a god class is not wrong, however nasty consequences have been well documented in various software engineering text books.

Robert Cecil Martin (Uncle Bob) had presumed in his "UML for Java Programmers":

>Everybody knows that god classes are a bad idea. We don't want to concentrate all the intelligence of a system into a single object or a single function. One of the goals of OOD is the partitioning and distribution of behavior into many classes and many functions. It turns out, however, that many object models that appear to be distributed are really the abode of gods in disguise.

This is probably one of the reasons why SOLID has been a popular job interview questions in last 2 decades. However, few have realized god assembly (.NET) /package (Java) is also nasty at larger scale:
1. Inconvenient/difficult/impossible for unit testing.
1. Accidental coupling and undesired circular references.
1. Hard to do refactoring.
1. Hard for code reuse
1. Hard for teamwork on the same application.
1. Render IoC into useless/wasteful practices: zero/least benefit from IoC and inflation of nasty consequences of IoC.
1. ...


The popularity of microservices since 2010 probably reduces the nasty impacts of god assemblies a little by accident, since each god assembly contained a small set functional features, thus the god assembly of each microsoftservice remains relatively small, so average developers may still maintain it without feeling sigificant pain.