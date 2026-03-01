import type { Config } from 'jest';
import nextJest from 'next/jest';

const createJestConfig = nextJest({
  // next.config.jsと.envファイルを読み込むために、Next.jsのパスを指定
  dir: './',
});

// Jestに渡すカスタム設定
const customJestConfig: Config = {
  setupFiles: ['<rootDir>/jest.env.ts'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/__tests__/**/*.test.[jt]s?(x)'],
};

// createJestConfigは非同期のNext.jsの設定を読み込むために使用
export default createJestConfig(customJestConfig); 