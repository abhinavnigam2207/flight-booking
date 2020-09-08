import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('App is rendered', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/flight search app/i);
  expect(linkElement).toBeInTheDocument();
});
