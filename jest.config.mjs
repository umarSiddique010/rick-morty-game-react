// jest.config.mjs
export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.jsx'],
  moduleFileExtensions: ['js', 'jsx'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  moduleNameMapper: {
    '\\.module\\.css$': '<rootDir>/jest.styleMock.js',
    '\\.css$': '<rootDir>/jest.styleMock.js',
    '\\.(jpg|jpeg|png|gif|svg|woff|woff2|ttf|eot|mp3|wav|ogg)$': '<rootDir>/jest.assetMock.js',
  },
};
