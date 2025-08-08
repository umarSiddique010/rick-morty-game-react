import React from 'react';
import CardContainer from '../CardContainer/CardContainer.js';
import ScoreBoard from '../ScoreBoard/ScoreBoard.js';
import TimerBoard from '../TimerBoard/TimerBoard.js';
import styles from './PlayGame.module.css';
import {motion} from 'motion/react';

export default class PlayGame extends React.Component {
  constructor(props) {
    super(props);
    this.gameSounds = this.props.gameSounds;
    this.timeOutId = null;
  }

  render() {
    const {
      fetchedData,
      error,
      shuffleCards,
      setFetchedDataState,
      setErrorState,
      setShuffleCardsState,
      setGameOver,
      clickedCards,
      setClickedCards,
      level,
      highestScore,
      saveHighScoreAndLevel,
      maxTimeInSecond,
      timeLeft,
      setTimerLeft,
    } = this.props;

    return (
      <motion.main
        className={styles.playGame}
        initial={{opacity: 0}}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.1,
          ease: 'easeInOut',
        }}
      >
        <header className={styles.header}>
          <ScoreBoard
            fetchedData={fetchedData}
            clickedCards={clickedCards}
            highestScore={highestScore}
            saveHighScoreAndLevel={saveHighScoreAndLevel}
            level={level}
            gameSounds={this.gameSounds}
          />
          <TimerBoard
            timeLeft={timeLeft}
            maxTimeInSecond={maxTimeInSecond}
            setTimerLeft={setTimerLeft}
            setGameOver={setGameOver}
            level={level}
          />
        </header>

        <CardContainer
          fetchedData={fetchedData}
          error={error}
          shuffleCards={shuffleCards}
          clickedCards={clickedCards}
          setGameOver={setGameOver}
          setFetchedDataState={setFetchedDataState}
          setErrorState={setErrorState}
          setShuffleCardsState={setShuffleCardsState}
          setClickedCards={setClickedCards}
          gameSounds={this.gameSounds}
        />
      </motion.main>
    );
  }
  componentDidMount() {
    this.timeOutId = setTimeout(() => {
      this.gameSounds.playGamePlaySound();
    }, 200);
  }

  componentWillUnmount() {
    clearTimeout(this.timeOutId);
    this.gameSounds.pauseGamePlaySound();
  }
}
