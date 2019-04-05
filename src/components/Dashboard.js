import React, { Component } from 'react';
import firebase from '../services/firebase';
import auth from '../services/auth';
import Character from './Character';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            choices: [],
            votes: [],
        };
    }

    componentDidMount() {
        firebase.database().ref('characters').once('value', snapshot => {
            this.setState({ choices: snapshot.val() })
        });
    }

    toggleChoice = (choice) => {
        const votes = this.state.votes.slice();
        const choiceIndex = votes.findIndex(c => c === choice);
        if (choiceIndex > -1) {
            votes.splice(choiceIndex, 1);
        } else {
            votes.push(choice);
        }
        this.setState({ votes: votes });
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
                <div className="d-flex">
                    {
                        this.state.choices.map((c, i) => <Character onClick={this.toggleChoice} character={c} />)
                    }
                </div>
                <div className="d-flex my-5">
                    <strong>Picks: </strong>
                    {
                        this.state.votes.map(v => <span key={v} className="mx-3">{v}</span>)
                    }
                </div>
                <button className="btn btn-success" onClick={(e) => this.submit()} disabled={this.state.votes.length === 0}>SUBMIT</button>
            </div>
        );
    }
}

export default Dashboard;