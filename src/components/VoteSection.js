import React, { Component } from 'react';
import Character from "./Character";
import '../styles/VoteSection.css'

class VoteSection extends Component {
    constructor(props) {
        super(props);

        this.state = {
            votes: [],
            search: ''
        };
    }

    toggleChoice = (choice) => {
        const votes = this.state.votes.slice();
        const choiceIndex = this.findChoiceIndex(choice);
        if (choiceIndex > -1) {
            votes.splice(choiceIndex, 1);
        } else {
            votes.push(choice);
        }
        this.setState({ votes: votes });
    }

    findChoiceIndex = (choice) => {
        return this.state.votes.findIndex(c => c === choice);
    }

    searchInput = (event) => {
        this.setState({search: event.target.value});
    }

    render() {
        return (
            <div>
                <div className="d-flex">
                    {
                        !!this.props.title ?
                            <h2>
                                {this.props.title}
                            </h2>
                            : null
                    }
                    <div className="ml-auto">
                        <input className="form-control" onChange={(e) => this.searchInput(e)} placeholder="Filter..." type="text"/>
                    </div>
                </div>

                <div className="d-flex">
                    {
                        this.props.choices.filter(c => c.Name.toLowerCase().includes(this.state.search.toLowerCase())).map((c, i) => <Character isSelected={this.findChoiceIndex(c.Name) === -1 ? false : true} key={i} onClick={this.toggleChoice} character={c} />)
                    }
                </div>
                <div className="d-flex my-5">
                    <strong>Picks: </strong>
                    {
                        this.state.votes.map(v => <h4 key={v} onClick={() => this.toggleChoice(v)} className="badge badge-primary badge-pill hover-danger">{v}</h4>)
                    }
                </div>
                <button className="btn btn-success" onClick={() => this.props.submit(this.state.votes)} disabled={this.state.votes.length === 0}>SUBMIT</button>
            </div>
        );
    }
}

export default VoteSection;