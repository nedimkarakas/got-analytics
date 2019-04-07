import React, { Component } from 'react';
import firebase from '../services/firebase';
import auth from '../services/auth';
import VoteSection from './VoteSection';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            choices: []
        };
    }

    componentDidMount() {
        firebase.database().ref('characters').once('value', snapshot => {
            this.setState({ choices: snapshot.val() })
        });
    }

    submitDeadpool = (votes) => {
        this.submit('deadpool', votes);
    }

    submitSafe = (votes) => {
        this.submit('safe', votes);
    }

    submitIronThrone = (votes) => {
        this.submit('ironthrone', votes);
    }

    submitAzorAhai = (votes) => {
        this.submit('azorahai', votes);
    }

    submit = (voteSection, votes) => {
        const votesRef = firebase.database().ref('votes');
        const newEntryKey = votesRef.push().key;
        votesRef.child(newEntryKey).set({
            section: voteSection,
            votes: votes,
            timestamp: new Date().valueOf(),
            userId: auth.getUser().uid
        });
    }

    render() {
        return (
            <div>
                <VoteSection title="Deadpool" choices={this.state.choices} submit={this.submitDeadpool} />
                <VoteSection title="Safe" choices={this.state.choices} submit={this.submitSafe} />
                <VoteSection title="Iron throne" choices={this.state.choices} submit={this.submitIronThrone} />
                <VoteSection title="Azor Ahai" choices={this.state.choices} submit={this.submitAzorAhai} />
            </div>
        );
    }
}

export default Dashboard;