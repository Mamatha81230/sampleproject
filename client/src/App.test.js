// App.test.js
import '@testing-library/jest-dom'; // Import the testing library

import { render, screen } from '@testing-library/react';
import App from './App';

test('header render', () => {
  render(<App />);
  const headerElement = screen.getByText(/All Student Details/i);
  expect(headerElement).toBeInTheDocument();
});
test("render login component in the document",() => {
  const {getByText} =render(<App />);
const childElement =getByText("All Student Details")
 expect(childElement).toBeInTheDocument();   
  
})