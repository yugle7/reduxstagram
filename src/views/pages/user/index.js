import React from 'react';
import { Switch, Route } from 'react-router-dom';
import UserList from './list';
import UserCreate from './create';
import UserUpdate from './update';


export default () => (
    <Switch>
        <Route path="/user/list" component={UserList} />
        <Route path="/user/create" component={UserCreate} />
        <Route path="/user/item/:id/update" component={UserUpdate} />
    </Switch>
);
