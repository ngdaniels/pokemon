import { render } from '@testing-library/react';
import Type from './Type';

describe('Pokémon Type', () => {
	test('Pokémon Type undefined', () => {
		let {asFragment} = render(<Type/>);
        expect(asFragment()).toMatchSnapshot();
    });
    
    test('Pokémon Type defined', () => {
		let {asFragment} = render(<Type type="dragon"/>);
        expect(asFragment()).toMatchSnapshot();
    });
});