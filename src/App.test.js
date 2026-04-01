import { render, screen } from '@testing-library/react';

// Minimal smoke test — App requires Firebase auth, so we mock it
jest.mock('./firebase', () => ({
  auth: {},
  db: {},
}));

jest.mock('firebase/auth', () => ({
  onAuthStateChanged: jest.fn((_auth, cb) => { cb(null); return () => {}; }),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  doc: jest.fn(),
  getDoc: jest.fn(() => Promise.resolve({ exists: () => false, data: () => ({}) })),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  arrayUnion: jest.fn(),
  arrayRemove: jest.fn(),
}));

import App from './App';

test('renders login screen when unauthenticated', () => {
  render(<App />);
  expect(screen.getByText(/ALIEN/i)).toBeInTheDocument();
});
