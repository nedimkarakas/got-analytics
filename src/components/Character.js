import React, { Component } from "react";

class Character extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     isSelected: this.props.isSelected
        // }
    }

    toggleSelect = () => {
        this.props.onClick(this.props.character.Name);
        // this.setState({isSelected: !this.state.isSelected});
    }

    render() {
        return (
            <div className={"text-center " + (this.props.isSelected ? "d-none" : "")}>
                <div>
                    <img alt={this.props.character.Name} src={this.props.character.Image} key={this.props.character.Name} onClick={this.toggleSelect} width="75" height="75" className="rounded-circle" />
                </div>
                <span>{this.props.character.Name}</span>
            </div>
        );
    }
}

export default Character;