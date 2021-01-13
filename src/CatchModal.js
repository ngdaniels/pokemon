import React, { Component } from "react";
import './CatchModal.css'

class CatchModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            named: false,
            pokemon: props.pokemon,
            message: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleNaming = this.handleNaming.bind(this);
    }

    handleChange = (event) => {
        this.setState({ nickname: event.target.value });
    }

    handleNaming = (event) => {
        event.preventDefault();

        //Reset message
        this.setState({
            message: ``
        });

        //Check if nickname is null
        if (this.state.nickname === '') {
            this.setState({
                message: `Please input a nickname`
            });
            return;
        }

        //Get owned pokemons
        let owned = JSON.parse(localStorage.owned);
        
        //Check for duplicate
        let duplicate = owned.filter(own => {
            return (own.nickname === this.state.nickname);
        });
        
        // Show message if duplicate exist
        if (duplicate.length > 0) {
            this.setState({
                message: `You already have a Pokémon named ${this.state.nickname}. Please consider a different name.`
            });
            return;
        }

        owned.push({
            pokemonName: this.state.pokemon.name,
            pokemonId: this.state.pokemon.id,
            pokemonImage: this.state.pokemon.sprites.front_default,
            nickname: this.state.nickname
        });

        this.setState({
            named: true
        });

        localStorage.setItem('owned', JSON.stringify(owned));
    };

    render() {
        let { showModal, caught, handleClose } = this.props;
        let pokemonName = this.state.pokemon.name.charAt(0).toUpperCase() + this.state.pokemon.name.slice(1);

        let closeModal = () => {
            this.setState({
                nickname: '',
                named: false
            });
            handleClose();
        }

        if (showModal) {
            if (caught) {
                let modal;
                if (!this.state.named) {
                    modal = (
                        <div >
                            <p>
                                Gotcha!<br></br>
                                {pokemonName} was caught!
                            </p>

                            <form onSubmit={this.handleNaming}>
                                Nickname <br></br>
                                <input type="text" value={this.state.nickname} onChange={this.handleChange} id="input-nickname" />
                                <p>
                                    {this.state.message}
                                </p>
                                <input type="submit" value="Save" style={{ float: "right" }} className="modal-button button-primary"/>
                                <button type="button" className="modal-button button-secondary" onClick={closeModal} >
                                    Release
                                </button>
                            </form>
                        </div>
                    );
                }
                else {
                    modal = (
                        <div>
                            <p>
                                {this.state.nickname} is added to your collection
                            </p>
                            <button type="button" className="modal-button button-primary" onClick={closeModal} style={{ float: "right" }}>
                                OK
                            </button>
                        </div>
                    );
                }
                
                return (
                    <div className="modal modal-shown">
                        <div className="modal-main">
                            {modal}
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div className="modal modal-shown">
                        <div className="modal-main">
                            <p>
                                Oh no!<br></br>
                                {pokemonName} broke free!
                            </p>

                            <button type="button" className="modal-button button-primary" onClick={handleClose} style={{ float: "right" }}>
                                OK
                            </button>
                        </div>
                    </div>
                )
            }

        }
        else {
            return (
                <div className="modal modal-hidden">
                </div>
            )
        }

    }
}

export default CatchModal;