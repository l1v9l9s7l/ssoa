import React from "react";
import { StringComponent } from "./string";
import {render, screen, act} from '@testing-library/react'
import renderer from 'react-test-renderer';
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";



const assert = require('assert');


describe('Тест алгоритма разворота строки', () => {

  it('Тест алгоритма разворота с четным количеством символов', (done) => {
    
    const word = 'hell';
    //Рендерим компонент
    act(() => {render(<MemoryRouter><StringComponent /></MemoryRouter>)});
    const button = screen.getByText(/Развернуть/i)
    const input = screen.getByPlaceholderText('Введите текст')
    //Иммитируем ввод в инпут "hell"
    userEvent.type(input, word)
    expect(button).toBeInTheDocument
    expect(input).toBeInTheDocument
    //Иммитируем нажатие на кнопку
    act(() => {userEvent.click(button)})
    //Проверяем что isLoader кнопки true
    expect(screen.getByTestId('button-main')).toHaveAttribute('disabled')
    //Проверяем значение
    const timer = setTimeout(() => {
      const testWord = screen.getByText('lleh')
      expect(testWord).toBeInTheDocument
      done();
    }, 3000);


  })

  it('Тест алгоритма разворота с нечетным количеством символов', (done) => {
    
    const word = 'hel';
    //Рендерим компонент
    act(() => {render(<MemoryRouter><StringComponent /></MemoryRouter>)});
    const button = screen.getByText(/Развернуть/i)
    const input = screen.getByPlaceholderText('Введите текст')
    //Иммитируем ввод в инпут "hell"
    userEvent.type(input, word)
    expect(button).toBeInTheDocument
    expect(input).toBeInTheDocument
    //Иммитируем нажатие на кнопку
    userEvent.click(button)
    //Проверяем что isLoader кнопки true
    expect(screen.getByTestId('button-main')).toHaveAttribute('disabled')
    //Проверяем значение
    const timer = setTimeout(() => {
      const testWord = screen.getByText('leh')
      expect(testWord).toBeInTheDocument
      done();
    }, 2000);
  })

  it('Тест алгоритма разворота с одним символом', () => {
    
    const word = 'h';
    //Рендерим компонент
    act(() => {render(<MemoryRouter><StringComponent /></MemoryRouter>)});
    const button = screen.getByText(/Развернуть/i)
    const input = screen.getByPlaceholderText('Введите текст')
    //Иммитируем ввод в инпут "hell"
    userEvent.type(input, word)
    expect(button).toBeInTheDocument
    expect(input).toBeInTheDocument
    //Иммитируем нажатие на кнопку
    userEvent.click(button)
    //Проверяем что isLoader кнопки true
    expect(screen.getByTestId('button-main')).toHaveAttribute('disabled')
    //Проверяем значение
    const testWord = screen.getByText('h')
    expect(testWord).toBeInTheDocument
  })

  it('Тест алгоритма разворота пустой строки', () => {
    
    //Рендерим компонент
    act(() => {render(<MemoryRouter><StringComponent /></MemoryRouter>)});
    const button = screen.getByText(/Развернуть/i)
    expect(button).toBeInTheDocument
    //Иммитируем нажатие на кнопку
    userEvent.click(button)
    const emptyString = screen.getAllByText('')
    expect(emptyString).toBeInTheDocument
  })



})