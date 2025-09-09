module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-community|uuid)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
