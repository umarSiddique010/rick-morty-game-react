import React from 'react';
import styles from './TimerBoard.module.css';

export default class TimerBoard extends React.Component {
  constructor(props) {
    super(props);

    this.renderTimer = this.renderTimer.bind(this);
  }

  render() {
    const timer = this.renderTimer();

    return (
      <h3 className={styles.timerBoard}>
        <span data-testid="time-left">Time Left:</span> {timer}
      </h3>
    );
  }

  componentDidMount() {
    this.intervalID = setInterval(() => {
      const {timeLeft} = this.props;
      this.props.setTimerLeft(timeLeft - 1);
    }, 1000);

    this.timeOutID = setTimeout(() => {
      this.props.setTimerLeft(0);
      this.props.setGameOver(true);
    }, this.props.maxTimeInSecond(this.props.level));
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
    clearTimeout(this.timeOutID);
  }

  renderTimer() {
    const {timeLeft} = this.props;
    let mins = Math.floor(timeLeft / 60);
    let secs = timeLeft % 60;

    const formattedMins = mins.toString().padStart(2, '0');
    const formattedSecs = secs.toString().padStart(2, '0');

    return `${formattedMins}:${formattedSecs}`;
  }
}
