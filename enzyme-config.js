import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';

configure({ adapter: new Adapter() });


jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);

jest.mock('react-native-simple-toast', () => ({
  show: jest.fn(),
}));

// jest.mock("@react-native-community/async-storage", () =>
//   require("@react-native-community/async-storage/jest/async-storage-mock"),
// );
/*
jest.mock('react-native-cookies', () => ({
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  openURL: jest.fn(),
  canOpenURL: jest.fn(),
  getInitialURL: jest.fn(),
  clearAll: jest.fn(() => Promise.resolve()),
}));

jest.mock('react-native-secure-key-store', () => ({
  remove: jest.fn(() => Promise.resolve({})),
  get: jest.fn(() => Promise.resolve({})),
  ACCESSIBLE: {
    ALWAYS_THIS_DEVICE_ONLY: 'aa',
  },
  set: jest.fn(() => Promise.resolve({})),
}));

jest.mock('Alert', () => ({
  alert: jest.fn(),
}));

jest.mock('react-native-firebase', () => ({
  analytics: jest.fn(() => ({
    logEvent: jest.fn(),
    setCurrentScreen: jest.fn(),
  })),
}));

// jest.mock('./app/commonComponents/HOC/keepAliveSession', () => jest.fn(a => a));

jest.mock('react-native-touch-id', () => ({
  isSupported: jest.fn(() => Promise.resolve(true)),
  authenticate: jest.fn(() => Promise.resolve('')),
}));

jest.mock('react-native-device-info', () => ({
  getModel: jest.fn(),
  getApplicationName: jest.fn(),
  getVersion: jest.fn(),
}));
*/
