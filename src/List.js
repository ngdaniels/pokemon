import React, { Component } from "react";
import ListCard from './ListCard.js';
import Loading from './Loading.js';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';
import './List.css';

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            searchResult: null,
            pokemons: props.pokemons
        };

        this.handleChange = this.handleChange.bind(this);
        this.search = this.search.bind(this);
    }

    trackScrolling = () => {
        //Make header smaller on scroll
        if ($(window).scrollTop() > 1) {
            $('.content').css("margin-top", '8.5rem');
        }
        else {
            $('.content').css("margin-top", '10.5rem');
        }

        //Load more data upon reaching end of page
        this.props.fetchNext();
    };

    componentDidMount() {
        //Set event listener
        document.addEventListener('scroll', this.trackScrolling);
    };

    handleChange = (event) => {
        this.setState({ search: event.target.value });
    }

    search = (event) => {
        event.preventDefault();

        let searchParam = this.state.search;

        this.setState({
            searchResult: searchParam.toLowerCase()
        });  
    };

    render() {
        let { searchResult } = this.state;
        let { error, pokemons, isLoaded, isLoadedNext } = this.props;

        // Get owned pokemons
        let owned = JSON.parse(localStorage.getItem('owned'));

        let ownedSearch = (
            <div className="text-center" id="owned-search">
                <p>
                    Pokémons owned: {owned.length}
                </p>
                <form onSubmit={this.search}>
                    Search &nbsp;
                        <input type="text" value={this.state.search} onChange={this.handleChange} placeholder="Pokémon Number / Name" style={{ width: '65%' }} />
                    <input type="submit" value="&#x1F50D;" style={{ marginLeft: '-2rem', width: '2rem', padding: 0, border: "none" }}></input>
                </form>
            </div>
        );

        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (
                <div>
                    {ownedSearch}
                    <Loading show={!isLoaded} />
                </div>
            );
        } else if (!searchResult) {
            return (
                <div id="list">
                    {ownedSearch}
                    {pokemons.map(pokemon => (
                        <ListCard key={pokemon.name} pokemon={pokemon} page="list" />
                    ))}
                    <Loading show={!isLoadedNext} />
                </div>
            );
        } else {
            let pathName = `/detail/${searchResult}`
            return <Redirect to={pathName} />
        }
    }
}

export default List;