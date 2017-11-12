import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ArticleList from './list';
import ArticleSingle from './single';
import ArticleCreate from './create';
import ArticleUpdate from './update';


export default () => (
    <Switch>
        <Route path="/article/list" component={ArticleList} />
        <Route path="/article/create" component={ArticleCreate} />
        <Route path="/article/item/:id/update" component={ArticleUpdate} />
        <Route path="/article/item/:id" component={ArticleSingle} />
    </Switch>
);
