import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App Home', () => {
  render(<App />);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
