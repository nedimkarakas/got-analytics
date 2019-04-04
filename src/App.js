import React, { Component } from 'react';
import './App.css';
import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBlFEgp-x93QsnzdUB0J7G_h-pLk0yzoMo",
  authDomain: "got-analytics.firebaseapp.com",
  databaseURL: "https://got-analytics.firebaseio.com",
  projectId: "got-analytics",
  storageBucket: "got-analytics.appspot.com",
  messagingSenderId: "953410490273"
};
firebase.initializeApp(config);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      choices: [1,2,4,5,6,7],
      votes: [],
    };
  }

  addChoice = (choice) => {
    const votes = this.state.votes;
    votes.push(choice);
    this.setState({choices: this.state.choices, votes: votes});
  }

  submit = () => {
    const votesRef = firebase.database().ref('votes');
    const newEntryKey = votesRef.push().key;
    votesRef.child(newEntryKey).set({
      votes: this.state.votes,
      timestamp: new Date().valueOf()
    });
  }

  render() {
    return (
      <div className="container">
        <header className="d-flex">
          {
            this.state.choices.map(c => <button className="btn btn-outline-primary m-4 rounded-circle" key={c} onClick={(e) => this.addChoice(c)}>{c}</button>)
          }
        </header>
        <div className="d-flex my-5">
          <strong>Picks: </strong>
          {
            this.state.votes.map(v => <span className="mx-3">{v}</span>)
          }
        </div>
        <button className="btn btn-success" onClick={(e) => this.submit()}>SUBMIT</button>
      </div>
    );
  }
}

export default App;
