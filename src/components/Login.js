import React, { Component } from 'react';
import firebase from '../services/firebase.js';
import "../styles/Login.css";
class Login extends Component {
    startLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().useDeviceLanguage();
        firebase.auth().signInWithPopup(provider).then((res) => {
            const token = res.credential.accessToken;
            const user = res.user;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            this.redirectToMain();
        },
            (err) => {
                console.log('err');
            });
    }

    componentWillMount() {
        if (this.isUserAuthenticated()) {
            this.redirectToMain();
        }
    }

    redirectToMain() {
        this.props.history.push('/');
    }

    isUserAuthenticated = () => {
        return !!localStorage.getItem('token');
    }

    render() {
        return (

            <div className="d-flex flex-column justify-content-center align-items-center h-100-vh">
                <div className="login-bg h-100 w-100 position-fixed"></div>
                <div className="position-fixed w-100 bg-dark opacity-30 bg-strip"></div>
                <div className="position-fixed d-flex flex-column align-items-center justify-content-center py-3">
                    <div className="mb-4">
                        GoT: The Final Bracket
                    </div>
                    <div className="d-flex align-items-center">
                        <button className="btn btn-white" id="login-btn" onClick={(e) => this.startLogin()}>
                            Login with Google
                        </button>
                        <h5 className="mb-0 mx-1">to proceed.</h5>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;