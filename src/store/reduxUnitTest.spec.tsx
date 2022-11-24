import { screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { renderWithProviders } from '../utils/testUtils';
import About from '../pages/About';
// import Homepage from '../pages/Homepage';

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

  // bug: cannot set transformIgnorePatterns in jest.config.js *** need to fix
  // renderWithProviders(
  //   <Router>
  //     <Homepage />,
  //   </Router>,
  // );

  // test('render homepage', () => {
  //   const payBtn = screen.getByTestId('payBtn');
  //   fireEvent.click(payBtn);
  //   expect(screen.getByTestId('linePay')).toBeInTheDocument();
  // });
});
