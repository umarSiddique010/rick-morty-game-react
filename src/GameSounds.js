export default class GameSounds {
  constructor() {
    this.cardClickSound = new Audio('/sounds/cardClickSound.mp3');
    this.easyButtonSound = new Audio('/sounds/easyButtonSound.mp3');
    this.mediumButtonSound = new Audio('/sounds/mediumButtonSound.mp3');
    this.hardButtonSound = new Audio('/sounds/hardButtonSound.mp3');
    this.lobbyButtonSound = new Audio('/sounds/lobbyButtonSound.mp3');
    this.lobbyBGM = new Audio('/sounds/lobbyBGM.mp3');
    this.gamePlaySound = new Audio('/sounds/rickAndMortyBGMSound.mp3');
    this.gameOverSound = new Audio('/sounds/gameOverSound.mp3');
  }
  playCardClickSound() {
    this.cardClickSound.play();
  }
  playEasyButtonSound() {
    this.easyButtonSound.play();
  }
  playMediumButtonSound() {
    this.mediumButtonSound.play();
  }
  playHardButtonSound() {
    this.hardButtonSound.play();
  }
  playLobbyButtonSound() {
    this.lobbyButtonSound.play();
  }
  playLobbyBGM() {
    this.lobbyBGM.loop = true;
    this.lobbyBGM.volume = 0.7;
    this.lobbyBGM.play().catch((err) => {
      if (err.name !== 'AbortError') {
        console.error('Error playing lobbyBGM:', err);
      }
    });
  }
  pauseLobbyBGM() {
    this.lobbyBGM.pause();
  }

  playGamePlaySound() {
    this.gamePlaySound.loop = true;
    this.gamePlaySound.volume = 0.45;
    this.gamePlaySound.play().catch((err) => {
      if (err.name !== 'AbortError') {
        console.error('Error playing gamePlaySound:', err);
      }
    });
  }

  pauseGamePlaySound() {
    this.gamePlaySound.pause();
  }
}
