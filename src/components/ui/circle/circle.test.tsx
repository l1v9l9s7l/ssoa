import React from "react";
import { Circle } from "./circle";
import {render, screen} from '@testing-library/react'
import renderer from 'react-test-renderer';
import { ElementStates } from "../../../types/element-states";


describe('Тест кнопки', () => {

  it('Рендер круга с буквой', () => {
    const circleSymbol = 'I';
    //Извлекаем метод getByText из рендера кнопки
    const { getByText } = render(<Circle letter={circleSymbol} />);
    //Ложим кнопку с текстом в переменную
    const circleElement = getByText(circleSymbol).textContent;
    //Проверяем находится ли кнопка в документе
    expect(circleElement).toBe(circleSymbol);
  })

  it('Рендер круга без буквы', () => {
    const circleSymbol = '';
    //Извлекаем метод getByTestId из рендера кнопки
    const { getByTestId } = render(<Circle letter={circleSymbol} />);
    //Ложим текст кнопки по заданному id в переменную
    const testText = getByTestId('circle-symbol').textContent;
    //Проверяем схожесть отсутствия текста
    expect(circleSymbol).toBe(testText);
  })

  it('Круг с  head', () => {
    const circleText = 'Text';
    const { getByTestId } = render(<Circle head={circleText} />);
    const testText = getByTestId('circle-head').textContent;
    expect(circleText).toBe(testText);
  })

  it('Круг с react-элементом в head', () => {
    const element = (<div data-testid="element-test"></div>)
    const { getByTestId } = render(<Circle head={element} />);
    const testElement = getByTestId('element-test');
    expect(testElement).toBeInTheDocument();
  })

  it('Круг с  tail', () => {
    const circleText = 'Text';
    const { getByTestId } = render(<Circle tail={circleText} />);
    const testText = getByTestId('circle-tail').textContent;
    expect(circleText).toBe(testText);
  })

  it('Круг с react-элементом в tail', () => {
    const element = (<div data-testid="element-test"></div>)
    const { getByTestId } = render(<Circle tail={element} />);
    const testElement = getByTestId('element-test');
    expect(testElement).toBeInTheDocument();
  })

  it('Круг с index', () => {
    const circleIndex = 5;
    const { getByTestId } = render(<Circle index={circleIndex} />);
    const testText = getByTestId('circle-index').textContent;
    expect(circleIndex.toString()).toBe(testText);
  })

  it('Круг с isSmall = true', () => {
    const { getByTestId } = render(<Circle isSmall={true} />);
    const isSmall = getByTestId('circle-state').classList.contains('small');
    expect(isSmall).toBe(true);
  })

  it('Круг default', () => {
    const { getByTestId } = render(<Circle state={ElementStates.Default} />);
    const circleState = getByTestId('circle-state').classList.contains('default');
    expect(circleState).toBe(true);
  })

  it('Круг changing', () => {
    const { getByTestId } = render(<Circle state={ElementStates.Changing} />);
    const circleState = getByTestId('circle-state').classList.contains('changing');
    expect(circleState).toBe(true);
  })

  it('Круг modified', () => {
    const { getByTestId } = render(<Circle state={ElementStates.Modified} />);
    const circleState = getByTestId('circle-state').classList.contains('modified');
    expect(circleState).toBe(true);
  })

})