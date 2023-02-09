import React from 'react';
import {render, screen} from '@testing-library/react';
import Index from './index';

test('renders A link', () => {
  render(<Index />);
  const linkElement = screen.getByText(/下载/i);
  expect(linkElement).toBeInTheDocument();
});
