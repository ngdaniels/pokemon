import { render, screen, fireEvent  } from '@testing-library/react';
import List from './List';

describe('Pokemon List page', () => {
    test('Loading appear when loading', () => {
        localStorage.setItem('owned', JSON.stringify([]));
        render(<List isLoaded={false} pokemons={[]}/>);

        let loading = screen.getByAltText("loading");
        expect(loading).toHaveStyle(`display: inline`);
    });
    test('Loading disappear when loaded', () => {
        localStorage.setItem('owned', JSON.stringify([]));
        render(<List isLoaded={true} pokemons={[]}/>);

        let loading = screen.getByAltText("loading");
        expect(loading).toHaveStyle(`display: none`);
    });
    test('Test owned pokemon = 0', () => {
        localStorage.setItem('owned', JSON.stringify([]));

        render(<List isLoaded={false} pokemons={[]}/>);
        let topBar = screen.getByText("Pokémons owned: 0");
        expect(topBar).toBeInTheDocument();
    });
    test('Test owned pokemon = 1', () => {
        localStorage.setItem('owned', JSON.stringify([{ nickname: "mew", pokemonId: 150, pokemonImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png", pokemonName: "mewtwo" }]));

        render(<List isLoaded={false} pokemons={[]}/>);
        let topBar = screen.getByText("Pokémons owned: 1");
        expect(topBar).toBeInTheDocument();
    });
    test('Searchbar', () => {
        localStorage.setItem('owned', JSON.stringify([]));

        render(<List isLoaded={false} pokemons={[]}/>);
        let  inputSearch = screen.getByLabelText('Search');
        expect(inputSearch).toBeInTheDocument();

        fireEvent.change(inputSearch, { target: { value: 'Mewtwo' } });
        expect(inputSearch.value).toBe('Mewtwo');
    });
});