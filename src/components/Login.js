import React, { Component } from 'react';
import firebase from '../services/firebase.js';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            toMain: false
        };
    }

    startLogin = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().useDeviceLanguage();
        firebase.auth().signInWithPopup(provider).then((res) => {
            const token = res.credential.accessToken;
            const user = res.user;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            this.props.history.push('/main')
        },
        (err) => {
            console.log('err');
        });
    }

    render() {
        return (
            <div>
                <button onClick={(e) => this.startLogin()}>
                    Login with Google
                </button>
            </div>
        );
    }
}

export default Login;