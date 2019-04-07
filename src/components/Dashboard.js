import React, { Component } from 'react';
import firebase from '../services/firebase';
import auth from '../services/auth';
import VoteSection from './VoteSection';
import Character from './Character';

class Dashboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            choices: [],
            completedSections: []
        };
    }

    componentDidMount() {
        firebase.database().ref('characters').once('value', snapshot => {
            this.setState({ choices: snapshot.val() })
        });
        firebase.database().ref('votes').orderByChild('userId').equalTo(auth.getUser().uid).once('value', snapshot => {
            if (snapshot.val()) {
                this.setState({
                    completedSections: Object.keys(snapshot.val()).map(k => snapshot.val()[k])
                });
            }
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
        const completedSections = this.state.completedSections.slice();
        completedSections.push({section: voteSection, votes: votes});
        this.setState({
            completedSections: completedSections
        })
    }

    render() {
        const deadpoolVote = this.state.completedSections.filter(v => v.section === 'deadpool')[0];
        const safeVote = this.state.completedSections.filter(v => v.section === 'safe')[0];
        const ironThroneVote = this.state.completedSections.filter(v => v.section === 'ironthrone')[0];
        const azorAhaiVote = this.state.completedSections.filter(v => v.section === 'azorahai')[0];

        return (
            <div>
                {
                    !deadpoolVote ?
                        <VoteSection title="Deadpool" choices={this.state.choices} submit={this.submitDeadpool} />
                        :

                        <div>
                            <h2>Deadpool</h2>
                            <h3>Your picks:</h3>
                            <div className="d-flex justify-content-center">
                                {
                                    this.state.choices.filter(c => deadpoolVote.votes.some(v => v === c.Name)).map((c, i) => <Character isSelected={false} key={i} character={c} />)
                                }
                            </div>
                        </div>
                }
                {
                    !safeVote ?
                        <VoteSection title="Safe" choices={this.state.choices} submit={this.submitSafe} />
                        :

                        <div>
                            <h2>Safe</h2>
                            <h3>Your picks:</h3>
                            <div className="d-flex justify-content-center">
                                {
                                    this.state.choices.filter(c => safeVote.votes.some(v => v === c.Name)).map((c, i) => <Character isSelected={false} key={i} character={c} />)
                                }
                            </div>
                        </div>
                }
                {
                    !ironThroneVote ?
                        <VoteSection title="Iron throne" choices={this.state.choices} submit={this.submitIronThrone} />
                        :

                        <div>
                            <h2>Iron throne</h2>
                            <h3>Your picks:</h3>
                            <div className="d-flex justify-content-center">
                                {
                                    this.state.choices.filter(c => ironThroneVote.votes.some(v => v === c.Name)).map((c, i) => <Character isSelected={false} key={i} character={c} />)
                                }
                            </div>
                        </div>
                }
                {
                    !azorAhaiVote ?
                        <VoteSection title="Azor Ahai" choices={this.state.choices} submit={this.submitAzorAhai} />
                        :

                        <div>
                            <h2>Azor Ahai</h2>
                            <h3>Your picks:</h3>
                            <div className="d-flex justify-content-center">
                                {
                                    this.state.choices.filter(c => azorAhaiVote.votes.some(v => v === c.Name)).map((c, i) => <Character isSelected={false} key={i} character={c} />)
                                }
                            </div>
                        </div>
                }
            </div>
        );
    }
}

export default Dashboard;