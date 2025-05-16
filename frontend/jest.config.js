const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // next.config.jsと.envファイルを読み込むために、Next.jsアプリケーションのパスを指定
  dir: './',
});

// Jestに渡すカスタム設定
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/styles/(.*)$': '<rootDir>/styles/$1',
  },
  collectCoverageFrom: [
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  testMatch: [
    '<rootDir>/__tests__/**/*.test.{js,jsx,ts,tsx}',
  ],
};

// createJestConfigは非同期のNext.jsの設定を読み込むために使用
module.exports = createJestConfig(customJestConfig); 