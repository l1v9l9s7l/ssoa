import { Circle } from "./circle";
import {render, screen} from '@testing-library/react'
import { ElementStates } from "../../../types/element-states";




describe('Тест круга', () => {
  it('Рендер круга с буквой', () => {
      const circle = render(<Circle letter="123" />);
      expect(screen.getByText("123")).toBeInTheDocument();
      expect(circle).toMatchSnapshot()
  });

  it('Рендер круга ,без буквы', () => {
      const circle = render(<Circle />);
      expect(circle).toMatchSnapshot();
  });

  it("Круг с head", () => {
      const circle = render(<Circle head="head" />);
      expect(screen.getByText("head")).toBeInTheDocument();
      expect(circle).toMatchSnapshot()
  });

  it("Круг с React элементом в head", () => {
      const circle = render(<Circle head={<Circle />} />);
      expect(circle).toMatchSnapshot();
  });

  it("Круг с текстом в tail", () => {
      const circle = render(<Circle tail="tail" />);
      expect(screen.getByText("tail")).toBeInTheDocument();
      expect(circle).toMatchSnapshot();
  });

  it("Круг с React элементом в tail", () => {
      const circle = render(<Circle tail={<Circle />} />);
      expect(circle).toMatchSnapshot();
  });

  it("Круг с индексом", () => {
      const circle = render(<Circle index={4} />);
      expect(circle).toMatchSnapshot();
  });

  it("Маленький круг", () => {
      const circle = render(<Circle isSmall={true} />);
      expect(circle).toMatchSnapshot();
  });

  it("Круг с default state ", () => {
      const circle = render(<Circle state={ElementStates.Default} />);
      expect(circle).toMatchSnapshot();
  });

  it("Круг с changing state", () => {
      const circle = render(<Circle state={ElementStates.Default} />);
      expect(circle).toMatchSnapshot();
  });

  it("Круг с modified state", () => {
      const circle = render(<Circle state={ElementStates.Default} />);
      expect(circle).toMatchSnapshot();
  });
})

