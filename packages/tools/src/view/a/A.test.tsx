import React from 'react';
import {render, screen} from '@testing-library/react';
import A from './A';

test('renders A link', () => {
  render(<A />);
  const linkElement = screen.getByText(/下载/i);
  expect(linkElement).toBeInTheDocument();
});
