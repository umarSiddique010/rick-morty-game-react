import React from 'react';
import Styles from './ScoreBoard.module.css';
import { motion } from 'motion/react';
import { IoVolumeMuteOutline } from 'react-icons/io5';
import { AiOutlineMuted } from 'react-icons/ai';

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
    const { fetchedData, clickedCards, highestScore } = this.props;

    return (
      <div className={Styles.score_board}>
        <h3>
          {clickedCards.length > 1 ? 'Cards' : 'Card'} left:{' '}
          <motion.span
            key={fetchedData.length - clickedCards.length}
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
              fetchedData.length - clickedCards.length < 8
                ? Styles.red_color
                : fetchedData.length - clickedCards.length >= 8 &&
                  fetchedData.length - clickedCards.length <= 15
                ? Styles.yellow_color
                : Styles.green_color
            }
          >
            {fetchedData.length - clickedCards.length}
          </motion.span>
        </h3>
        <h3>
          Highest score:{' '}
          <motion.span
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
            className={
              clickedCards.length < highestScore
                ? Styles.green_color
                : Styles.red_color
            }
          >
            {highestScore}
          </motion.span>
        </h3>
        <h3>
          Current score:
          <motion.span
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
            style={{ marginLeft: '6px' }}
            className={
              clickedCards.length < 8
                ? Styles.green_color
                : clickedCards.length >= 8 && clickedCards.length <= 15
                ? Styles.yellow_color
                : Styles.red_color
            }
          >
            {clickedCards.length}
          </motion.span>
        </h3>
        <div className={Styles.btn_wrapper}>
          <button className={Styles.mute_btn} onClick={this.handleMute}>
            {!this.state.mute ? (
              <IoVolumeMuteOutline className={Styles.mute} />
            ) : (
              <AiOutlineMuted className={Styles.unmute} />
            )}
          </button>
        </div>
      </div>
    );
  }

  handleMute() {
    this.setState((prevState) => {
      const newMute = !prevState.mute;
      if (newMute) {
        this.gameSounds.pauseGamePlaySound();
      } else {
        this.gameSounds.playGamePlaySound();
      }
      return { mute: newMute };
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.clickedCards.length < this.props.clickedCards.length) {
      this.props.saveHighScoreAndLevel(this.props.clickedCards.length);
    }
  }
}
