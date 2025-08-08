import React from 'react';
import styles from './GameOver.module.css';
import {motion} from 'motion/react';

export default class GameOver extends React.Component {
  constructor(props) {
    super(props);
    this.gameSounds = this.props.gameSounds;
    this.timeOutId = null;
    this.handlePlayAgain = this.handlePlayAgain.bind(this);
    this.handleGoLobby = this.handleGoLobby.bind(this);
    this.handleTotalTimeTaken = this.handleTotalTimeTaken.bind(this);
  }
  render() {
    const {fetchedData, clickedCards, highestScore, level} = this.props;
    return (
      <motion.main
        className={styles.gameOver}
        initial={{opacity: 0, scale: 2}}
        animate={{opacity: 1, scale: 1}}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 15,
        }}
        exit={{opacity: 0, scale: 2}}
      >
        {clickedCards.length === 20 ? <h2>YOU NAILED IT</h2> : <h2>GAME OVER</h2>}

        <div className={styles.scoreBoard}>
          <h3>
            Gameplay Duration:{' '}
            <span className={styles.timeTaken}>{this.handleTotalTimeTaken()}</span>
          </h3>

          <h3>
            difficulty level:{' '}
            <span
              className={
                level === 'easy' ? 'green-color' : level === 'medium' ? 'yellow-color' : 'red-color'
              }
            >
              {level}
            </span>
          </h3>
          <h3>
            Highest Score:{' '}
            <span className={clickedCards.length < highestScore ? 'green-color' : 'red-color'}>
              {highestScore}
            </span>
          </h3>
          <h3>
            Current Score:{' '}
            <span
              className={
                clickedCards.length < 8
                  ? 'green-color'
                  : clickedCards.length >= 8 && clickedCards.length <= 15
                    ? 'yellow-color'
                    : 'red-color'
              }
            >
              {clickedCards.length}
            </span>
          </h3>
          <h3>
            {clickedCards.length > 1 ? 'Cards' : 'Card'} left:{' '}
            <span
              className={
                fetchedData.length - clickedCards.length < 8
                  ? 'red-color'
                  : fetchedData.length - clickedCards.length >= 8 &&
                      fetchedData.length - clickedCards.length <= 15
                    ? 'yellow-color'
                    : 'green-color'
              }
            >
              {fetchedData.length - clickedCards.length}
            </span>
          </h3>
        </div>

        <div className={styles.buttonWrapper}>
          <button onClick={this.handlePlayAgain}>Play Again</button>
          <button onClick={this.handleGoLobby}>Back to Lobby</button>
        </div>
      </motion.main>
    );
  }

  componentDidMount() {
    this.timeOutId = setTimeout(() => {
      this.gameSounds.playLobbyBGM();
    }, 500);
  }

  componentWillUnmount() {
    clearTimeout(this.timeOutId);
    this.gameSounds.pauseLobbyBGM();
  }

  handlePlayAgain() {
    if (this.props.level === 'easy') {
      this.gameSounds.playEasyButtonSound();
    } else if (this.props.level === 'medium') {
      this.gameSounds.playMediumButtonSound();
    } else if (this.props.level === 'hard') {
      this.gameSounds.playHardButtonSound();
    }
    this.props.setStartGame(false, this.props.level);
    this.props.setGameOver(false);
    this.props.resetClickedCard();
  }

  handleGoLobby() {
    this.props.setStartGame(true, this.props.level);
    this.props.setGameOver(false);
    this.gameSounds.playLobbyButtonSound();
  }

  handleTotalTimeTaken() {
    const {timeLeft, level} = this.props;

    const totalTimes = {
      easy: 210,
      medium: 120,
      hard: 40,
    };

    const total = totalTimes[level];
    const timeTaken = total - timeLeft;

    const minutes = Math.floor(timeTaken / 60);
    const seconds = timeTaken % 60;

    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  }
}
