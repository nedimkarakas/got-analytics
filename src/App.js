import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import firebase from 'firebase';
import reactfire from 'reactfire';

const config = {
  apiKey: "AIzaSyBlFEgp-x93QsnzdUB0J7G_h-pLk0yzoMo",
  authDomain: "got-analytics.firebaseapp.com",
  databaseURL: "https://got-analytics.firebaseio.com",
  projectId: "got-analytics",
  storageBucket: "got-analytics.appspot.com",
  messagingSenderId: "953410490273"
};
firebase.initializeApp(config);

class FirebaseApi {
  votes = () => firebase.database().ref('votes');
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      votes: [],
    };
  }

  componentWillMount() {  
    this.votes = firebase.database().ref("votes");
  }

  componentDidMount() {
    firebase.database().ref('votes').once('value').then(val => {
      this.setState({votes: val.val()});
    });
  }

  componentWillUnmount() {
    this.votes.off();
  };
  
  render() {
    const {votes} = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <div>
            {
              votes.length > 0 && 
              <span>
                {votes[votes.length - 1].picks}
              </span>
            }
          </div>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
