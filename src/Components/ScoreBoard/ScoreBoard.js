import React from 'react';
import styles from './ScoreBoard.module.css';
import {motion} from 'motion/react';
import {GiSoundOn} from 'react-icons/gi';
import {GiSoundOff} from 'react-icons/gi';

export default class ScoreBoard extends React.Component {
  constructor(props) {
    super(props);
    this.gameSounds = this.props.gameSounds;
    this.state = {
      mute: false,
    };

    this.handleMute = this.handleMute.bind(this);
  }

  render() {
    const {fetchedData, clickedCards, highestScore} = this.props;

    const cardLeft = fetchedData.length - clickedCards.length;

    return (
      <div className={styles.scoreBoard}>
        <h3>
          {clickedCards.length > 1 ? 'Cards' : 'Card'} left:{' '}
          <motion.span
            data-testid="cards-left"
            key={cardLeft}
            initial={{
              y: -20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: 20,
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
            className={
              cardLeft < 8
                ? 'red-color'
                : cardLeft >= 8 && cardLeft <= 15
                  ? 'yellow-color'
                  : 'green-color'
            }
          >
            {cardLeft}
          </motion.span>
        </h3>
        <h3>
          Highest score:{' '}
          <motion.span
            data-testid="highest-score"
            key={highestScore}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
            className={clickedCards.length < highestScore ? 'green-color' : 'red-color'}
          >
            {highestScore}
          </motion.span>
        </h3>
        <h3>
          Current score:
          <motion.span
            data-testid="current-score"
            key={clickedCards.length}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 1,
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
            style={{marginLeft: '6px'}}
            className={
              clickedCards.length < 8
                ? 'green-color'
                : clickedCards.length >= 8 && clickedCards.length <= 15
                  ? 'yellow-color'
                  : 'red-color'
            }
          >
            {clickedCards.length}
          </motion.span>
        </h3>
        <div className={styles.btnWrapper}>
          <button className={styles.muteToggleBtn} onClick={this.handleMute}>
            {this.state.mute ? (
              <GiSoundOff className={styles.muteOff} />
            ) : (
              <GiSoundOn className={styles.muteOn} />
            )}
          </button>
        </div>
      </div>
    );
  }

  handleMute() {
    this.setState(prevState => {
      const newMute = !prevState.mute;
      if (newMute) {
        this.gameSounds.pauseGamePlaySound();
      } else {
        this.gameSounds.playGamePlaySound();
      }
      return {mute: newMute};
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.clickedCards.length < this.props.clickedCards.length) {
      this.props.saveHighScoreAndLevel(this.props.clickedCards.length);
    }
  }
}
