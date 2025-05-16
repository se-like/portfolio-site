import '@testing-library/jest-dom';

declare global {
  interface Window {
    grecaptcha: {
      render: jest.Mock;
      reset: jest.Mock;
      getResponse: jest.Mock;
    };
  }
} 