import {render, screen, cleanup} from '@testing-library/react';
import PlayGame from '../Components/PlayGame/PlayGame';
import mockGameSounds from '../__mocks__/GameSounds';

afterEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
  jest.clearAllTimers();
  jest.restoreAllMocks();
  cleanup();
});

const mockProps = {
  fetchedData: [],
  error: null,
  shuffleCards: [],
  clickedCards: [],
  level: '',
  highestScore: '',
  saveHighScoreAndLevel: '',
  timeLeft: '',
  maxTimeInSecond: jest.fn(() => 500),
  setFetchedDataState: jest.fn(),
  setErrorState: jest.fn(),
  setShuffleCardsState: jest.fn(),
  setGameOver: jest.fn(),
  setClickedCards: jest.fn(),
  setTimerLeft: jest.fn(),
  gameSounds: mockGameSounds,
};

describe('PlayGame', () => {
  test('should render ScoreBoard, TimerBoard and CardContainer components', () => {
    render(<PlayGame {...mockProps} />);

    // ScoreBoard component
    expect(screen.getByText('Current score:')).toBeInTheDocument();
    expect(screen.getByText('Highest score:')).toBeInTheDocument();

    // TimerBoard component
    expect(screen.getByText('Time Left:')).toBeInTheDocument();

    // CardContainer component when no cards are fetched
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
  test('should render PlayGame and trigger playGamePlaySound on mount', () => {
    jest.useFakeTimers();

    render(<PlayGame {...mockProps} />);

    jest.advanceTimersByTime(200);

    expect(mockGameSounds.playGamePlaySound).toHaveBeenCalled();
  });

  test('should call pauseGamePlaySound on unmount', () => {
    const {unmount} = render(<PlayGame {...mockProps} />);
    unmount();
    expect(mockGameSounds.pauseGamePlaySound).toHaveBeenCalled();
  });

  test('should clear timeout on unmount to prevent memory leaks', () => {
    const clearTimeoutSpy = jest.spyOn(window, 'clearTimeout');

    const {unmount} = render(<PlayGame {...mockProps} />);
    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});
