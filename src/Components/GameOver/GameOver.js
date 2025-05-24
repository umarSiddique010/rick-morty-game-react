import React from 'react';
import Styles from './GameOver.module.css';
import { motion } from 'motion/react';

export default class GameOver extends React.Component {
  constructor(props) {
    super(props);

    this.handlePlayAgain = this.handlePlayAgain.bind(this);
    this.handleGoLobby = this.handleGoLobby.bind(this);
    this.handleTotalTimeTaken = this.handleTotalTimeTaken.bind(this);
  }
  render() {
    const { fetchedData, clickedCards, highestScore, level } = this.props;
    return (
      <motion.main
        className={Styles.game_over}
        initial={{ opacity: 0, scale: 2 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 15,
        }}
        exit={{ opacity: 0, scale: 2 }}
      >
        {clickedCards.length === 20 ? (
          <h2>YOU NAILED IT</h2>
        ) : (
          <h2>GAME OVER</h2>
        )}

        <div className={Styles.score_board}>
          <h3>
            Gameplay Duration: <span>{this.handleTotalTimeTaken()}</span>
          </h3>

          <h3>
            difficulty level:{' '}
            <span
              className={
                level === 'easy'
                  ? Styles.green_color
                  : level === 'medium'
                  ? Styles.yellow_color
                  : Styles.red_color
              }
            >
              {level}
            </span>
          </h3>
          <h3>
            Highest Score:{' '}
            <span
              className={
                clickedCards.length < highestScore
                  ? Styles.green_color
                  : Styles.red_color
              }
            >
              {highestScore}
            </span>
          </h3>
          <h3>
            Current Score:{' '}
            <span
              className={
                clickedCards.length < 8
                  ? Styles.green_color
                  : clickedCards.length >= 8 && clickedCards.length <= 15
                  ? Styles.yellow_color
                  : Styles.red_color
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
                  ? Styles.red_color
                  : fetchedData.length - clickedCards.length >= 8 &&
                    fetchedData.length - clickedCards.length <= 15
                  ? Styles.yellow_color
                  : Styles.green_color
              }
            >
              {fetchedData.length - clickedCards.length}
            </span>
          </h3>
        </div>

        <div className={Styles.button_wrapper}>
          <button onClick={this.handlePlayAgain}>Play Again</button>
          <button onClick={this.handleGoLobby}>Back to Lobby</button>
        </div>
      </motion.main>
    );
  }

  handlePlayAgain() {
    this.props.setStartGame(false, this.props.level);
    this.props.setGameOver(false);
    this.props.resetClickedCard();
  }

  handleGoLobby() {
    this.props.setStartGame(true, this.props.level);
    this.props.setGameOver(false);
  }


   handleTotalTimeTaken() {
  const { timeLeft, level } = this.props;

  const totalTimes = {
    easy: 210,
    medium: 120,
    hard: 40,
  };

  const total = totalTimes[level] 
  const timeTaken = total - timeLeft;

  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;

  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

return `${formattedMinutes}:${formattedSeconds}`;
}

  }

