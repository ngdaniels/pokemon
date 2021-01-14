import { render, screen, fireEvent } from '@testing-library/react';
import Collection from './Collection';

describe('Collection', () => {
	test('Show message if owned pokemon is zero', () => {
        localStorage.setItem('owned', JSON.stringify([]));
        render(<Collection />);

        var message = screen.getByText("You don't own any Pokémon");
        expect(message).toBeInTheDocument();
    });

    test('Show message if owned pokemon is more than zero', () => {
        localStorage.setItem('owned', JSON.stringify([{ nickname: "mew", pokemonId: 150, pokemonImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png", pokemonName: "mewtwo" }]));
        render(<Collection />);

        var message = screen.queryByText("You don't own any Pokémon");
        expect(message).toBeNull();
    });

    test('Release Pokemon', async () => {
        localStorage.setItem('owned', JSON.stringify([{ nickname: "mew", pokemonId: 150, pokemonImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png", pokemonName: "mewtwo" }]));
        render(<Collection />);

        var releaseButton = screen.queryByText("Release");
        expect(releaseButton).toBeInTheDocument();
        fireEvent.click(releaseButton);

        var releaseMessage = await screen.findByText('Are you sure to release mew?');
        expect(releaseMessage).toBeInTheDocument();
    });
});