import { render, screen  } from '@testing-library/react';
import Detail from './Detail';

describe('Detail', () => {
    test('Pokémon Detail Not Found', async () => {
        render(<Detail match={{ params: { pokemonName: 'ImaginaryPokemon' } }}/>);

        let loading = screen.getByAltText("loading");
        expect(loading).toHaveStyle(`display: inline`);

        let pokemonDetail = await screen.findByText("Pokémon not found", {exact: false});
        expect(pokemonDetail).toBeInTheDocument();

        let notFoundImage = screen.queryByAltText("not-found");
        expect(notFoundImage).toBeInTheDocument();

        loading = screen.queryByAltText("loading");
        expect(loading).toBeNull();
	});
	test('Pokémon Detail Found', async () => {
        render(<Detail match={{ params: { pokemonName: 'Pikachu' } }}/>);

        let loading = screen.getByAltText("loading");
        expect(loading).toHaveStyle(`display: inline`);

        let pokemonDetail = await screen.findByText("Pikachu");
        expect(pokemonDetail).toBeInTheDocument();

        loading = screen.queryByAltText("loading");
        expect(loading).toBeNull();

        let catchButton = screen.queryByText("Catch!");
        expect(catchButton).toBeInTheDocument();
	});
});