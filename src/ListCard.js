import React, { Component } from "react";
import './ListCard.css';
import $ from 'jquery';
import {
    Redirect
} from "react-router-dom";

class ListCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            releasing: false,
            showConfirmationText: false
        };
    }

    goToDetailPage = () => {
        this.setState({
            goToDetail: true
        });
    };

    toggleReleaseConfirmation = async () => {
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
        this.setState({
            deleted: true
        });

        setTimeout(() => {
            this.props.release(this.props.pokemon.nickname);
        }, 300);
        
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

        let topColumn, botColumn, release;

        if (page === 'list') {
            topColumn = (
                <span className="bold">{diplayedPokemonNumber}</span>
            );
            botColumn = (
                <span className="bold">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</span>
            );
            release = null;
        }
        else if (page === 'collection') {
            topColumn = (
                <span className="bold">{pokemon.nickname}</span>
            );
            botColumn = (
                <div className="bold">
                    {diplayedPokemonNumber}<br></br>
                    {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </div>
            );

            let releaseConfirmationText = this.state.showConfirmationText ? <div className="confirmation-text">Are you sure to release {pokemon.nickname}?</div> : '';
            let releaseConfirmationButton = this.state.releasing ? <div className="card-button confirm-release" onClick={this.release}>✔</div> : '';
            let releaseButtonText = this.state.releasing ? "✘" : "Release";

            release = (
                <tfoot>
                    <tr>
                        <td colSpan="2" >
                            <div className="flex-end">
                                {releaseConfirmationText}
                                {releaseConfirmationButton}

                                <div className="card-button button-release" id={`release-${pokemon.name}-${pokemon.nickname}`} onClick={this.toggleReleaseConfirmation}>
                                    {releaseButtonText}
                                </div>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            );
        }

        let cardTable = (
            <tbody onClick={this.goToDetailPage}>
                <tr>
                    <td className="elipsis" style={{ width: "50%" }}>
                        {topColumn}
                    </td>
                    <td rowSpan="2">
                        <img className="pokemon-picture" src={pokemon.image} alt={pokemon.name}></img>
                    </td>
                </tr>
                <tr>
                    <td className="elipsis">
                        {botColumn}
                    </td>
                </tr>
            </tbody>
        );

        if (this.state.goToDetail) {
            return (
                <Redirect to={`detail/${pokemon.name}`} />
            )
        }

        if (page === "collection" || page === "list") {
            return (
                <table className="card" style={ {transform: `scaleY(${this.state.deleted ? 0 : 1})` } }>
                    {cardTable}
                    {release}
                </table>
            );
        }
        else {
            return (
                ""
            )
        }
    }
}

export default ListCard;