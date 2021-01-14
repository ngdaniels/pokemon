import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
	test('Pokémon List', () => {
		var { asFragment } = render(<App/>);
        expect(asFragment()).toMatchSnapshot();
	});
});