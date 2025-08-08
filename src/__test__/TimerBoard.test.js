import {render, screen, act} from '@testing-library/react';
import TimerBoard from '../Components/TimerBoard/TimerBoard';

beforeEach(() => {
  jest.clearAllMocks();
  jest.useRealTimers();
});

const mockProps = {
  timeLeft: 60,
  level: '1',
  setTimerLeft: jest.fn(),
  setGameOver: jest.fn(),
  maxTimeInSecond: () => 60000,
};

describe('TimerBoard.js', () => {
  test('renders TimerBoard with initial time and label "Time Left:"', () => {
    render(<TimerBoard {...mockProps} />);

    expect(screen.getByText('01:00')).toBeInTheDocument();
    expect(screen.getByText(/time left:/i)).toBeInTheDocument();
  });

  test('should call setTimerLeft after 1 second', () => {
    jest.useFakeTimers();

    render(<TimerBoard {...mockProps} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(mockProps.setTimerLeft).toHaveBeenCalledWith(59);

    jest.useRealTimers();
  });

  test('clears interval and timeout on unmount', () => {
    const mockClearInterval = jest.spyOn(global, 'clearInterval');
    const mockClearTimeout = jest.spyOn(global, 'clearTimeout');

    const {unmount} = render(<TimerBoard {...mockProps} />);

    unmount();

    expect(mockClearInterval).toHaveBeenCalledWith(expect.any(Number));
    expect(mockClearTimeout).toHaveBeenCalledWith(expect.any(Number));
  });

  test('renderTimer should format 125 seconds as "02:05"', () => {
    const mockProps = {timeLeft: 125};
    const timerInstance = new TimerBoard(mockProps);

    const result = timerInstance.renderTimer();

    expect(result).toBe('02:05');
  });
});
