import React, { Component } from 'react';
import { Router, Route, browserHistory} from 'react-router';
import firebase from './services/firebase.js';
import Login from './components/Login.js';
import Main from './components/Main.js';

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

  isUserAuthenticated = () => {
    return !!localStorage.getItem('userToken');
  }

  render() {
    return (
      <div className="container">
        <Router history={browserHistory}>
          <Route path ='/login' component={Login}>
          </Route>
        </Router>
      </div>
    );
  }
}

export default App;
