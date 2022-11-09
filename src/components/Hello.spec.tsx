import { render, screen } from '@testing-library/react';
import React from 'react';
import Hello from './Hello';

it('render hello', () => {
  render(<Hello />);
  const testElem = screen.getByText(/Hello World/);
  expect(testElem).toBeInTheDocument();
});
