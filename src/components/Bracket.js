import React, { Component } from "react";
import firebase from "../services/firebase";
import auth from "../services/auth";

class Bracket extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userBrackets: [],
            newBracket: false,
            joinBracket: false,
            joinBracketKey: null,
            newBracketName: null
        };
    }

    componentDidMount() {
        firebase.database().ref('bracketMemberships').orderByChild('member').equalTo(auth.getUser().uid).once('value', snapshot => {
            if (snapshot.val()) {
                Object.keys(snapshot.val()).map(k => snapshot.val()[k]).forEach(membership => {
                    firebase.database().ref('brackets').child(membership.bracket).once('value', snapshot => {
                        if (snapshot.val()) {
                            const userBrackets = this.state.userBrackets.slice();
                            userBrackets.push(snapshot.val());
                            this.setState({
                                userBrackets: userBrackets
                            });
                        }
                    })
                });
            }
        });
    }

    addBracket = () => {
        this.setState({
            newBracket: true
        });
    }

    submitBracket = () => {
        const key = firebase.database().ref('brackets').push().key;
        const newBracket = {
            key: key,
            name: this.state.newBracketName
        };
        firebase.database().ref('brackets').child(key).set(newBracket);
        const membershipKey = firebase.database().ref('bracketMemberships').push().key;
        firebase.database().ref('bracketMemberships').child(membershipKey).set({
            memberType: 'owner',
            member: auth.getUser().uid,
            bracket: key
        });
        const userBrackets = this.state.userBrackets.slice();
        userBrackets.push(newBracket);
        this.setState({
            newBracket: false,
            newBracketName: null,
            userBrackets: userBrackets
        });
    }

    joinBracket = () => {
        this.setState({
            joinBracket: true
        });
    }

    submitJoin = () => {
        firebase.database().ref('brackets').child(this.state.joinBracketKey).once('value', snapshot => {
            if (snapshot.val()) {
                const membershipKey = firebase.database().ref('bracketMemberships').push().key;
                firebase.database().ref('bracketMemberships').child(membershipKey).update({
                    memberType: 'member',
                    member: auth.getUser().uid,
                    bracket: this.state.joinBracketKey
                });
                const userBrackets = this.state.userBrackets.slice();
                userBrackets.push(snapshot.val());
                this.setState({
                    userBrackets: userBrackets,
                    joinBracket: false,
                    joinBracketKey: null
                });     
            }
            // TODO else error bracket does not exist
        });
    }

    handleNameChange = (e) => {
        this.setState({
            newBracketName: e.target.value
        });
    }

    handleKeyChange = (e) => {
        this.setState({
            joinBracketKey: e.target.value
        });
    }

    cancelAddBracket = () => {
        this.setState({
            newBracket: false,
            newBracketName: null
        });
    }

    cancelJoinBracket = () => {
        this.setState({
            joinBracket: false,
            joinBracketKey: null
        });
    }

    render() {
        return (
            <div>
                <div>
                    <button className="btn btn-primary" onClick={() => this.addBracket()} disabled={this.state.joinBracket || this.state.newBracket}>Create new bracket</button>
                    <button className="btn btn-primary" onClick={() => this.joinBracket()} disabled={this.state.joinBracket || this.state.newBracket}>Join existing bracket</button>
                </div>
                {
                    this.state.newBracket ?
                    <div>
                        <label>Enter name:</label>
                        <input onChange={(e) => this.handleNameChange(e)} type="text"/>
                        <button className="btn btn-primary" onClick={() => this.submitBracket()}>Save</button>
                        <button className="btn btn-primary" onClick={() => this.cancelAddBracket()}>Cancel</button>
                    </div>
                    : null
                }
                {
                    this.state.joinBracket ?
                    <div>
                        <label>Enter bracket key:</label>
                        <input onChange={(e) => this.handleKeyChange(e)} type="text"/>
                        <button className="btn btn-primary" onClick={() => this.submitJoin()}>Save</button>
                        <button className="btn btn-primary" onClick={() => this.cancelJoinBracket()}>Cancel</button>
                    </div>
                    : null
                }

                <div>
                    {
                        this.state.userBrackets.map((b, i) => <div key={i}><span>{b.name}</span>  <span>{b.key}</span></div>)
                    }
                </div>
            </div>
        );
    }
}

export default Bracket;