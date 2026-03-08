import {Component} from 'react';
import styles from './SoundToggleButton.module.css';
import {AiFillSound} from 'react-icons/ai';
import {MdVolumeOff} from 'react-icons/md';

export default class SoundToggleButton extends Component {
  constructor(props) {
    super(props);
    this.gameSounds = this.props.gameSounds;
    this.state = {
      mute: false,
    };
    this.handleMuteToggle = this.handleMuteToggle.bind(this);
  }

  render() {
    return (
      <button
        aria-label="Toggle sound"
        className={styles.soundToggleButton}
        onClick={this.handleMuteToggle}
      >
        {this.state.mute ? (
          <MdVolumeOff aria-label="Sound off" data-testid="soundOff" className={styles.soundOff} />
        ) : (
          <AiFillSound aria-label="Sound on" data-testid="soundOn" className={styles.soundOn} />
        )}
      </button>
    );
  }

  handleMuteToggle() {
    const newMute = !this.state.mute;
    this.gameSounds.toggleGameSound(newMute, this.props.screenContext);
    this.setState({mute: newMute});
  }
}
