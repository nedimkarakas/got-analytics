import React, { Component } from "react";
import '../styles/Character.css';

class Character extends Component {
    constructor(props) {
        super(props);

        // this.state = {
        //     isSelected: this.props.isSelected
        // }
    }

    toggleSelect = () => {
        if (this.props.onClick) {
            this.props.onClick(this.props.character.Name)
        }
    }

    render() {
        return (
            <div className={"text-center width-75-px " + (this.props.isSelected ? "d-none" : "")}>
                <div>
                    <img alt={this.props.character.Name} src={this.props.character.Image} key={this.props.character.Name} onClick={this.toggleSelect} width="125" height="125" className="rounded-circle" />
                </div>
                <span>{this.props.character.Name}</span>
            </div>
        );
    }
}

export default Character;
