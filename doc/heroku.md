For deployment you need next packages
```bash
yarn add express compression morgan
```
1. create server.js with express
2. add Procfile for Heroku knew what to do (by default Heroku runs `yarn start`)
    ```
    web: node server.js
    ```
3. deployment
- if you haven't got heroku account yet try this tutorial
https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app
you need to create account and run `heroku login` 
- after preparation you have to do this
    ```bash
    heroku create reduxstagram8 -b https://github.com/mars/create-react-app-buildpack.git
    git add .
    git commit -m "deploy to heroku with buildpack"
    git push heroku prod(?master)
    heroku open
    ```