import React, { Component } from "react";
import ListCard from './ListCard.js';

class Collection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owned: JSON.parse(localStorage.getItem('owned'))
        };
    }
    
    release = (nickname) => {
        let owned = this.state.owned;

        //Find index of selected pokemon
        let selectedPokemonIndex = owned.findIndex(pokemon => pokemon.nickname === nickname);
        console.log(selectedPokemonIndex)

        //Remove pokemon from array
        owned.splice(selectedPokemonIndex, 1);

        this.setState({
            owned
        });

        localStorage.setItem('owned', JSON.stringify(owned));
    };

    render() {
        // Get owned pokemons
        let owned = this.state.owned;

        if (owned.length === 0) {
            return (
                <div className="text-center padding-top" style={{marginTop: '1rem'}}>
                    You don't own any Pokémon
                </div>
            ) 
        }
        return (
            <div className="padding-top">
                {owned.map((own, index) => (
                    <ListCard key={`${own.pokemonName}-${own.nickname}`} page="collection" release={this.release} pokemon={{ id: own.pokemonId, index:index, name: own.pokemonName, image: own.pokemonImage, nickname: own.nickname }} />
                ))}
            </div>
        )
    }
}

export default Collection;