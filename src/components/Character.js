import React, { Component } from "react";

class Character extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSelected: false
        }
    }

    toggleSelect = () => {
        this.props.onClick(this.props.character.name);
        this.setState({isSelected: !this.state.isSelected});
    }

    render() {
        return (
            <div className="text-center">
                <div>
                    <img alt={this.props.character.name} src={this.props.character.img} key={this.props.character.name} onClick={this.toggleSelect} width="75" height="75" className="rounded-circle" />
                </div>
                <span>{this.props.character.name}</span>
            </div>
        );
    }
}

export default Character;