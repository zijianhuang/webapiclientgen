# DemoNGCli

This project was created based on DemoAngular2. Since AOT supports only a subset of JavaScript, some codes referencing
to the client APIs has to be altered:

1. The DI of the client API into a class has to be explicitly declared, like `@Inject(namespaces.DemoWebApi_Controllers_Client.Heroes) private heroService: namespaces.DemoWebApi_Controllers_Client.Heroes`
2. @Inject() won't accept the namespace alias, so you will have to use `namespaces.DemoWebApi_Controllers_Client.Heroe`. Even though other references of the API may be with the alias, for consistency, it may be good not to use namespace alias at all.


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
