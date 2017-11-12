import React from 'react';
import Header from './header';
import Main from './main';
import './styles.scss';

const Application = () => (
    <div id="page">
        <Header id="header" />
        <Main id="main" />
    </div>
);

export default Application;
