import { screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderWithProviders } from '../utils/testUtils';
// import App from '../App';
import About from '../pages/About';

test('renders learn react link', () => {
  renderWithProviders(
    <Router>
      <About />
    </Router>,
  );
  const linkElement = screen.getByText(/Parking Genie/i);
  expect(linkElement).toBeInTheDocument();
});
