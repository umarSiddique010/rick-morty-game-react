import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StartGame from '../Components/StartGame/StartGame';
import mockGameSounds from '../__mocks__/GameSounds';

beforeEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

const mockProps = {
  gameSounds: mockGameSounds,
  setStartGame: jest.fn(),
  resetHighScoreAndLevel: jest.fn(),
  resumeGameFromStorage: jest.fn(),
  showResumeButton: true,
};

describe('StartGame.js', () => {
  test('should render StartGame and shows all static UI elements of StartGame', () => {
    render(<StartGame {...mockProps} />);

    expect(screen.getByText(/rick and morty memory card game/i)).toBeInTheDocument();
    expect(screen.getByText(/how to play/i)).toBeInTheDocument();
    expect(screen.getByText(/play game/i)).toBeInTheDocument();
    expect(screen.getByText(/new game/i)).toBeInTheDocument();
    expect(screen.getByText(/easy/i)).toBeInTheDocument();
    expect(screen.getByText(/medium/i)).toBeInTheDocument();
    expect(screen.getByText(/hard/i)).toBeInTheDocument();
  });

  test('should call handleStartNewGame when Easy is clicked', () => {
    render(<StartGame {...mockProps} />);
    userEvent.click(screen.getByText(/easy/i));

    expect(mockProps.setStartGame).toHaveBeenCalledWith(false, 'easy');
    expect(mockProps.resetHighScoreAndLevel).toHaveBeenCalled();
    expect(mockGameSounds.playEasyButtonSound).toHaveBeenCalled();
  });

  test('should call handleStartNewGame when Medium is clicked', () => {
    render(<StartGame {...mockProps} />);
    userEvent.click(screen.getByText(/medium/i));

    expect(mockProps.setStartGame).toHaveBeenCalledWith(false, 'medium');
    expect(mockProps.resetHighScoreAndLevel).toHaveBeenCalled();
    expect(mockGameSounds.playMediumButtonSound).toHaveBeenCalled();
  });

  test('should call handleStartNewGame when Hard is clicked', () => {
    render(<StartGame {...mockProps} />);
    userEvent.click(screen.getByText(/hard/i));

    expect(mockProps.setStartGame).toHaveBeenCalledWith(false, 'hard');
    expect(mockProps.resetHighScoreAndLevel).toHaveBeenCalled();
    expect(mockGameSounds.playHardButtonSound).toHaveBeenCalled();
  });

  test('should show Resume Game button and trigger resume logic', () => {
    render(<StartGame {...mockProps} level="easy" />);
    const resumeBtn = screen.getByText(/resume game/i);
    expect(resumeBtn).toBeInTheDocument();

    userEvent.click(resumeBtn);

    expect(mockProps.setStartGame).toHaveBeenCalledWith(false, 'easy');
    expect(mockGameSounds.playEasyButtonSound).toHaveBeenCalled();
  });
});
