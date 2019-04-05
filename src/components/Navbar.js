import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                </div>
            </nav>
        );
    }
}

export default Navbar;