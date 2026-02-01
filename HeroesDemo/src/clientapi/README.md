# Treeshaking

This article is how Angular build works regarding the final bundle size.

The codegen writes codes to a single file. 

If your client app uses very small portion of the generated file, even if the generated file is big with tons of classes and API functions, the build image will include only those used, thanks to modern day treeshaking.

# How Angular decides what ends up in the final JS bundle

## 1. **TypeScript interfaces never appear in JS**
Interfaces are erased at compile time. They **never** contribute to bundle size.

## 2. **Unused functions and classes are removed by tree‑shaking**
Angular uses:

- TypeScript → ESBuild
- Terser for minification
- ES module static analysis for tree‑shaking

If a function or class is never imported, never referenced, and never instantiated, it is removed.

This includes:

- Plain functions
- Classes

**Remarks:**
* The classes in the generated file are basically injectable classes mapped from the API controllers. Though using only one function will result in other functions of the class appearing in the bundle, typically API developer won't put many dozens of functions in the same controller in most business contexts.
* Plugin `WebApiClientGenCore.NG2FormGroup` generated functions of creating strongly typed FormGroup for every POCO classes. Because these functions are separately exported, only when your app use a function then the function will be included in the bundle.

## 3. `@Injectable({ providedIn: 'root' })` does not force inclusion

Only in these cases, an `@Injectable` class get included even if unused:

### **A. The class has side effects**
Example: static initializers, global state mutation, console logs, etc.

```ts
@Injectable({ providedIn: 'root' })
export class MyService {
  static x = console.log('side effect');
}
```

Tree‑shaking cannot remove it because removing it changes runtime behavior.

### **B. The class is referenced indirectly**
Examples:

- Appears in a provider array
- Appears in a module’s `providers: []`
- Appears in a route resolver/guard
- Appears in a factory function
- Appears in a metadata annotation of another class

## Practices of using generated codes

If you import the generated file like this:

```ts
import * as Generated from './generated';
```

Even if you never use `Generated.X`, the bundler may conservatively include more than expected.

But if you import only what you need:

```ts
import { NeededType } from './generated';
import {DemoWebApi_Controllers_Client} from '../../clientapi/WebApiCoreNG2FormGroupClientAuto';

```

Tree‑shaking works perfectly.

