import React, { Component } from "react";
import './ListCard.css';
import $ from 'jquery';
import {
    NavLink,
    HashRouter
} from "react-router-dom";

class ListCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            releasing: false,
            showConfirmationText: false
        };
    }

    toggleReleaseConfirmation = async() => {
        let { pokemon } = this.props;

        this.setState({
            releasing: !this.state.releasing
        });
        if (this.state.releasing) {
            this.setState({
                showConfirmationText: false
            });
            await $(`#release-${pokemon.name}-${pokemon.nickname}`).animate({ width: "100%" }).promise();
        }
        else {
            await $(`#release-${pokemon.name}-${pokemon.nickname}`).animate({ width: "1.5rem" }).promise();
            this.setState({
                showConfirmationText: true
            });
        }
    };

    release = () => {
        this.props.release(this.props.pokemon.nickname);
    }

    render() {
        let { pokemon, page } = this.props;

        // Get Pokemon Number
        let pokemonNumber = pokemon.id;

        let diplayedPokemonNumber = String(pokemonNumber);
        while (diplayedPokemonNumber.length < 3) {
            diplayedPokemonNumber = `0${diplayedPokemonNumber}`;
        }
        diplayedPokemonNumber = `#${diplayedPokemonNumber}`

        if (page === "list") {
            return (
                <HashRouter>
                    <NavLink to={{ pathname: `/detail/${pokemon.name}` }}>
                        <table className="card" onClick={this.changeColor}>
                            <tbody>
                                <tr>
                                    <td style={{width: "50%"}}>
                                        <span className="bold">{diplayedPokemonNumber}</span>
                                    </td>
                                    <td rowSpan="2">
                                        <img className="pokemon-picture" src={pokemon.image} alt="pokemon"></img>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <span className="bold">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </NavLink>
                </HashRouter>
            );
        }
        else if (page === "collection") {
            let releaseConfirmationText = this.state.showConfirmationText ? <div className="confirmation-text">Are you sure to release {pokemon.nickname}?</div> : '';
            let releaseConfirmationButton = this.state.releasing ? <div className="release-button confirm-release" onClick={this.release}>✔</div> : '';
            let releaseButtonText = this.state.releasing ? "✘" : "Release";

            return (
                <table className="card" onClick={this.changeColor}>
                    <tbody>
                        <tr>
                            <td>
                                {diplayedPokemonNumber}<br></br>
                                {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                            </td>
                            <td rowSpan="2">
                                <img className="pokemon-picture" src={pokemon.image} alt="pokemon"></img>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <p className="bold">{pokemon.nickname}</p>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" >
                                <div className="release">
                                    {releaseConfirmationText}
                                    {releaseConfirmationButton}

                                    <div className="release-button" id={`release-${pokemon.name}-${pokemon.nickname}`} onClick={this.toggleReleaseConfirmation}>
                                        {releaseButtonText}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            );
        }
    }
}

export default ListCard;