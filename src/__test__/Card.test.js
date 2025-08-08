import {render, screen, fireEvent} from '@testing-library/react';
import Card from '../Components/Card/Card';
import mockGameSounds from '../__mocks__/GameSounds';

beforeEach(() => {
  jest.clearAllMocks();
});

const mockProps = {
  cardID: 1,
  charImg: 'https://example.com/image.png',
  charName: 'Rick Sanchez',
  clickedCards: [],
  setClickedCards: jest.fn(),
  shuffleFetchedValue: jest.fn(),
  setGameOver: jest.fn(),
  gameSounds: mockGameSounds,
};

describe('Card.js', () => {
  test('should render a card button with test id "card" and img tag inside of it', () => {
    render(<Card {...mockProps} />);

    const cardBtn = screen.getByTestId('card');
    const cardImg = screen.getByRole('img');

    expect(cardBtn).toBeInTheDocument();
    expect(screen.getByText(/rick sanchez/i)).toBeInTheDocument();
    expect(cardImg).toHaveAttribute('src', mockProps.charImg);
    expect(cardImg).toHaveAttribute('alt', mockProps.charName);
  });

  test('should call props on first card click', () => {
    const mockShuffleFetchedValue = jest.fn();
    const mockSetClickedCards = jest.fn();
    const mockSetGameOver = jest.fn();

    const props = {
      cardID: 1,
      charImg: 'https://example.com/image.png',
      charName: 'Rick Sanchez',
      clickedCards: [],
      setClickedCards: mockSetClickedCards,
      shuffleFetchedValue: mockShuffleFetchedValue,
      setGameOver: mockSetGameOver,
      gameSounds: mockGameSounds,
    };

    render(<Card {...props} />);

    const cardBtn = screen.getByTestId('card');
    fireEvent.click(cardBtn);

    expect(mockGameSounds.playCardClickSound).toHaveBeenCalled();
    expect(mockSetClickedCards).toHaveBeenCalledWith(1);
    expect(mockShuffleFetchedValue).toHaveBeenCalled();
    expect(mockSetGameOver).not.toHaveBeenCalled();
  });

  test('should call setGameOver when card is already clicked', () => {
    const mockShuffleFetchedValue = jest.fn();
    const mockSetClickedCards = jest.fn();
    const mockSetGameOver = jest.fn();

    const props = {
      cardID: 1,
      charImg: 'https://example.com/image.png',
      charName: 'Rick Sanchez',
      clickedCards: [1], // Card already clicked (same cardID as 1)
      setClickedCards: mockSetClickedCards,
      shuffleFetchedValue: mockShuffleFetchedValue,
      setGameOver: mockSetGameOver,
    };

    render(<Card {...props} />);

    const cardBtn = screen.getByTestId('card');
    fireEvent.click(cardBtn);

    expect(mockSetGameOver).toHaveBeenCalledWith(true);

    expect(mockGameSounds.playCardClickSound).not.toHaveBeenCalled();
    expect(mockSetClickedCards).not.toHaveBeenCalled();
    expect(mockShuffleFetchedValue).not.toHaveBeenCalled();
  });
});
