import React, {Component} from 'react';

class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {};
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
                    this.state.votes.map(v => <span className="mx-3">{v}</span>)
                    }
                </div>
                <button className="btn btn-success" onClick={(e) => this.submit()}>SUBMIT</button>
            </div>
        );
    }
}

export default Main;