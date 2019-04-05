import React, { Component } from 'react';
import firebase from '../services/firebase.js';

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

    redirectToMain() {
        this.props.history.push('/main');
    }

    isUserAuthenticated = () => {
        return !!localStorage.getItem('token');
    }

    render() {
        return (
            <div>
                {
                    this.isUserAuthenticated() && this.redirectToMain()
                }
                <button onClick={(e) => this.startLogin()}>
                    Login with Google
                </button>
            </div>
        );
    }
}

export default Login;