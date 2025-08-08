import {Component} from 'react';
import styles from './SoundToggleButton.module.css';
import {AiFillSound} from 'react-icons/ai';
import {MdVolumeOff} from 'react-icons/md';

export default class GameMuteBtn extends Component {
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
      <button className={styles.soundToggleButton} onClick={this.handleMuteToggle}>
        {this.state.mute ? (
          <MdVolumeOff data-testid="soundOff" className={styles.soundOff} />
        ) : (
          <AiFillSound data-testid="soundOn" className={styles.soundOn} />
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
