import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register  from "../Register";

describe("test the register", () => {
  test('render the register form 2 buttons', async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
    
    const buttonList = await screen.findAllByRole("button");
    expect(buttonList).toHaveLength(1);
  });
  
  
});
