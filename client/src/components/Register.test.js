import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from './Register';

test('initial form fields are empty', () => {
  render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  );

  const inputElements = screen.getAllByRole('textbox');
  expect(inputElements).toHaveLength(5);

  inputElements.forEach((input) => {
    expect(input.value).toBe('');
  });
});
