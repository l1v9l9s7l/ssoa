import React, {ChangeEvent, useEffect, useState} from "react";
import {SolutionLayout} from "../ui/solution-layout/solution-layout";
import {RadioInput} from "../ui/radio-input/radio-input";
import styles from "./sorting-page.module.css";
import {Button} from "../ui/button/button";
import {Column} from "../ui/column/column";
import {randomArray} from "../../utils/randomArray";
import {selectionSortAsc, selectionSortDesc} from "./selection-sort";
import {SortName, TArrayItem} from "../../types/types";
import {Direction} from "../../types/direction";
import {bubbleSortAsc, bubbleSortDesc} from "./bubble-sort";

export const SortingPage: React.FC = () => {
    const [initArray, setInitArray] = useState<TArrayItem[]>([]);
    const [isActive, setActive] = useState(false);
    const [radioBtnValue, setRadioBtnValue] = useState<string>(SortName.select);
    const [sort, setSort] = useState<Direction>();
    useEffect(() => {
        setInitArray(randomArray());
    }, []);

    const getRandomArray = () => {
        setInitArray(randomArray());
    }

    const handleRadioBtnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRadioBtnValue(e.target.value);
    }

    const handleSortBtnClick = (value: Direction) => {
        setSort(value);
        if (radioBtnValue === SortName.select && value === Direction.Ascending) {
            return selectionSortAsc(initArray, setInitArray, setActive);
        }
        if (radioBtnValue === SortName.select && value === Direction.Descending) {
            return selectionSortDesc(initArray, setInitArray, setActive);
        }
        if (radioBtnValue === SortName.bubble && value === Direction.Ascending) {
            return bubbleSortAsc(initArray, setInitArray, setActive);
        }
        if (radioBtnValue === SortName.bubble && value === Direction.Descending) {
           return  bubbleSortDesc(initArray, setInitArray, setActive);
        }
    }

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.contorls}>
        <div className={styles.radioButtonContainer}>
          <RadioInput
            extraClass={styles.radioButton}
            label='Выбор'
            name="sort-type"
            value={SortName.select}
            onChange={handleRadioBtnChange}
            checked={radioBtnValue === SortName.select}
          />
          <RadioInput
            extraClass={styles.radioButton}
            label='Пузырёк' name="sort-type"
            value={SortName.bubble}
            onChange={handleRadioBtnChange}
            checked={radioBtnValue === SortName.bubble}/>
        </div>
        <Button
          isLoader={sort === Direction.Ascending && isActive}
          extraClass={styles.sortButtonAsc}
          text='По возрастанию'
          sorting={Direction.Ascending}
          onClick={() => handleSortBtnClick(Direction.Ascending)}
        />
        <Button
          isLoader={sort === Direction.Descending && isActive}
          extraClass={styles.sortButtonDesc}
          text='По убыванию'
          sorting={Direction.Descending}
          onClick={() => handleSortBtnClick(Direction.Descending)}
        />
        <Button
          disabled={isActive}
          text='Новый массив'
          onClick={getRandomArray}
        />
      </div>
      <div className={styles.elementsContainer}>
        {initArray?.map((element, index) => (
          <Column
            key={index}
            index={element.item}
            state={element.state}
          />
        ))}
      </div>
    </SolutionLayout>
  );
};
