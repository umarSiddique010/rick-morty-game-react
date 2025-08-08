import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ScoreBoard from '../Components/ScoreBoard/ScoreBoard';
import mockGameSounds from '../__mocks__/GameSounds';

beforeAll(() => {
  global.Audio = class {
    play() {
      return Promise.resolve();
    }
    pause() {}
    load() {}
    addEventListener() {}
    removeEventListener() {}
    constructor() {
      this.loop = false;
      this.volume = 1;
    }
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.useRealTimers();
});

const mockProps = {
  fetchedData: [{id: 1, name: 'Rick Sanchez', image: 'img-url'}],
  clickedCards: [1],
  highestScore: 1,
  saveHighScoreAndLevel: jest.fn(),
  gameSounds: mockGameSounds,
};

describe('ScoreBoard.js', () => {
  test('should render ScoreBoard component', () => {
    render(<ScoreBoard {...mockProps} />);

    expect(screen.getByText(/card left:/i)).toBeInTheDocument();
    expect(screen.getByTestId('cards-left')).toHaveTextContent('0');

    expect(screen.getByText(/highest score:/i)).toBeInTheDocument();
    expect(screen.getByTestId('highest-score')).toHaveTextContent('1');

    expect(screen.getByText(/current score:/i)).toBeInTheDocument();
    expect(screen.getByTestId('current-score')).toHaveTextContent('1');

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('should toggle mute/unmute and call correct methods', () => {
    render(<ScoreBoard {...mockProps} />);

    const toggleMuteBtn = screen.getByRole('button');

    userEvent.click(toggleMuteBtn);
    expect(mockGameSounds.pauseGamePlaySound).toHaveBeenCalledTimes(1);
    expect(mockGameSounds.playGamePlaySound).not.toHaveBeenCalled();

    jest.clearAllMocks();

    userEvent.click(toggleMuteBtn);
    expect(mockGameSounds.playGamePlaySound).toHaveBeenCalledTimes(1);
    expect(mockGameSounds.pauseGamePlaySound).not.toHaveBeenCalled();
  });

  test('calls saveHighScoreAndLevel when clickedCards length increases', () => {
    const {rerender} = render(<ScoreBoard {...mockProps} />);

    rerender(<ScoreBoard {...mockProps} clickedCards={[1, 2]} />);
    expect(mockProps.saveHighScoreAndLevel).toHaveBeenCalledWith(2);
  });
});
