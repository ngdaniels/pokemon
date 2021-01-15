import { render, screen, fireEvent } from '@testing-library/react';
import Collection from './Collection';

describe('Collection', () => {
	test('Show message if owned pokemon is zero', () => {
        localStorage.setItem('owned', JSON.stringify([]));
        render(<Collection />);

        let message = screen.getByText("You don't own any Pokémon");
        expect(message).toBeInTheDocument();
    });

    test('Message not shown if owned pokemon is more than zero', () => {
        localStorage.setItem('owned', JSON.stringify([{ nickname: "mew", pokemonId: 150, pokemonImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png", pokemonName: "mewtwo" }]));
        render(<Collection />);

        let message = screen.queryByText("You don't own any Pokémon");
        expect(message).toBeNull();
    });

    test('Toggle Release Pokemon then Release Pokemon', async () => {
        localStorage.setItem('owned', JSON.stringify([{ nickname: "mew", pokemonId: 150, pokemonImage: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png", pokemonName: "mewtwo" }]));
        render(<Collection />);

        let releaseButton = screen.queryByText("Release");
        expect(releaseButton).toBeInTheDocument();
        fireEvent.click(releaseButton);

        let releaseMessage = await screen.findByText('Are you sure to release mew?');
        expect(releaseMessage).toBeInTheDocument();

        let confirmReleaseButton = screen.queryByText('✔');
        expect(confirmReleaseButton).toBeInTheDocument();

        let cancelReleaseButton = screen.queryByText('✘');
        expect(cancelReleaseButton).toBeInTheDocument();
        fireEvent.click(cancelReleaseButton);

        let canceledReleaseButton = screen.queryByText("Release");
        expect(canceledReleaseButton).toBeInTheDocument();

        confirmReleaseButton = screen.queryByText('✔');
        expect(confirmReleaseButton).toBeNull();

        cancelReleaseButton = screen.queryByText('✘');
        expect(cancelReleaseButton).toBeNull();

        releaseMessage = screen.queryByText('Are you sure to release mew?');
        expect(releaseMessage).toBeNull();

        releaseButton = screen.queryByText("Release");
        expect(releaseButton).toBeInTheDocument();
        fireEvent.click(releaseButton);

        releaseMessage = await screen.findByText('Are you sure to release mew?');
        expect(releaseMessage).toBeInTheDocument();

        cancelReleaseButton = screen.queryByText('✘');
        expect(cancelReleaseButton).toBeInTheDocument();

        confirmReleaseButton = screen.queryByText('✔');
        expect(confirmReleaseButton).toBeInTheDocument();
        fireEvent.click(confirmReleaseButton);

        let noOwnedPokemonMessage = await screen.findByText(`You don't own any Pokémon`);
        expect(noOwnedPokemonMessage).toBeInTheDocument();

        let owned = JSON.parse(localStorage.getItem('owned'));
        expect(owned.length).toBe(0);
    });
});