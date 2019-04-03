import React, { Component } from 'react';
import './App.css';
import  firebase from './firebase.js';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
        picks: [],
        timestamp: []
      };
  };

  componentDidMount(){
    const voteRef = firebase.database().ref('votes');
    voteRef.on('value', (snapshot) => {
      let votes = snapshot.val();
      this.setState({
        picks: votes.picks,
        timestamp: votes.timestamp
      });
    })
  }

  render(){
    return (
      <div>
        <p>PICKS|TIMESTAMP</p>
        <span>
          {this.state.picks + ' '}|{this.state.timestamp}
        </span>
      </div>
    );
  };
}

export default App;
