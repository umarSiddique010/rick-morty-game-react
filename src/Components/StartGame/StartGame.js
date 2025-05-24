import React from 'react';
import Styles from './StartGame.module.css';
import { motion } from 'motion/react';

export default class StartGame extends React.Component {
  constructor(props) {
    super(props);

    this.handleStartNewGame = this.handleStartNewGame.bind(this);
    this.handleResumePrevGame = this.handleResumePrevGame.bind(this);
  }

  render() {
    return (
      <motion.main
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        exit={{ y: '-100vh' }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        <div className={Styles.start_game_container}>
          <h1>Rick and Morty Memory Card Game</h1>

          <div className={Styles.how_to_play}>
            <h2>How to Play</h2>
            <ul>
              <li>Pick a difficulty level to begin.</li>
              <li>Click on a card to reveal it.</li>
              <li>Don’t click the same card twice!</li>
              <li>The game ends when you repeat a card or time runs out.</li>
              <li>Your score is how many unique cards you clicked.</li>
            </ul>
          </div>

          <div className={Styles.game_play}>
            <h2>Play Game</h2>

            <div className={Styles.resume_prev_game}>
              <button
                className={Styles.resume_btn}
                onClick={this.handleResumePrevGame}
              >
                Resume Game
              </button>
            </div>
            <div className={Styles.start_new_game}>
              <h3>New Game</h3>
              <div className={Styles.btn_wrapper}>
                <button
                  onClick={(e) =>
                    this.handleStartNewGame(
                      e.currentTarget.textContent.toLowerCase()
                    )
                  }
                >
                  Easy
                </button>
                <button
                  onClick={(e) =>
                    this.handleStartNewGame(
                      e.currentTarget.textContent.toLowerCase()
                    )
                  }
                >
                  Medium
                </button>
                <button
                  onClick={(e) =>
                    this.handleStartNewGame(
                      e.currentTarget.textContent.toLowerCase()
                    )
                  }
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
    const { level, setStartGame } = this.props;
    setStartGame(false, level);
  }

  handleStartNewGame(level) {
    const { setStartGame, resetHighScore } = this.props;
    setStartGame(false, level);
    resetHighScore();
  }
}
