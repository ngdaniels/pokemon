import React, { Component } from "react";
import ListCard from './ListCard.js';
import $ from 'jquery';

class Collection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            owned: JSON.parse(localStorage.getItem('owned'))
        };
    }

    trackScrolling = () => {
        //Make header smaller on scroll
        if ($(window).scrollTop() > 1) {
            $('.content').css("margin-top", '8.5rem');
        }
        else {
            $('.content').css("margin-top", '10.5rem');
        }
    };

    componentDidMount() {
        //Set event listener
        document.addEventListener('scroll', this.trackScrolling);
    };
    
    release = (nickname) => {
        let owned = this.state.owned;

        //Find index of selected pokemon
        let selectedPokemonIndex = owned.findIndex(pokemon => pokemon.nickname === nickname);

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

        let ownedTotal = (
            <div className="text-center" id="owned-search">
                <p>
                    Pokémons owned: {owned.length}
                </p>
            </div>
        );

        if (owned.length === 0) {
            return (
                <div className="text-center padding-top" style={{marginTop: '1rem'}}>
                    You don't own any Pokémon
                </div>
            ) 
        }
        return (
            <div>
                {ownedTotal}
                {owned.map((own, index) => (
                    <ListCard key={`${own.pokemonName}-${own.nickname}`} page="collection" release={this.release} pokemon={{ id: own.pokemonId, index:index, name: own.pokemonName, image: own.pokemonImage, nickname: own.nickname }} />
                ))}
            </div>
        )
    }
}

export default Collection;