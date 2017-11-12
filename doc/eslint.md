### roles
* [no-console](https://eslint.org/docs/rules/no-console)
* [curly](https://eslint.org/docs/rules/curly)
* [new-cap](https://eslint.org/docs/rules/new-cap) - require constructor names to begin with a capital letter (new-cap)
* [array-bracket-spacing](https://eslint.org/docs/rules/array-bracket-spacing) - [ [ 'foo' ], 'bar', 'baz' ];
* [indent](https://eslint.org/docs/rules/indent)
* [comma-dangle](https://eslint.org/docs/rules/comma-dangle)
* [max-len](https://eslint.org/docs/rules/max-len)
* [no-param-reassign](https://eslint.org/docs/rules/no-param-reassign)
* [arrow-body-style](https://eslint.org/docs/rules/arrow-body-style)
##### react
* (warn) [react/jsx-indent-props: [ 1, 4 ]](https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/jsx-indent-props.md) - This rule is aimed to enforce consistent indentation style. The default style is 4 spaces
* (warn) [react/sort-comp](https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/sort-comp.md#enforce-component-methods-order-reactsort-comp) - Enforce component methods order 
* (error) [react/prop-types](https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/prop-types.md) - Prevent missing props validation in a React component definition
* [react/prefer-stateless-function: 0](https://github.com/yannickcr/eslint-plugin-react/blob/HEAD/docs/rules/prefer-stateless-function.md)
    
   
### Windows: crlf -> lf  
https://intellij-support.jetbrains.com/hc/en-us/community/posts/205969644/comments/205115784

git config --global core.autocrlf false
git config --global core.eol lf
git rm --cached -rf .
git diff --cached --name-only -z | xargs -n 50 -0 git add -f