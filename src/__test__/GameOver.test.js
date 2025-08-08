import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GameOver from '../Components/GameOver/GameOver';
import mockGameSounds from '../__mocks__/GameSounds';

beforeEach(() => {
  jest.clearAllMocks();
});

const mockProps = {
  fetchedData: [
    {id: 1, name: 'Rick Sanchez', image: 'img-url'},
    {id: 1, name: 'Morty Smith', image: 'img-url'},
    {id: 1, name: 'Beth Smith', image: 'img-url'},
  ],
  timeLeft: 200,
  clickedCards: [1],
  highestScore: 1,
  level: 'easy',
  saveHighScoreAndLevel: jest.fn(),
  setStartGame: jest.fn(),
  setGameOver: jest.fn(),
  resetClickedCard: jest.fn(),
  gameSounds: mockGameSounds,
};

describe('GameOver.js', () => {
  test('should render game over screen with correct static elements', () => {
    jest.useFakeTimers();

    render(<GameOver {...mockProps} />);

    jest.advanceTimersByTime(500);
    expect(mockGameSounds.playLobbyBGM).toHaveBeenCalled();

    expect(screen.getByText(/game over/i)).toBeInTheDocument();
    expect(screen.getByText(/gameplay duration/i)).toBeInTheDocument();
    expect(screen.getByText(/difficulty level/i)).toBeInTheDocument();
    expect(screen.getByText(/highest score/i)).toBeInTheDocument();
    expect(screen.getByText(/current score/i)).toBeInTheDocument();
    expect(screen.getByText(/card left/i)).toBeInTheDocument();
  });

  test('should handle Play Again click for easy level', () => {
    render(<GameOver {...mockProps} />);

    userEvent.click(screen.getByText(/play again/i));

    expect(mockGameSounds.playEasyButtonSound).toHaveBeenCalled();
    expect(mockProps.setStartGame).toHaveBeenCalledWith(false, 'easy');
    expect(mockProps.setGameOver).toHaveBeenCalledWith(false);
    expect(mockProps.resetClickedCard).toHaveBeenCalled();
  });

  test('should handle Back to Lobby click', () => {
    render(<GameOver {...mockProps} />);

    userEvent.click(screen.getByText(/back to lobby/i));

    expect(mockProps.setStartGame).toHaveBeenCalledWith(true, 'easy');
    expect(mockProps.setGameOver).toHaveBeenCalledWith(false);
    expect(mockGameSounds.playLobbyButtonSound).toHaveBeenCalled();
  });

  test('handleTotalTimeTaken should return correct formatted duration', () => {
    const instance = new GameOver({...mockProps});
    const result = instance.handleTotalTimeTaken();
    expect(result).toBe('00:10'); //timeLeft: 200, 210 - 200 = 10 seconds
  });

  test('should clear timeout and pause sound on unmount', () => {
    jest.useFakeTimers();
    const {unmount} = render(<GameOver {...mockProps} />);

    const mockClearTimeout = jest.spyOn(global, 'clearTimeout');

    unmount();

    jest.runOnlyPendingTimers();
    expect(mockGameSounds.pauseLobbyBGM).toHaveBeenCalled();
    expect(mockClearTimeout).toHaveBeenCalledWith(expect.any(Number));
    jest.useRealTimers();
  });
});
