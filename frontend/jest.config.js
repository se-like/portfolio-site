const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // next.config.jsと.envファイルを読み込むためのパス
  dir: './',
});

// Jestに渡すカスタム設定
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{spec,test}.{js,jsx,ts,tsx}',
  ],
};

// createJestConfigは非同期のNext.jsの設定を読み込むために使用
module.exports = createJestConfig(customJestConfig); 