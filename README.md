Example project to reproduce [Issue 5427](https://github.com/facebook/jest/issues/5427) in Jest.

```
npm install
npm run test
```

**Goal**: Enforce an 80% overall coverage **and** a 50% single file coverage. 

This example includes:
 - four fully tested files (`sum-0x`)
 - one partially tested file `product.js`

In `jest@27.0.6`, we get the following:

```
$ npm run test

> @ test C:\jest-coverage
> jest --coverage

 PASS  app/sum-03.test.js
 PASS  app/product.test.js
 PASS  app/sum-04.test.js
 PASS  app/sum-02.test.js
 PASS  app/sum-01.test.js
------------|---------|----------|---------|---------|-------------------
File        | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
------------|---------|----------|---------|---------|-------------------
All files   |   91.67 |       50 |     100 |   91.67 |                   
 product.js |      75 |       50 |     100 |      75 | 6                 
 sum-01.js  |     100 |      100 |     100 |     100 |                   
 sum-02.js  |     100 |      100 |     100 |     100 |                   
 sum-03.js  |     100 |      100 |     100 |     100 |                   
 sum-04.js  |     100 |      100 |     100 |     100 |                   
------------|---------|----------|---------|---------|-------------------

Test Suites: 5 passed, 5 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        1.109 s
```

Jest reports a successful result, even though the overall branch coverage does not fulfill the `global` threshold (80%).
As discussed, the reason is that Jest uses `global` for all files that are unmatched by other threshold patterns (in this example, there are no other files). In other words, `global` rather means `everythingElse` or `unmatched`.

---

NOTE: When I first created this repository, I have referenced a previous version `jest@21.2.1` where I considered this issue not to be present. But I don't think this is true. This idea revolved around a `Coverage data for global was not found` warning that I cannot reproduce anymore in the latest version.
