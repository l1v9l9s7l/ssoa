import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './queue-page.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SyntheticEvent } from "react";
import { useState } from "react";
import { ElementStates } from "../../types/element-states";
import Queue from "../../utils/queue";

import { FormEvent,  useEffect } from "react";

const queue = new Queue<string>(6);

export const QueuePage: React.FC = () => {

  const [isLoading, setLoading] = useState<boolean>(false);
  const [inputState, setInputState] = useState<string>('');
  const [action, setAction] = useState<string>('');

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    setInputState(event.currentTarget.value);
  }

  const onAddButton = (event: SyntheticEvent) => {
    event.preventDefault();
    queue.enqueue(inputState);
    setAction('add');
    setLoading(true);
  }

  const onDeleteButton = () => {
    queue.dequeue();
    setAction('remove');
    setLoading(true);
  }

  const onWipeButton = () => {
    queue.clean();
    setLoading(true);
  }

  useEffect(() => {
    setTimeout(() => {
      if (isLoading) {
        setAction('');
        setLoading(false);
      }
    }, 500)
  }, [isLoading])

  const renderQueue = () => {
    let components = [];
    const array = queue.getElements();
    const size = queue.getSize();
    const tail = queue.getTail() === 0 ? 0 : queue.getTail() - 1;
    const head = queue.getHead();
    let actionIndex = size + 1;

    actionIndex = action === 'add' ? tail : head;
    const tailPending = isLoading && action === 'add' ? tail - 1 : tail;

    for (let index = 0; index < size; index++) {
      const element = array[index];
      components.push(
        <Circle
          key={index}
          head={index === head ? 'head' : ''}
          tail={index === tailPending ? 'tail' : ''}
          state={index === actionIndex && isLoading ? ElementStates.Changing : ElementStates.Default}
          letter={index === actionIndex && isLoading && action === 'add' ? '' : (element ? element : '')}
          index={index}
          extraClass={styles.Number}
        />
      )

    }

    return components;
  }

  const isValid = inputState.length === 0;

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.wraper}>
        <Input  disabled={isLoading}  extraClass={styles.input}  value={inputState}  maxLength={4}  isLimitText={true}  onChange={handleInputChange} />
        <Button  extraClass={styles.activateButton}  disabled={isValid || queue.getSize() === queue.getTail()}  isLoader={isLoading}  type='submit'  text='Добавить'  onClick={onAddButton}/>
        <Button  extraClass={styles.activateButton}  disabled={isValid || queue.getSize() === queue.getHead()}  isLoader={isLoading}  type='button'  text='Удалить'  onClick={onDeleteButton}  />
        <Button  extraClass={styles.wipeButton}  isLoader={isLoading}  type='button'  text='Очистить'  onClick={onWipeButton}/>
      </form>
      <div className={styles.circlesWraper}>
        {renderQueue()}
      </div>
    </SolutionLayout>
  );
};