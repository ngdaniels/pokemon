import { render, screen, fireEvent } from '@testing-library/react';
import CatchModal from './CatchModal';

describe('Catch Modal', () => {
    test('Pokemon broke free', async () => {
        let hideModal = jest.fn();

        render(<CatchModal showModal={true} handleClose={hideModal} caught={false} pokemon={{ name: "kakuna", id: 14, sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png" } }} />);

        let message = screen.queryByText('Kakuna broke free', {exact: false});
        expect(message).toBeInTheDocument();

        let closeButton = screen.queryByText('OK');
        expect(closeButton).toBeInTheDocument();
        fireEvent.click(closeButton);

        expect(hideModal).toHaveBeenCalled();
    });

    test('Pokemon caught, and released', async () => {
        let hideModal = jest.fn();

        render(<CatchModal showModal={true} handleClose={hideModal} caught={true} pokemon={{ name: "kakuna", id: 14, sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png" } }} />);

        let message = screen.queryByText('Kakuna was caught', {exact: false});
        expect(message).toBeInTheDocument();

        let releaseButton = screen.queryByText('Release');
        expect(releaseButton).toBeInTheDocument();
        fireEvent.click(releaseButton);

        expect(hideModal).toHaveBeenCalled();
    });

    test('Pokemon caught, and named', async () => {
        let hideModal = jest.fn();

        localStorage.setItem('owned', JSON.stringify([]));
        
        render(<CatchModal showModal={true} handleClose={hideModal} caught={true} pokemon={{ name: "kakuna", id: 14, sprites: { front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/14.png" } }} />);

        let message = screen.queryByText('Kakuna was caught', {exact: false});
        expect(message).toBeInTheDocument();

        let inputName = screen.queryByLabelText('Nickname');
        expect(inputName).toBeInTheDocument();
        fireEvent.change(inputName, { target: { value: 'Matata' } });

        let nameButton = screen.queryByText('Save');
        expect(nameButton).toBeInTheDocument();
        fireEvent.click(nameButton);

        let namedMessage = screen.getByText('Matata is added to your collection');
        expect(namedMessage).toBeInTheDocument();

        let owned = JSON.parse(localStorage.getItem('owned'));
        expect(owned.length).toBe(1);

        let closeButton = screen.queryByText('OK');
        expect(closeButton).toBeInTheDocument();
        fireEvent.click(closeButton);

        expect(hideModal).toHaveBeenCalled();
    });
});