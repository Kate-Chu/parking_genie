import { render, screen } from '@testing-library/react';
import Homepage from './pages/Homepage';

describe('Homepage', () => {
  render(<Homepage />);

  it('render Map', () => {
    const mapElem = screen.getByTestId('map');
    expect(mapElem).toBeInTheDocument();
  });

  it('render SearchForm', () => {
    const searchFormElem = screen.getByTestId('search-form');
    expect(searchFormElem).toBeInTheDocument();
  });

  it('render IconIllustration', () => {
    const iconIllustrationElem = screen.getByTestId('icon-illustration');
    expect(iconIllustrationElem).toBeInTheDocument();
  });

  it('render AboutButton', () => {
    const aboutBtnElem = screen.getByTestId('about-button');
    expect(aboutBtnElem).toBeInTheDocument();
  });
});
