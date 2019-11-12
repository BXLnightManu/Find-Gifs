import React, { Component } from 'react';
import { connect } from  'react-redux';

export function requireNoAuth (ComposedComponent) {
    class NoAuthentication extends Component {
        componentWillMount() {
            if(this.props.authenticated)
                this.props.history.push("/gifsearch");
        }
        componentWillUpdate() {
            if(this.props.authenticated)
                this.props.history.push("/gifsearch");
        }
        render() {
             return <ComposedComponent {...this.props} />
        }
    }
    function  mapStateToProps(state) {
        return { authenticated: state.auth.token };
    }   
    return connect(mapStateToProps)(NoAuthentication);
}