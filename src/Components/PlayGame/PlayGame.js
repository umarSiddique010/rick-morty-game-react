import React from 'react';
import CardContainer from '../CardContainer/CardContainer';
import ScoreBoard from '../ScoreBoard/ScoreBoard';
import TimerBoard from '../TimerBoard/TimerBoard';
import Styles from './PlayGame.module.css';
import { motion } from 'motion/react';

export default class PlayGame extends React.Component {
  constructor(props) {
    super(props);

   
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
        className={Styles.play_game}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.1,
          ease: 'easeInOut',
        }}
      >
        <header className={Styles.header}>
          <ScoreBoard
            fetchedData={fetchedData}
            clickedCards={clickedCards}
            highestScore={highestScore}
            saveHighScoreAndLevel={saveHighScoreAndLevel}
            level={level}
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
        />
      </motion.main>
    );
  }
}
