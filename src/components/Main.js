import React, { Component } from 'react';
import firebase from '../services/firebase';
import auth from '../services/auth';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            choices: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49],
            votes: [],
        };
    }

    addChoice = (choice) => {
        const votes = this.state.votes;
        votes.push(choice);
        this.setState({ choices: this.state.choices, votes: votes });
    }

    submit = () => {
        const votesRef = firebase.database().ref('votes');
        const newEntryKey = votesRef.push().key;
        votesRef.child(newEntryKey).set({
            votes: this.state.votes,
            timestamp: new Date().valueOf(),
            userId: auth.getUser().uid
        });
    }

    render() {
        return (
            <div>
                <header className="d-flex">
                    {
                        this.state.choices.map(c => <button className="btn btn-outline-primary m-4 rounded-circle" key={c} onClick={(e) => this.addChoice(c)}>{c}</button>)
                    }
                </header>
                <div className="d-flex my-5">
                    <strong>Picks: </strong>
                    {
                        this.state.votes.map(v => <span key={v} className="mx-3">{v}</span>)
                    }
                </div>
                <button className="btn btn-success" onClick={(e) => this.submit()}>SUBMIT</button>
            </div>
        );
    }
}

export default Main;