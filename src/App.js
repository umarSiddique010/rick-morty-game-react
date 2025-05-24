import React from 'react';
import PlayGame from './Components/PlayGame/PlayGame';
import StartGame from './Components/StartGame/StartGame';
import GameOver from './Components/GameOver/GameOver';
import { AnimatePresence } from 'motion/react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fetchedData: [],
      error: null,
      shuffleCards: [],
      startGame: true,
      level: '',
      clickedCards: [],
      isGameOver: false,
      timeLeft: 0,
      highestScore: Number(localStorage.getItem('highestScore')) || 0,
    };

    this.setFetchedDataState = this.setFetchedDataState.bind(this);
    this.setErrorState = this.setErrorState.bind(this);
    this.setShuffleCardsState = this.setShuffleCardsState.bind(this);

    this.setStartGame = this.setStartGame.bind(this);
    this.setGameOver = this.setGameOver.bind(this);
    this.setClickedCards = this.setClickedCards.bind(this);

    this.updateHighScoreLive = this.updateHighScoreLive.bind(this);
    this.maxTimeInSecond = this.maxTimeInSecond.bind(this);
    this.setTimerLeft = this.setTimerLeft.bind(this);

    this.resetHighScore = this.resetHighScore.bind(this);
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
            resetHighScore={this.resetHighScore}
            level={level}
            setStartGame={this.setStartGame}
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
            level={level}
            highestScore={highestScore}
            updateHighScoreLive={this.updateHighScoreLive}
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

  updateHighScoreLive(currentScore) {
    if (currentScore > this.state.highestScore) {
      localStorage.setItem('highestScore', currentScore.toString());
      this.setState({ highestScore: currentScore });
    }
  }

  maxTimeInSecond(level) {
    if (level === 'easy') {
      return 200 * 1000;
    } else if (level === 'medium') {
      return 120 * 1000;
    } else if (level === 'hard') {
      return 70 * 1000;
    } else {
    }
  }

  setTimerLeft(value) {
    this.setState({ timeLeft: value });
  }

  resetHighScore() {
    const resetScore = 0;
    localStorage.setItem('highestScore', resetScore.toString());
    this.setState({ highestScore: resetScore });
  }

  resetClickedCards() {
    this.setState({ clickedCards: [] });
  }
}
