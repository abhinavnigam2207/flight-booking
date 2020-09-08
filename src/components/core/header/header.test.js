import React from 'react';
import { render } from '@testing-library/react';
import Header from './header';

test('It renders', () => {
  const { getByText } = render(<Header />);
  expect(getByText(/flight search app/i)).toBeInTheDocument();
});
