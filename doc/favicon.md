# Favicon
## First way
```bash
yarn add react-favicon
```
## Second way
<link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/manifest.json">
<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5">
<meta name="theme-color" content="#8b7575">

#### index.html
```html
<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.png">
```

#### webpack.js
```js
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');

// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';
module.exports = {
    //...
    plugins: [
       // Makes the public URL available as %PUBLIC_URL% in index.html, e.g.:
       // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
       // In development, this will be an empty string.
       new InterpolateHtmlPlugin({
         PUBLIC_URL: publicUrl
       }),
       // ...
   ]
}
```