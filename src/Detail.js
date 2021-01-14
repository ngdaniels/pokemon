import React, { Component } from "react";
import $ from "jquery";
import './Detail.css';
import Loading from './Loading.js';
import Type from './Type.js'
import Move from './Move.js'
import CatchModal from './CatchModal.js';
import Pokéball from './Assets/Pokéball.png';
import PokéballCaught from './Assets/PokéballCaught.png';
import Spark from './Assets/Spark.png';
import Pikachu from './Assets/Pikachu.png';

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            pokemonName: props.match.params.pokemonName,
            showModal: false,
            caught: false,
            catching: false
        };
    }

    componentDidMount() {
        this.mounted = true;

        const gqlQuery = `query pokemon($name: String!) {
            pokemon(name: $name) {
              id
              name
              weight
              height
              sprites {
                front_default
                back_default
              }
              moves {
                move {
                  name
                  url
                }
              }
              types {
                type {
                  name
                }
              }
            }
          }`;

        const gqlVariables = {
            name: this.state.pokemonName,
        };

        fetch('https://graphql-pokeapi.vercel.app/api/graphql', {
            credentials: 'omit',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: gqlQuery,
                variables: gqlVariables,
            }),
            method: 'POST',
        })
            .then((res) => res.json())
            .then((res) => {
                if (this.mounted) {
                    this.setState({
                        isLoaded: true,
                        pokemon: res.data.pokemon
                    });
                }
            });
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    catchPokemon = async () => {
        //Prevent re-catching while animating
        if (this.state.catching) {
            return;
        }

        this.setState({
            catching: true
        });

        //Animate pokeball
        for (let i = 0; i < 2; i++) {
            await $("#pokeball").animate(
                { deg: 30 },
                {
                  duration: 500,
                  step: function(now) {
                    $(this).css({ transform: 'rotate(' + now + 'deg)' });
                  }
                }
            ).promise();
            await $("#pokeball").animate(
                { deg: -30 },
                {
                  duration: 500,
                  step: function(now) {
                    $(this).css({ transform: 'rotate(' + now + 'deg)' });
                  }
                }
            ).promise();
        }
        await $("#pokeball").animate(
            { deg: 0 },
            {
              duration: 500,
              step: function(now) {
                $(this).css({ transform: 'rotate(' + now + 'deg)' });
              }
            }
        ).promise();


        setTimeout(async() => {
            //Randomize
            let randomNumber = Math.random();
            let caught = false;
            if (randomNumber >= 0.5) {
                caught = true;
            }

            if (caught) {
                await $("#pokeball").attr("src", PokéballCaught).promise();
            }
            else {
                await $("#pokeball").attr("src", Spark).promise();
            }

            setTimeout(async () => {
                //Show Modal
                this.setState({
                    caught,
                    showModal: true,
                    catching: false
                });
                document.body.style.overflow = "hidden";
                document.body.style.height = "100%";
            }, 300);
        }, 500);
    };

    hideModal = () => {
        $("#pokeball").attr("src", Pokéball);

        document.body.style.overflow = "auto";
        document.body.style.height = "auto";

        this.setState({
            caught: false,
            showModal: false
        });
    };

    render() {
        let { error, isLoaded, pokemon } = this.state;

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <Loading show="true"/>;
        } else if (!pokemon.id) {
            return (
                <div style={{textAlign: "center", margin:"10px"}}>
                    <img src={Pikachu} style={{width: "80%"}} alt="not-found"></img> 
                    <p>Pokémon not found</p>
                </div>
            )
        } else {
            let diplayedPokemonNumber = String(pokemon.id);
            while (diplayedPokemonNumber.length < 3) {
                diplayedPokemonNumber = `0${diplayedPokemonNumber}`;
            }
            diplayedPokemonNumber = `#${diplayedPokemonNumber}`

            let frontImage = pokemon.sprites.front_default ? pokemon.sprites.front_default : Pikachu;
            let backImage = pokemon.sprites.back_default ? pokemon.sprites.back_default : Pikachu;

            return (
                <div>
                    <table className="detail-table">
                        <tbody>
                            <tr>
                                <td style={{ width: "50%" }}>
                                    <div>
                                        <p className="bold">{diplayedPokemonNumber}</p>
                                        <p className="bold">{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</p>
                                    </div>
                                </td>
                                <td rowSpan="2">
                                    <img className="pokemon-front-picture" src={frontImage} alt={`${pokemon.name}-front`}></img>
                                </td>
                            </tr>
                            <tr>
                                <td className="text-center">
                                    <img className="pokemon-back-picture" src={backImage} alt={`${pokemon.name}-back`}></img>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="bold">Height:</span> {pokemon.height}
                                </td>
                                <td>
                                <span className="bold">Weight:</span> {pokemon.weight}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <p className="bold">Types</p>
                                    {pokemon.types.map(type => (
                                        <Type key={type.type.name} type={type.type.name} />
                                    ))}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" style={{ width: "100%" }}>
                                    <p className="bold">Moves</p>
                                    {pokemon.moves.map(move => (
                                        <Move key={move.move.name} move={move.move} />
                                    ))}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <button className="catch" onClick={this.catchPokemon}>
                        <img src={Pokéball} style={{height: "50%"}} alt="catch" id="pokeball"></img> 
                        &nbsp;Catch!
                    </button>
                    <CatchModal showModal={this.state.showModal} handleClose={this.hideModal} caught={this.state.caught} pokemon={pokemon}/>
                </div>
            )
        }
    }
}

export default Detail;