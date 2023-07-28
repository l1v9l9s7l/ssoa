import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { useState } from "react";
import { SyntheticEvent } from "react";
import styles from './stack-page.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { useEffect } from "react";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";

interface StackItem {
  value: string;
  isHighlighted: boolean;
  isTop: boolean;
}

export const StackPage: React.FC = () => {
  const [stack, setStack] = useState<StackItem[]>([]);
  let [inputState, setInputState] = useState<string>('0');
  let [isLoading, setIsLoading] = useState(false);

  const highlightLastItem = () => {
    setStack((prevStack) => {
      if (prevStack.length > 0) {
        setIsLoading(true)
        const updatedStack = [...prevStack];
        updatedStack[prevStack.length - 1].isHighlighted = true;
        if(prevStack.length > 1){
          updatedStack[prevStack.length - 2].isTop = false;
        }
        return updatedStack;
      } else {
        return prevStack;
      }
    });


    setTimeout(() => {
      setIsLoading(false)
      setStack((prevStack) => {
        if (prevStack.length > 0) {
          const updatedStack = [...prevStack];
          updatedStack[prevStack.length - 1].isHighlighted = false;
          return updatedStack;
        } else {
          return prevStack;
        }
      });
    }, 500);
  };

  const push = () => {
    const newItem: StackItem = {
      value: inputState,
      isHighlighted: false,
      isTop: true,
    };

    setStack([...stack, newItem]);
    highlightLastItem()
  };

    function pop(){
    highlightLastItem()
    setStack((prevStack) => {
      if (prevStack.length > 0) {
        const updatedStack = [...prevStack];
        if(prevStack.length > 1){
          updatedStack[prevStack.length - 2].isTop = true;
        }
        updatedStack.pop();
        return updatedStack;
      } else {
        return prevStack;
      }
    });
  };

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(e.target.value)
  }

  function onAddButton(event: SyntheticEvent){
    event.preventDefault();
    push()
  }
  async function onDeleteButton(event: SyntheticEvent){
    event.preventDefault();
    highlightLastItem()
    await delay(500)
    pop()
  }
  function onWipeButton(event: SyntheticEvent){
    event.preventDefault();
    setStack([])
  }

  

  return (
    <SolutionLayout title="Стек">
      <div className={styles.commonWraper}>
      <div className={styles.wraper}>
        <div className={styles.input}>
          <Input onChange={changeInput} value={inputState} id='recursionInput' maxLength={4} extraClass={styles.input} />
        </div>
        <Button type="submit" onClick={onAddButton} extraClass = {styles.activateButton} text="Добавить" isLoader={isLoading} />
        <Button  type="submit" onClick={onDeleteButton} extraClass = {styles.activateButton} text="Удалить" isLoader={isLoading} />
        <Button  type="submit" onClick={onWipeButton} extraClass = {styles.wipeButton} text="Очистить" />
      </div>
      <p className={styles.textWraper}>Максимум - 4 символа</p>
      <div className={styles.circlesWraper}>
      {stack.map((item, index, head) => (
          <Circle letter={item.value} index={index} head={item.isTop? 'top' : ''} state={item.isHighlighted ? ElementStates.Changing : ElementStates.Default} key={index}/>
        ))}
      </div>
      </div>
    </SolutionLayout>
  );
};
