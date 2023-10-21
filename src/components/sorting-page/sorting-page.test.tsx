import { SortingPage } from "./sorting-page";
import {render, screen, act} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import {
  arrayWithItems,
  resultArrayWithItemsAsc,
  arrayWithOneItem,
  resultArrayWithItemsDesc
} from '../../constants/forTests';


import {selectionSortAsc, selectionSortDesc} from "./selection-sort";
import {bubbleSortAsc, bubbleSortDesc} from "./bubble-sort";


//Увеличили допустимое время на выполнение тестов
jest.setTimeout(25000);

// Заглушки для функций, при их вызове ничего н происходит, а также не появляются ошибки
const setArray = jest.fn();
const setActive = jest.fn();

describe('Тестирование алгоритмов сортировки выбором и пузырьком по возрастанию', () => {
  it('Тест сортировки пустого массива пузырьком', async ()=> {
    await bubbleSortAsc([], setArray, setActive);
    expect(setArray).toHaveBeenCalledTimes(0);
  })

  it("Тест сортировки массива с одним элементом пузырьком", async () => {
    await bubbleSortAsc(arrayWithOneItem, setArray, setActive);
    expect(setArray).toHaveBeenCalledTimes(0);
});

it("Тест сортировки заполненного массива пузырьком", async () => {
    await bubbleSortAsc(arrayWithItems, setArray, setActive);
    expect(setArray).toHaveBeenLastCalledWith(resultArrayWithItemsAsc);
    console.debug(setArray)
});

it('Тест сортировки пустого массива выбором', async ()=> {
  await selectionSortAsc([], setArray, setActive);
  expect(setArray).toHaveBeenCalledTimes(0);
})

it("Тест сортировки массива с одним элементом выбором", async () => {
  await selectionSortAsc(arrayWithOneItem, setArray, setActive);
  expect(setArray).toHaveBeenCalledTimes(0);
});

it("Тест сортировки заполненного массива выбором", async () => {
  await selectionSortAsc(arrayWithItems, setArray, setActive);
  expect(setArray).toHaveBeenLastCalledWith(resultArrayWithItemsAsc);
});
})

describe('Тестирование алгоритмов сортировки выбором и пузырьком по убыванию', () => {
  it('Тест сортировки пустого массива пузырьком', async ()=> {
    await bubbleSortDesc([], setArray, setActive);
    expect(setArray).toHaveBeenCalledTimes(0);
  })

  it("Тест сортировки массива с одним элементом пузырьком", async () => {
    await bubbleSortDesc(arrayWithOneItem, setArray, setActive);
    expect(setArray).toHaveBeenCalledTimes(0);
});

it("Тест сортировки заполненного массива пузырьком", async () => {
    await bubbleSortDesc(arrayWithItems, setArray, setActive);
    expect(setArray).toHaveBeenLastCalledWith(resultArrayWithItemsDesc);
    console.debug(setArray)
});

it('Тест сортировки пустого массива выбором', async ()=> {
  await selectionSortDesc([], setArray, setActive);
  expect(setArray).toHaveBeenCalledTimes(0);
})

it("Тест сортировки массива с одним элементом выбором", async () => {
  await selectionSortDesc(arrayWithOneItem, setArray, setActive);
  expect(setArray).toHaveBeenCalledTimes(0);
});

it("Тест сортировки заполненного массива выбором", async () => {
  await selectionSortDesc(arrayWithItems, setArray, setActive);
  expect(setArray).toHaveBeenLastCalledWith(resultArrayWithItemsDesc);
});
})