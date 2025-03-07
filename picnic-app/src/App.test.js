import { render, screen } from '@testing-library/react';
import App from './App';

test('renders B.Sc. 3rd Year Picnic text', () => {
  render(<App />);
  const headingElement = screen.getByText(/B\.Sc\. 3rd Year Picnic/i); // Adjust text to match your content
  expect(headingElement).toBeInTheDocument();
});
