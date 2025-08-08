// jest.config.mjs
export default {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testEnvironment: 'jsdom',
  extensionsToTreatAsEsm: ['.jsx'],
  moduleFileExtensions: ['js', 'jsx'],
  setupFilesAfterEnv: ['./jest.setup.js'], // don't need both setupFiles and setupFilesAfterEnv
  moduleNameMapper: {
    '\\.module\\.css$': '<rootDir>/jest.styleMock.js',
    '\\.css$': '<rootDir>/jest.styleMock.js',
    '\\.(jpg|jpeg|png|gif|svg|woff|woff2|ttf|eot)$': '<rootDir>/jest.assetMock.js',
  },
};
