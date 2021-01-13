import React, { Component } from "react";
import $ from 'jquery';
import './App.css';
import Pokémon from './Assets/Pokémon.png';
import PokéDex from './Assets/PokéDex.png';
import Pokéball from './Assets/Pokéball.png';
import {
  Route,
  NavLink,
  Switch,
  HashRouter
} from "react-router-dom";
import List from './List.js';
import Detail from './Detail.js';
import Collection from './Collection.js';

class App extends Component {
  constructor(props) {
    super(props);

    //Set initial storage
    if (!localStorage.getItem('owned')) {
      localStorage.setItem('owned', JSON.stringify([]));
    }

    this.state = {
      pokemons: [],
      isLoaded: false,
      isLoadedNext: false,
      fetching: false,
      offset: 0,
      error: null,
    };
  }

  fetchNext = () => {
    if (this.state.fetching) {
      return;
    }

    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
      this.setState({
        fetching: true,
        isLoadedNext: false
      });

      //Fetch data
      const gqlQuery = `query pokemons($limit: Int, $offset: Int) {
          pokemons(limit: $limit, offset: $offset) {
          count
          next
          status
          results {
              id
              name
              image
          }
          }
      }`;

      const gqlVariables = {
        limit: 10,
        offset: this.state.offset,
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
          this.setState({
            isLoadedNext: true,
            offset: this.state.offset + 10,
            pokemons: [...this.state.pokemons, ...res.data.pokemons.results],
            fetching: false
          });
        });
    }
  }

  componentDidMount() {
    //Set event listener
    document.addEventListener('scroll', this.trackScrolling);

    //Fetch data
    const gqlQuery = `query pokemons($limit: Int, $offset: Int) {
      pokemons(limit: $limit, offset: $offset) {
        count
        next
        status
        results {
          id
          name
          image
        }
      }
    }`;

    const gqlVariables = {
      limit: 10,
      offset: this.state.offset,
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
        this.setState({
          isLoaded: true,
          offset: this.state.offset + 10,
          pokemons: res.data.pokemons.results
        });
      });
  };

  trackScrolling = () => {
    if ($(window).scrollTop() > 1) {
      $(".logo").css("height", "3rem");
    }
    else {
      $(".logo").css("height", "5rem");
    }
  };

  render() {
    return (
      <HashRouter>
        <div className="title-bar">
          <img src={Pokémon} className="logo" alt="logo" />
          <div>
            <ul className="menu-bar">
              <li><NavLink exact to="/"><img src={PokéDex} className="menu-icon" alt="icon" /> <br></br> Pokémon List</NavLink></li>
              <li><NavLink to="/my_collection"><img src={Pokéball} className="menu-icon" alt="icon" /> <br></br> My Pokémon</NavLink></li>
            </ul>
          </div>
        </div>

        <div className="content">
          <Switch>
            <Route exact path="/">
              <List pokemons={this.state.pokemons} error={this.state.error} isLoaded={this.state.isLoaded} isLoadedNext={this.state.isLoadedNext} fetchNext={this.fetchNext} />
            </Route>
            <Route path="/detail/:pokemonName" component={Detail} />
            <Route path="/my_collection/">
              <Collection />
            </Route>
          </Switch>
        </div>
      </HashRouter>
    );
  }
}

export default App;
