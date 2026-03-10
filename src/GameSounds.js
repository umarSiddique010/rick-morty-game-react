import cardClickSoundSrc from './assets/sounds/cardClickSound.mp3';
import easyButtonSoundSrc from './assets/sounds/easyButtonSound.mp3';
import mediumButtonSoundSrc from './assets/sounds/mediumButtonSound.mp3';
import hardButtonSoundSrc from './assets/sounds/hardButtonSound.mp3';
import lobbyButtonSoundSrc from './assets/sounds/lobbyButtonSound.mp3';
import lobbyBGMSrc from './assets/sounds/lobbyBGM.mp3';
import gamePlaySoundSrc from './assets/sounds/rickAndMortyBGMSound.mp3';

export default class GameSounds {
  constructor() {
    this.cardClickSound = new Audio(cardClickSoundSrc);
    this.easyButtonSound = new Audio(easyButtonSoundSrc);
    this.mediumButtonSound = new Audio(mediumButtonSoundSrc);
    this.hardButtonSound = new Audio(hardButtonSoundSrc);
    this.lobbyButtonSound = new Audio(lobbyButtonSoundSrc);
    this.lobbyBGM = new Audio(lobbyBGMSrc);
    this.gamePlaySound = new Audio(gamePlaySoundSrc);

    this.mute = false;
  }

  playCardClickSound() {
    if (!this.mute) {
      const sound = this.cardClickSound.cloneNode();
      sound.volume = 0.32;
      sound.play().catch(err => {
        if (err.name !== 'AbortError') {
          console.error('Error playing cardClickSound:', err);
        }
      });
    }
  }

  playEasyButtonSound() {
    if (!this.mute) {
      const sound = this.easyButtonSound.cloneNode();
      sound.volume = 0.5;
      sound.play().catch(err => {
        if (err.name !== 'AbortError') {
          console.error('Error playing easyButtonSound:', err);
        }
      });
    }
  }

  playMediumButtonSound() {
    if (!this.mute) {
      const sound = this.mediumButtonSound.cloneNode();
      sound.volume = 0.5;
      sound.play().catch(err => {
        if (err.name !== 'AbortError') {
          console.error('Error playing mediumButtonSound:', err);
        }
      });
    }
  }

  playHardButtonSound() {
    if (!this.mute) {
      const sound = this.hardButtonSound.cloneNode();
      sound.volume = 0.5;
      sound.play().catch(err => {
        if (err.name !== 'AbortError') {
          console.error('Error playing hardButtonSound:', err);
        }
      });
    }
  }

  playLobbyButtonSound() {
    if (!this.mute) {
      const sound = this.lobbyButtonSound.cloneNode();
      sound.volume = 0.5;
      sound.play().catch(err => {
        if (err.name !== 'AbortError') {
          console.error('Error playing lobbyButtonSound:', err);
        }
      });
    }
  }

  playLobbyBGM() {
    if (!this.mute) {
      this.lobbyBGM.loop = true;
      this.lobbyBGM.volume = 0.3;
      this.lobbyBGM.play().catch(err => {
        if (err.name !== 'AbortError') {
          console.error('Error playing lobbyBGM:', err);
        }
      });
    } else {
      this.pauseLobbyBGM();
    }
  }

  pauseLobbyBGM() {
    this.lobbyBGM.pause();
  }

  playGamePlaySound() {
    if (!this.mute) {
      this.gamePlaySound.loop = true;
      this.gamePlaySound.volume = 0.15;
      this.gamePlaySound.play().catch(err => {
        if (err.name !== 'AbortError') {
          console.error('Error playing gamePlaySound:', err);
        }
      });
    } else {
      this.pauseGamePlaySound();
    }
  }

  pauseGamePlaySound() {
    this.gamePlaySound.pause();
  }

  toggleGameSound(muteValue, screenContext) {
    if (typeof muteValue !== 'boolean') {
      throw new Error('Mute value must be a boolean value');
    }

    this.mute = muteValue;

    if (this.mute) {
      this.pauseLobbyBGM();
      this.pauseGamePlaySound();
    } else {
      if (screenContext === 'playGame') {
        this.playGamePlaySound();
      } else if (screenContext === 'gameOver') {
        this.playLobbyBGM();
      }
    }
  }
}
