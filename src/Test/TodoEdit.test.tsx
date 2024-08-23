import './Common.mock';
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoEdit from '../Todo/TodoEdit';

const openNotification = ()=>{

}

describe("test TodoEdit", () => {
  test("render TodoEdit", async () => {
    const handleClick = jest.fn();
    render(<BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoEdit resourceType="todos" openNotification={openNotification} onSubmit={handleClick} />} />
        </Routes>
      </BrowserRouter>);
    const nameElement = screen.getAllByText("Name");
    const inputElement = screen.getAllByLabelText("Name");
    const submitElement = screen.getAllByRole("button");
    const name = "Todo Edit Test";
    expect(nameElement.length).toBe(1);
    expect(submitElement.length).toBe(1);
    expect(inputElement.length).toBe(1);
    fireEvent.change(inputElement[0], {target: {value: name}});
    const inputElement2 = screen.getAllByDisplayValue(name);
    expect(inputElement2.length).toBe(1);
    fireEvent.click(submitElement[0]);
    expect(handleClick).toHaveBeenCalled();
    
    // expect(1).toBe(1);
  });
});