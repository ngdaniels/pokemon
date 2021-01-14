import { render } from '@testing-library/react';
import ListCard from './ListCard';

describe('List Card', () => {
	test('List Card Content for Pokemon List', () => {
		var { asFragment } = render(<ListCard page="list" pokemon={ {id: '150', name: 'mewtwo', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png'} }/>);
        expect(asFragment()).toMatchSnapshot();
    });
    
    test('List Card Content for Owned Pokemon List', () => {
		var { asFragment } = render(<ListCard page="collection" pokemon={ {id: '150', name: 'mewtwo', nickname: 'mew', image: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/150.png'} }/>);
        expect(asFragment()).toMatchSnapshot();
    });
});