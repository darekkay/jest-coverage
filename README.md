Example project to reproduce [Issue 5427](https://github.com/facebook/jest/issues/5427) in Jest.

```
npm install
npm run test
```

Goal: Enforce an 80% overall coverage and a 50% single file coverage. 

This example has 4 fully tested files (`sum-0x`) and a fully untested `product.js`.

Note: I have installed Jest globally (`21.2.1`) and locally (`22.4.3`).

In Jest@21.2.1 it works as expected:

```
$ jest --coverage
 PASS  app\sum-02.test.js
 PASS  app\sum-04.test.js
 PASS  app\sum-01.test.js
 PASS  app\sum-03.test.js

Test Suites: 4 passed, 4 total
Tests:       4 passed, 4 total
Snapshots:   0 total
Time:        3.423s
Ran all test suites.
------------|----------|----------|----------|----------|----------------|
File        |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
------------|----------|----------|----------|----------|----------------|
All files   |       80 |      100 |       80 |       80 |                |
 product.js |        0 |      100 |        0 |        0 |            4,7 |
 sum-01.js  |      100 |      100 |      100 |      100 |                |
 sum-02.js  |      100 |      100 |      100 |      100 |                |
 sum-03.js  |      100 |      100 |      100 |      100 |                |
 sum-04.js  |      100 |      100 |      100 |      100 |                |
------------|----------|----------|----------|----------|----------------|
Jest: Coverage for statements (0%) does not meet C:\jest-coverage\app\product.js threshold (50%)
Jest: Coverage for lines (0%) does not meet C:\jest-coverage\app\product.js threshold (50%)
Jest: Coverage for functions (0%) does not meet C:\jest-coverage\app\product.js threshold (50%)
```


In Jest@22.4.3 we get this instead:

```
$ npm run test

> @ test C:\jest-coverage
> jest --coverage

 PASS  app\sum-02.test.js
 PASS  app\sum-04.test.js
 PASS  app\sum-01.test.js
 PASS  app\sum-03.test.js
------------|----------|----------|----------|----------|-------------------|
File        |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
------------|----------|----------|----------|----------|-------------------|
All files   |       80 |      100 |       80 |       80 |                   |
 product.js |        0 |      100 |        0 |        0 |               2,5 |
 sum-01.js  |      100 |      100 |      100 |      100 |                   |
 sum-02.js  |      100 |      100 |      100 |      100 |                   |
 sum-03.js  |      100 |      100 |      100 |      100 |                   |
 sum-04.js  |      100 |      100 |      100 |      100 |                   |
------------|----------|----------|----------|----------|-------------------|
Jest: Coverage data for global was not found.
Jest: "C:\jest-coverage\app\product.js" coverage threshold for statements (50%) not met: 0%
Jest: "C:\jest-coverage\app\product.js" coverage threshold for lines (50%) not met: 0%
Jest: "C:\jest-coverage\app\product.js" coverage threshold for functions (50%) not met: 0%
```

We get `Coverage data for global was not found` (which is expected as "If the file specified by path is not found, error is returned."). To demontrate the issue a little better, we can delete `product.js` to get a 100% coverage, which will still cause `npm run test` to fail:

```
$ npm run test

> @ test C:\jest-coverage
> jest --coverage

 PASS  app\sum-02.test.js
 PASS  app\sum-04.test.js
 PASS  app\sum-01.test.js
 PASS  app\sum-03.test.js
-----------|----------|----------|----------|----------|-------------------|
File       |  % Stmts | % Branch |  % Funcs |  % Lines | Uncovered Line #s |
-----------|----------|----------|----------|----------|-------------------|
All files  |      100 |      100 |      100 |      100 |                   |
 sum-01.js |      100 |      100 |      100 |      100 |                   |
 sum-02.js |      100 |      100 |      100 |      100 |                   |
 sum-03.js |      100 |      100 |      100 |      100 |                   |
 sum-04.js |      100 |      100 |      100 |      100 |                   |
-----------|----------|----------|----------|----------|-------------------|
Jest: Coverage data for global was not found.
```