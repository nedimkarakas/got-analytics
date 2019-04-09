import React, { Component } from "react";
import firebase from '../services/firebase';
import auth from '../services/auth';
import BracketLeaderboard from './BracketLeaderboard';

class Leaderboard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userList: [],
            myStanding: {}
        };
    }

    componentDidMount() {
        firebase.database().ref('leaderboard').orderByChild('points').limitToFirst(10).once('value', snapshot => {
            const snapValue = snapshot.val();
            let standings = Object.keys(snapValue).map(k => snapValue[k]);
            standings.sort((a, b) => b.points - a.points);
            this.setState({ userList: standings })
        });
        firebase.database().ref('leaderboard').orderByChild('userId').equalTo(auth.getUser().uid).once('value', snapshot => {
            if (snapshot.val()) {
                const standings = Object.keys(snapshot.val()).map(k => snapshot.val()[k])[0];
                this.setState({ myStanding: standings })
            } else {
                this.setState({ myStanding: false })
            }
        });
        firebase.database().ref('bracketMemberships').orderByChild('member').equalTo(auth.getUser().uid).once('value', snapshot => {
            if (snapshot.val()) {
                Object.keys(snapshot.val()).map(k => {
                    const bracketKey = snapshot.val()[k].bracket;
                    firebase.database().ref('bracketMemberships').orderByChild('bracket').equalTo(bracketKey).once('value', snapshot => {
                        if (snapshot.val()) {
                            const allUsersBracket = Object.keys(snapshot.val()).map(k => snapshot.val()[k]);
                            const allUserPoints = this.state.allUserPoints ? this.state.allUserPoints.slice() : [];
                            allUsersBracket.forEach(u => {
                                const existingUser = allUserPoints.find(p => p.userId === u.member);
                                if (!existingUser) {
                                    firebase.database().ref('leaderboard').orderByChild('userId').equalTo(u.member).once('value', snapshot => {
                                        const snapValue = snapshot.val();
                                        if (snapValue) {
                                            Object.keys(snapValue).map(k => snapValue[k]).map(p => {
                                                p.brackets = [bracketKey];
                                                this.setState({
                                                    allUserPoints: this.state.allUserPoints ? [...this.state.allUserPoints.slice(), p] : [p]
                                                });
                                            });
                                        }
                                    });
                                } else {
                                    existingUser.brackets.push(bracketKey);
                                }
                            });
                        }
                    })
                    firebase.database().ref('brackets').orderByChild('key').equalTo(bracketKey).once('value', snapshot => {
                        this.setState({
                            userBrackets: this.state.userBrackets ? [...this.state.userBrackets.slice(), ...Object.keys(snapshot.val()).map(k => snapshot.val()[k])] : [...Object.keys(snapshot.val()).map(k => snapshot.val()[k])]
                        })
                    });
                })
            }
        });
    }

    render() {
        const isUserInTop10 = this.state.userList.map(u => u.userId).some(id => id === auth.getUser().uid);

        return (
            <div>
                <div className="row">
                    <div className="col-sm-1">Rank</div>
                    <div className="col-sm-2">Image</div>
                    <div className="col-sm-8">Name</div>
                    <div className="col-sm-1">Points</div>
                </div>
                {
                    this.state.userList.map((u, i) => (
                        <div className={"row rounded border border-dark my-1 " + (auth.getUser().uid === u.userId ? "bg-info" : "")}>
                            <div className="col-sm-1 align-middle my-auto">{i + 1}.</div>
                            <div className="col-sm-2">
                                <img className="rounded-circle" src={u.userImg} alt={u.displayName} width="50" height="50" />
                            </div>
                            <div className="col-sm-8 align-middle my-auto">{u.displayName}</div>
                            <div className="col-sm-1 align-middle my-auto">{u.points}</div>
                        </div>
                    ))
                }
                {
                    !isUserInTop10 ?
                        <div className="row rounded border border-dark mt-4">
                            <div className="col-sm-1 align-middle my-auto">...</div>
                            <div className="col-sm-2">
                                <img className="rounded-circle" src={!!this.state.myStanding ? this.state.myStanding.userImg : auth.getUser().photoURL} alt={!!this.state.myStanding ? this.state.myStanding.displayName : auth.getUser().displayName} width="50" height="50" />
                            </div>
                            <div className="col-sm-8 align-middle my-auto">{!!this.state.myStanding ? this.state.myStanding.displayName : auth.getUser().displayName}</div>
                            <div className="col-sm-1 align-middle my-auto">{!!this.state.myStanding ? this.state.myStanding.points : 0}</div>
                        </div>
                        :
                        null
                }

                {
                  this.state.userBrackets && this.state.userBrackets.map(b => (
                    <div>
                      <h3>{b.name}</h3>
                      <BracketLeaderboard users={this.state.allUserPoints && this.state.allUserPoints.filter(p => p.brackets.includes(b.key))}></BracketLeaderboard>
                    </div>
                  ))
                }
            </div>
        );
    }
}

export default Leaderboard;
