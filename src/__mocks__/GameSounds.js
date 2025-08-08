const mockGameSounds = {
  cardClickSound: {},
  easyButtonSound: {},
  mediumButtonSound: {},
  hardButtonSound: {},
  lobbyButtonSound: {},
  lobbyBGM: {},
  gamePlaySound: {},
  mute: false,

  //  methods
  playCardClickSound: jest.fn(),
  playEasyButtonSound: jest.fn(),
  playMediumButtonSound: jest.fn(),
  playHardButtonSound: jest.fn(),
  playLobbyButtonSound: jest.fn(),
  playLobbyBGM: jest.fn(),
  pauseLobbyBGM: jest.fn(),
  playGamePlaySound: jest.fn(),
  pauseGamePlaySound: jest.fn(),
  toggleGameSound: jest.fn(),
};

export default mockGameSounds;
