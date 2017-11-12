import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as reducers from 'reducers';

const mapStateToProps = state => ({ isAuthenticated: reducers.isAuthenticated(state) });

@connect(mapStateToProps, null)
export default class PrivateRoute extends Component {
    static propTypes = {
        component: PropTypes.node.isRequired,
        isAuthenticated: PropTypes.bool.isRequired,
    };
    render() {
        const { component, isAuthenticated, ...rest } = this.props;
        return (
            <Route
                {...rest}
                render={props => (
                    isAuthenticated ?
                        <component {...props} /> :
                        <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
                )}
            />
        );
    }
}
