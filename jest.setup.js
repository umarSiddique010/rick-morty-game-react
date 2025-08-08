// jest.setup.js
import '@testing-library/jest-dom';
import {jest} from '@jest/globals';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]),
  })
);
