export default class GameSounds {
  constructor() {
    this.cardClickSound = new Audio('/sounds/cardClickSound.mp3');
    this.easyButtonSound = new Audio('/sounds/easyButtonSound.mp3');
    this.mediumButtonSound = new Audio('/sounds/mediumButtonSound.mp3');
    this.hardButtonSound = new Audio('/sounds/hardButtonSound.mp3');
    this.lobbyButtonSound = new Audio('/sounds/lobbyButtonSound.mp3');
    this.lobbyBGM = new Audio('/sounds/lobbyBGM.mp3');
    this.gamePlaySound = new Audio('/sounds/rickAndMortyBGMSound.mp3');

    this.mute = false;
  }

  playCardClickSound() {
    if (!this.mute) {
      const sound = this.cardClickSound.cloneNode();
      sound.volume = 0.32;
      sound.play();
    }
  }

  playEasyButtonSound() {
    if (!this.mute) {
      const sound = this.easyButtonSound.cloneNode();
      sound.volume = 0.5;
      sound.play();
    }
  }

  playMediumButtonSound() {
    if (!this.mute) {
      const sound = this.mediumButtonSound.cloneNode();
      sound.volume = 0.5;
      sound.play();
    }
  }

  playHardButtonSound() {
    if (!this.mute) {
      const sound = this.hardButtonSound.cloneNode();
      sound.volume = 0.5;
      sound.play();
    }
  }

  playLobbyButtonSound() {
    if (!this.mute) {
      const sound = this.lobbyButtonSound.cloneNode();
      sound.volume = 0.5;
      sound.play();
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
