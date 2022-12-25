import { screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderWithProviders } from '../utils/testUtils';
import About from '../pages/About';

describe('redux unit text', () => {
  renderWithProviders(
    <Router>
      <About />,
    </Router>,
  );

  test('renders about us', () => {
    const linkElement = screen.getByText(/Parking Genie/i);
    expect(linkElement).toBeInTheDocument();
  });
});
