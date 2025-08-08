import React from 'react';
import styles from './StartGame.module.css';
import {motion} from 'motion/react';

export default class StartGame extends React.Component {
  constructor(props) {
    super(props);
    this.gameSounds = this.props.gameSounds;
    this.handleStartNewGame = this.handleStartNewGame.bind(this);
    this.handleResumePrevGame = this.handleResumePrevGame.bind(this);
  }

  render() {
    return (
      <motion.main
        initial={{y: 0}}
        animate={{y: 0}}
        exit={{y: '-100vh'}}
        transition={{duration: 0.4, ease: 'easeInOut'}}
      >
        <div className={styles.startGameContainer}>
          <h1 className={styles.mainHeading}>Rick and Morty Memory Card Game</h1>

          <div className={styles.howToPlay}>
            <h2>How to Play</h2>
            <ul>
              <li>Pick a difficulty level to begin.</li>
              <li>Click on a card to reveal it.</li>
              <li>Don’t click the same card twice!</li>
              <li>The game ends when you repeat a card or time runs out.</li>
              <li>Your score is how many unique cards you clicked.</li>
            </ul>
          </div>

          <div className={styles.gamePlay}>
            <h2>Play Game</h2>

            <div className={styles.resumePrevGame}>
              {this.props.level !== '' && (
                <button className={styles.resumeBtn} onClick={this.handleResumePrevGame}>
                  Resume Game
                </button>
              )}
            </div>
            <div className={styles.startNewGame}>
              <h3>New Game</h3>
              <div className={styles.btnWrapper}>
                <button
                  onClick={e => this.handleStartNewGame(e.currentTarget.textContent.toLowerCase())}
                >
                  Easy
                </button>
                <button
                  onClick={e => this.handleStartNewGame(e.currentTarget.textContent.toLowerCase())}
                >
                  Medium
                </button>
                <button
                  onClick={e => this.handleStartNewGame(e.currentTarget.textContent.toLowerCase())}
                >
                  Hard
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.main>
    );
  }

  handleResumePrevGame() {
    const {level, setStartGame} = this.props;
    setStartGame(false, level);
    if (level === 'easy') {
      this.gameSounds.playEasyButtonSound();
    } else if (level === 'medium') {
      this.gameSounds.playMediumButtonSound();
    } else if (level === 'hard') {
      this.gameSounds.playHardButtonSound();
    }
  }

  handleStartNewGame(level) {
    const {setStartGame, resetHighScoreAndLevel} = this.props;
    setStartGame(false, level);
    resetHighScoreAndLevel();
    if (level === 'easy') {
      this.gameSounds.playEasyButtonSound();
    } else if (level === 'medium') {
      this.gameSounds.playMediumButtonSound();
    } else if (level === 'hard') {
      this.gameSounds.playHardButtonSound();
    }
  }
}
