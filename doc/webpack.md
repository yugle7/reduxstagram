### devServer
#### Enable HMR
This is probably the simplest that works for most cases but not for all.
 You need to pass inline and hot to enable HMR (all 4 part mentioned earlier).
1. inline option
→ This injects all the libraries required to monitor and reload the browser
2. hot option
→ Adds HotModuleReplacementPlugin that generates update chunks.
→ Adds `webpack/hot/dev-server` to every entry (single or multiple).
→ Sets WDS’ `hot` to true `{hot:true}` so relevant code for HMR is enabled
```json
// package.json
{
...
  "scripts": {
    "start": "webpack-dev-server --inline --hot"
  },
...
}
```