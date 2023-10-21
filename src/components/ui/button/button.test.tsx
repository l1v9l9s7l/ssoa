import React from "react";
import { Button } from "./button";
import {render, screen} from '@testing-library/react'
import renderer from 'react-test-renderer';

describe('Тест кнопки', () => {

  it('Рендер кнопки с текстом', () => {
    const buttonText = 'Я кнопка';
    //Извлекаем метод getByText из рендера кнопки
    const { getByText } = render(<Button text={buttonText} />);
    //Ложим кнопку с текстом в переменную
    const buttonElement = getByText(buttonText);
    //Проверяем находится ли кнопка в документе
    expect(buttonElement).toBeInTheDocument();
  })

  it('Рендер кнопки без текста', () => {
    const buttonText = '';
    //Извлекаем метод getByTestId из рендера кнопки
    const { getByTestId } = render(<Button text={buttonText} />);
    //Ложим текст кнопки по заданному id в переменную
    const testText = getByTestId('button-text').textContent;
    //Проверяем схожесть отсутствия текста
    expect(buttonText).toBe(testText);
  })

  it('Кнопка не активна', () => {
    //Извлекаем метод getByRole из рендера кнопки
    const { getByRole } = render(<Button disabled />);

    //Проверяем деактивность кнопки
    expect(getByRole('button')).toBeDisabled()
  })

  it('Кнопка c индикацией загрузки', () => {
    const { getByAltText } = render(<Button disabled isLoader={true} />);
    const loader = getByAltText('Загрузка.');
    //Проверяем наличие кнопки с тескстом 'Загрузка.'
    expect(loader).toBeInTheDocument
  })

})