yarn add -D jest babel-jest enzyme

!Warning: need babel-preset-es2015
esLint: add in env jest: true

1. install jest
yarn add --dev jest babel-jest
2. append test to your scripts in package.json
"scripts": {
  "test": "jest"
    "test": "jest --coverage --config=exercises/jest.config.json",
    "test:final": "jest --coverage --config=exercises-final/jest.config.json",
    "watch:test": "jest --watch --config=exercises/jest.config.json",


#FAQ
### How can I get WebStorm to recognize Jasmine methods?
1) Cmd + ,
2) Libraries
3) Click on Download...
4) Switch to TypeScript community stubs
5) Find jest and click on Download and Install

### How to ignore scss imports
1. create somewhere file styleMock.js << module.exports = 'test-file-stub';
2. add jest settings in `package.json`
```json
// package.json
"jest": {
  ...
  "moduleNameMapper": {
    "\\.scss$": "path/to/styleMock.js"
  }
}

```
### How to append absolute paths
Append the same directories as in webpack
```json
// package.json
"jest": {
  "moduleDirectories": [ "node_modules", "src" ]
},
```