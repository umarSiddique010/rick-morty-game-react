import React from 'react';
import PlayGame from './Components/PlayGame/PlayGame';
import StartGame from './Components/StartGame/StartGame';
import GameOver from './Components/GameOver/GameOver';
import { AnimatePresence } from 'motion/react';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    const savedData = JSON.parse(
      localStorage.getItem('rick_and_morty_memory_game')
    );
    const savedLevel = savedData?.getLevel || '';
    const savedScore = Number(savedData?.getHighestScore) || 0;

    this.state = {
      fetchedData: [],
      error: null,
      shuffleCards: [],
      startGame: true,
      level: savedLevel,
      clickedCards: [],
      isGameOver: false,
      timeLeft: 0,
      highestScore: savedScore,
    };

    this.setFetchedDataState = this.setFetchedDataState.bind(this);
    this.setErrorState = this.setErrorState.bind(this);
    this.setShuffleCardsState = this.setShuffleCardsState.bind(this);

    this.setStartGame = this.setStartGame.bind(this);
    this.setGameOver = this.setGameOver.bind(this);
    this.setClickedCards = this.setClickedCards.bind(this);

    this.saveHighScoreAndLevel = this.saveHighScoreAndLevel.bind(this);
    this.maxTimeInSecond = this.maxTimeInSecond.bind(this);
    this.setTimerLeft = this.setTimerLeft.bind(this);

    this.resetHighScoreAndLevel = this.resetHighScoreAndLevel.bind(this);
    this.resetClickedCards = this.resetClickedCards.bind(this);
  }

  render() {
    const {
      fetchedData,
      error,
      shuffleCards,
      startGame,
      isGameOver,
      clickedCards,
      level,
      highestScore,
      timeLeft,
    } = this.state;



    return (
      <AnimatePresence mode='wait'>
        {isGameOver ? (
          <GameOver
            key='GameOver'
            fetchedData={fetchedData}
            clickedCards={clickedCards}
            highestScore={highestScore}
            level={level}
            setStartGame={this.setStartGame}
            setGameOver={this.setGameOver}
            resetClickedCard={this.resetClickedCards}
            timeLeft={timeLeft}
          />
        ) : startGame ? (
          <StartGame
            key='StartGame'
            level={level}
            setStartGame={this.setStartGame}
            resetHighScoreAndLevel={this.resetHighScoreAndLevel}
          />
        ) : (
          <PlayGame
            key='PlayGame'
            fetchedData={fetchedData}
            error={error}
            shuffleCards={shuffleCards}
            setFetchedDataState={this.setFetchedDataState}
            setErrorState={this.setErrorState}
            setShuffleCardsState={this.setShuffleCardsState}
            setGameOver={this.setGameOver}
            clickedCards={clickedCards}
            setClickedCards={this.setClickedCards}
            saveHighScoreAndLevel={this.saveHighScoreAndLevel}
            level={level}
            highestScore={highestScore}
            maxTimeInSecond={this.maxTimeInSecond}
            timeLeft={timeLeft}
            setTimerLeft={this.setTimerLeft}
          />
        )}
      </AnimatePresence>
    );
  }

  setFetchedDataState(fetchedData, renderData) {
    this.setState({ fetchedData: fetchedData }, renderData);
  }

  setErrorState(error) {
    this.setState({ error: error });
  }

  setShuffleCardsState(shuffleCards) {
    this.setState({ shuffleCards: shuffleCards });
  }

  setStartGame(startGame, gameLevel) {
    const countDown = this.maxTimeInSecond(gameLevel);
    this.setState({
      startGame: startGame,
      level: gameLevel,
      timeLeft: countDown / 1000,
    });
  }

  setGameOver(isOver) {
    this.setState({ isGameOver: isOver });
  }
  setClickedCards(cardID) {
    this.setState({
      clickedCards: [...this.state.clickedCards, cardID],
    });
  }

  saveHighScoreAndLevel(currentScore) {
    const { highestScore, level } = this.state;
    if (currentScore > highestScore && level !== '') {
      const saveData = {
        getHighestScore: currentScore,
        getLevel: level,
      };
      localStorage.setItem(
        'rick_and_morty_memory_game',
        JSON.stringify(saveData)
      );

      this.setState({
        highestScore: currentScore,
      });
    }
  }

  maxTimeInSecond(level) {
    if (level === 'easy') {
      return 210 * 1000;
    } else if (level === 'medium') {
      return 120 * 1000;
    } else if (level === 'hard') {
      return 40 * 1000;
    } else {
      return 0;
    }
  }

  setTimerLeft(value) {
    this.setState({ timeLeft: value });
  }

  resetClickedCards() {
    this.setState({ clickedCards: [] });
  }

  resetHighScoreAndLevel() {
    localStorage.removeItem('rick_and_morty_memory_game');
  }
}
