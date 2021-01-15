import { render, screen } from '@testing-library/react';
import Move from './Move';

describe('Move', () => {
	test('Move component before move detail is fetched', () => {
        let { asFragment } = render(<Move move={{ name: "teleport", url: "https://pokeapi.co/api/v2/move/100/" }}/>);
        expect(asFragment()).toMatchSnapshot();
    });
    
    test('Move component after move detail is fetched', async () => {
        let { asFragment } = render(<Move move={{ name: "teleport", url: "https://pokeapi.co/api/v2/move/100/" }}/>);

        let movePower = await screen.findByText("Power", {exact: false});
        expect(movePower).toBeInTheDocument();

        expect(asFragment()).toMatchSnapshot();
	});
});