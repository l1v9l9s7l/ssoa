import React, { FormEvent, SyntheticEvent, useEffect, useState } from "react";
import { ElementStates } from "../../types/element-states";
import Stack from "../../utils/stack";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { Input } from "../ui/input/input";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";

import styles from './stack-page.module.css';

const stack = new Stack<string>();

export const StackPage: React.FC = () => {

  const [isLoading, setLoading] = useState<boolean>(false);
  const [inputState, setInputState] = useState<string>('');

  const changeInput = (event: FormEvent<HTMLInputElement>) => {
    setInputState(event.currentTarget.value);
  }

  const onAddButton = (event: SyntheticEvent) => {
    event.preventDefault();
    stack.push(inputState);
    setLoading(true);
  }

  const onDeleteButton = () => {
    stack.pop();
    setLoading(true);
  }

  const onWipeButton = () => {
    stack.clear();
    setLoading(true);
  }

  useEffect(() => {
    setTimeout(() => {
      if (isLoading) {
        setLoading(false);
      }
    }, 500)
  }, [isLoading])

  const isValid = inputState.length === 0;
  const stackSize = stack.getSize();

  return (
    <> 

    <SolutionLayout title="Стек">
      <div className={styles.commonWraper}>
      <div className={styles.wraper}>
        <div className={styles.input}>
          <Input disabled={isLoading} value={inputState} maxLength={4} isLimitText={true} onChange={changeInput} extraClass={styles.input} />
        </div>
        <Button data-testid='button-add' extraClass = {styles.activateButton}  disabled={isValid} isLoader={isLoading} type='submit' text='Добавить' onClick={onAddButton}/>
        <Button data-testid='button-del' extraClass = {styles.activateButton}  disabled={isValid} isLoader={isLoading} type='button' text='Удалить' onClick={onDeleteButton}/>
        <Button extraClass = {styles.wipeButton} disabled={isValid} isLoader={isLoading}  type='button'  text='Очистить'  onClick={onWipeButton} />
      </div>
      <div className={styles.circlesWraper}>
        {stack.getElements().map((num, index) => (
          <Circle key={index}  head={index === stackSize - 1 ? 'top' : ''}  state={index === stackSize - 1 && isLoading ? ElementStates.Changing : ElementStates.Default}  letter={num.toString()}  index={index}/>
        ))}
      </div>
      </div>
    </SolutionLayout>
    </>
  );
};

