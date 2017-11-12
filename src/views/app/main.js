import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Pages from 'views/pages';

// Main
export default props => (
    <main {...props} >
        <Switch>
            <Route exact path="/home" component={Pages.Counter} />
            <Route exact path="/signin" component={Pages.SignIn} />
            <Route path="/roster" component={Pages.Roster} />
            <Route path="/schedule" component={Pages.Schedule} />
            <Route path="/article" component={Pages.Article} />
            <Route path="/user" component={Pages.User} />
        </Switch>
    </main>
);
