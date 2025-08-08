import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

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
    cloneNode() {
      return this;
    }
  };
});

beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          results: [
            {id: 1, name: 'Jerry Smith', image: 'jerry.png'},
            {id: 2, name: 'Morty', image: 'morty.png'},
          ],
        }),
    })
  );
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('App.js', () => {
  describe('App.js Components rendering tests', () => {
    test('should renders StartGame component initially', () => {
      render(<App />);
      expect(screen.getByText(/Play Game/i)).toBeInTheDocument();
      expect(screen.getByTestId('soundOn')).toBeInTheDocument();
    });

    test('renders PlayGame when "easy" button is clicked', async () => {
      render(<App />);

      const easyBtn = screen.getByRole('button', {name: /easy/i});
      userEvent.click(easyBtn);
      await waitFor(() => {
        expect(screen.getByText(/Jerry Smith/i)).toBeInTheDocument();
        expect(screen.getByText(/time left/i)).toBeInTheDocument();
        expect(screen.getByTestId('soundOn')).toBeInTheDocument();
      });
    });

    test('shows GameOver on duplicate card click in Medium level', async () => {
      render(<App />);

      const mediumBtn = screen.getByRole('button', {name: /medium/i});
      userEvent.click(mediumBtn);

      const cardButtons = await screen.findAllByTestId('card');
      userEvent.click(cardButtons[0]);
      userEvent.click(cardButtons[0]);

      await waitFor(() => {
        expect(screen.getByText(/game over/i)).toBeInTheDocument();
        expect(screen.getByTestId('soundOn')).toBeInTheDocument();
      });
    });
  });

  describe('App.js Class Methods Unit Tests', () => {
    let app;

    beforeEach(() => {
      app = new App();
      app.state = {
        fetchedData: [],
        error: null,
        shuffleCards: [],
        startGame: false,
        level: '',
        timeLeft: 0,
        clickedCards: [],
        isGameOver: false,
        highestScore: 0,
      };
    });

    test('setFetchedDataState updates fetchedData and calls callback', () => {
      const mockCallback = jest.fn();
      const data = [{name: 'Morty'}];
      app.setState = jest.fn((state, cb) => cb && cb());

      app.setFetchedDataState(data, mockCallback);

      expect(app.setState).toHaveBeenCalledWith({fetchedData: data}, expect.any(Function));
      expect(mockCallback).toHaveBeenCalled();
    });

    test('setErrorState sets error', () => {
      app.setState = jest.fn();
      app.setErrorState('Error!');
      expect(app.setState).toHaveBeenCalledWith({error: 'Error!'});
    });

    test('setStartGame sets correct values', () => {
      app.setState = jest.fn();
      app.setStartGame(true, 'easy');
      expect(app.setState).toHaveBeenCalledWith({
        startGame: true,
        level: 'easy',
        timeLeft: 210,
        clickedCards: [],
      });
    });

    test('setClickedCards appends card ID', () => {
      app.state.clickedCards = ['A'];
      app.setState = jest.fn();
      app.setClickedCards('B');
      expect(app.setState).toHaveBeenCalledWith({
        clickedCards: ['A', 'B'],
      });
    });

    test('saveHighScoreAndLevel saves only when new high score', () => {
      app.state.highestScore = 10;
      app.state.level = 'hard';
      app.setState = jest.fn();
      Storage.prototype.setItem = jest.fn();

      app.saveHighScoreAndLevel(20);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'rick_and_morty_memory_game',
        JSON.stringify({getHighestScore: 20, getLevel: 'hard'})
      );

      expect(app.setState).toHaveBeenCalledWith({highestScore: 20});
    });

    test('saveHighScoreAndLevel does not save if lower score or level is empty', () => {
      app.state.highestScore = 20;
      app.state.level = '';
      Storage.prototype.setItem = jest.fn();
      app.setState = jest.fn();

      app.saveHighScoreAndLevel(15);

      expect(localStorage.setItem).not.toHaveBeenCalled();
      expect(app.setState).not.toHaveBeenCalled();
    });

    test('maxTimeInSecond returns correct times', () => {
      expect(app.maxTimeInSecond('easy')).toBe(210000);
      expect(app.maxTimeInSecond('medium')).toBe(120000);
      expect(app.maxTimeInSecond('hard')).toBe(40000);
      expect(app.maxTimeInSecond('')).toBe(0);
      expect(app.maxTimeInSecond('weird')).toBe(0);
    });

    test('setTimerLeft sets timeLeft', () => {
      app.setState = jest.fn();
      app.setTimerLeft(100);
      expect(app.setState).toHaveBeenCalledWith({timeLeft: 100});
    });

    test('resetClickedCards clears clickedCards', () => {
      app.setState = jest.fn();
      app.resetClickedCards();
      expect(app.setState).toHaveBeenCalledWith({clickedCards: []});
    });

    test('resetHighScoreAndLevel removes from localStorage', () => {
      Storage.prototype.removeItem = jest.fn();
      app.resetHighScoreAndLevel();
      expect(localStorage.removeItem).toHaveBeenCalledWith('rick_and_morty_memory_game');
    });

    test('componentDidUpdate triggers GameOver if max score reached', () => {
      app.setState = jest.fn();
      app.state.clickedCards = new Array(20);
      app.componentDidUpdate({}, {clickedCards: new Array(19)});

      expect(app.setState).toHaveBeenCalledWith({isGameOver: true});
    });

    test('componentDidUpdate does nothing if max score not reached', () => {
      app.setState = jest.fn();
      app.state.clickedCards = new Array(10);
      app.componentDidUpdate({}, {clickedCards: new Array(9)});

      expect(app.setState).not.toHaveBeenCalled();
    });
  });
});
