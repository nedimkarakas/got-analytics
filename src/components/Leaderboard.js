import React, { Component } from "react";
import firebase from '../services/firebase';
import auth from '../services/auth';

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
            this.setState({ userList: Object.keys(snapshot.val()).map(k => snapshot.val()[k]).reverse() })
        });
        firebase.database().ref('leaderboard').orderByChild('userId').equalTo(auth.getUser().uid).once('value', snapshot => {
            if (snapshot.val()) {
                this.setState({ myStanding: Object.keys(snapshot.val()).map(k => snapshot.val()[k])[0] })
            } else {
                this.setState({ myStanding: false })
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
            </div>
        );
    }
}

export default Leaderboard;