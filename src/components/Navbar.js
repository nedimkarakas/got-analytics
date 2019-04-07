import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import auth from "../services/auth";

class Navbar extends Component {
    render() {
        const displayName = auth.isAuthenticated() ? auth.getUser().displayName.split(' ')[0] : null;
        const imageUrl = auth.isAuthenticated() ? auth.getUser().photoURL : null;

        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                <span className="navbar-brand">GoT Deadpool</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/dashboard"}>Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/leaderboard"}>Leaderboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/stats"}>Stats</Link>
                        </li>
                    </ul>
                    <div className="ml-auto">
                        {
                            !!displayName && !!imageUrl ?
                            <div>
                                <span>
                                    Welcome, {displayName}
                                </span>
                                <img src={imageUrl} alt={displayName} width="30" height="30" className="rounded-circle ml-2" />
                            </div>
                            : null
                        }
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;