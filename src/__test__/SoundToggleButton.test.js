import {render, screen, fireEvent, cleanup} from '@testing-library/react';
import SoundToggleButton from '../Components/SoundToggleButton/SoundToggleButton';
import mockGameSounds from '../__mocks__/GameSounds';

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(() => {
  jest.clearAllMocks();
  cleanup();
});

const screenContext = 'lobby';

const defaultProps = {
  gameSounds: mockGameSounds,
  screenContext,
};

describe('SoundToggleButton', () => {
  test('should render sound on icon initially', () => {
    render(<SoundToggleButton {...defaultProps} />);

    const button = screen.getByRole('button');
    const soundIcon = button.querySelector('svg');

    expect(soundIcon).toBeTruthy();
    expect(screen.getByTestId('soundOn')).toBeInTheDocument();
  });

  test('should toggle to muted and call toggleGameSound(true)', () => {
    render(<SoundToggleButton {...defaultProps} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockGameSounds.toggleGameSound).toHaveBeenCalledWith(true, screenContext);
    expect(screen.getByTestId('soundOff')).toBeInTheDocument();
  });

  test('should toggle back to unmuted and call toggleGameSound(false)', () => {
    render(<SoundToggleButton {...defaultProps} />);

    const button = screen.getByRole('button');

    fireEvent.click(button); // mute
    fireEvent.click(button); // unmute

    expect(mockGameSounds.toggleGameSound).toHaveBeenCalledWith(false, screenContext);
    expect(screen.getByTestId('soundOn')).toBeInTheDocument();
  });

  test('should switch icon between .soundOn and .soundOff on toggle', () => {
    render(<SoundToggleButton {...defaultProps} />);

    const button = screen.getByRole('button');

    // Initially: soundOn icon
    expect(screen.getByTestId('soundOn')).toBeInTheDocument();

    // After mute
    fireEvent.click(button);
    expect(screen.getByTestId('soundOff')).toBeInTheDocument();

    // After unmute
    fireEvent.click(button);
    expect(screen.getByTestId('soundOn')).toBeInTheDocument();
  });
});
