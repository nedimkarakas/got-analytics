import React, {Component} from 'react';
import auth from '../services/auth';

class BracketLeaderboard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <div>
        {
          this.props.users && this.props.users.map((u, i) => (
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
      </div>
    );
  }
}

export default BracketLeaderboard;
