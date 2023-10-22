import { Button } from "./button";
import {render, screen, fireEvent} from '@testing-library/react'

describe('Тест кнопки', () => {

  it("Кнопка с текстом", () => {
    render(<Button text="Press the button" />);
    expect(screen.getByText("Press the button")).toBeInTheDocument();
  });

  it("Кнопка без текста", () => {
    render(<Button />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("Не активная кнопка", () => {
    const item = render(<Button disabled={true} />);
    expect(item).toMatchSnapshot();
  });

  it("Кнопка с loader", () => {
    const btn = render(<Button isLoader={true} />);
    expect(btn).toMatchSnapshot();
  });

  it("Нажатие на кнопку", () => {
    const clickOnButton = jest.fn();
    render(<Button text="textButton" onClick={clickOnButton} />);
    fireEvent.click(screen.getByText("textButton"));
    expect(clickOnButton).toHaveBeenCalled();
  });

})