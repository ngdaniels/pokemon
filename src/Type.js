import React, { Component } from "react";
import styled from '@emotion/styled'

class Type extends Component {
    render() {
        let { type } = this.props;

        let Element = styled.button`
            background-color: ${props => props.background};
            color: white;
            border: 1px solid;
            border-radius: 20%/50%;
            margin: 5px;
            padding: 8px 10px;
            font-weight: bold;
            width: 100px;
        `

        let background;
        switch (type) {
            case "normal":
                background = "#a8a878";
                break;
            case "fighting":
                background = "#c03028";
                break;
            case "flying":
                background = "#a890f0";
                break;
            case "poison":
                background = "#a040a0";
                break;
            case "ground":
                background = "#e0c068";
                break;
            case "rock":
                background = "#b8a038";
                break;
            case "bug":
                background = "#a8b820";
                break;
            case "ghost":
                background = "#705898";
                break;
            case "steel":
                background = "#b8b8d0";
                break;
            case "fire":
                background = "#f08030";
                break;
            case "water":
                background = "#6890f0";
                break;
            case "grass":
                background = "#78c850";
                break;
            case "electric":
                background = "#f8d030";
                break;
            case "psychic":
                background = "#f85888";
                break;
            case "ice":
                background = "#98d8d8";
                break;
            case "dragon":
                background = "#7038f8";
                break;
            case "dark":
                background = "#705848";
                break;
            case "fairy":
                background = "#ee99ac";
                break;
            case "unknown":
                background = "#68a090";
                break;
            case "shadow":
                background = "#000000";
                break;
            default:
                break;
        }

        return (
            <Element background={background}>
                {type.toUpperCase()}
            </Element>
        )
    }
}

export default Type;