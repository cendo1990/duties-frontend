import './Common.mock';
import { render, screen } from "@testing-library/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TodoList from '../Todo/TodoList';

const openNotification = ()=>{

}

describe("test TodoList", () => {
  test("render TodoList", async () => {
    render(<BrowserRouter>
        <Routes>
          <Route path="/" element={<TodoList resourceType="todos" openNotification={openNotification} />} />
        </Routes>
      </BrowserRouter>);
    const nameElement = screen.getAllByText("Name");
    expect(nameElement.length).toBe(1);
    const idElement = screen.getAllByText("ID");
    expect(idElement.length).toBe(1);
    const operationElement = screen.getAllByText("Operation");
    expect(operationElement.length).toBe(1);
  });
});