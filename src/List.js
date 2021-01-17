import React, { Component } from "react";
import ListCard from './ListCard.js';
import Loading from './Loading.js';
import $ from 'jquery';
import { Redirect } from 'react-router-dom';

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
        //Load more data upon reaching end of page
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 200) {
            this.props.fetchNext();
        }
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
        let { error, pokemons, isLoaded } = this.props;

        // Get owned pokemons
        let owned = JSON.parse(localStorage.getItem('owned'));

        let ownedSearch = (
            <div className="text-center" id="owned-search">
                <p>
                    Pokémons owned: {owned.length}
                </p>
                <form onSubmit={this.search}>
                    <label>
                        Search &nbsp;
                        <input type="text" value={this.state.search} onChange={this.handleChange} placeholder="Pokémon Number / Name" style={{ width: '65%', padding:'3px' }} />
                        <input type="submit" value="&#x1F50D;" style={{ marginLeft: '-2.5rem', width: '2rem', padding: 0, border: "none" }}></input>
                    </label>
                </form>
            </div>
        );

        if (error) {
            return <div className="text-center"><br></br>Cannot Load Pokémon Data</div>;
        } else if (pokemons.length === 0) {
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
                    <Loading show={!isLoaded} />
                </div>
            );
        } else {
            let pathName = `/detail/${searchResult}`
            return <Redirect to={pathName} />
        }
    }
}

export default List;