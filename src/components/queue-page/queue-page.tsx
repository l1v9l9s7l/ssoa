import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './queue-page.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { SyntheticEvent } from "react";
import { useState } from "react";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/delay";


export const QueuePage: React.FC = () => {
  let [inputState, setInputState] = useState<number>(0);
  let [isLoading, setIsLoading] = useState(false);

  let items: [] = []
  let count = 0;
  //Индекс удаляемого элемента, увеличивается каждый раз при удалении
  // const  [count, setCount] = useState(0)
  const [deleteCount, setDeleteCount] = useState(0)
  //Очередь (массив объектов)
  const [queue, setQueue] = useState<any>(items);
  const [highlightedItem, setHighlightedItem] = useState<number | null>(null);
  const [headElement, setHeadElement] = useState<any>(null)
  const [tailElement, setTailElement] = useState<any>(null)

  const enqueue = (item: number) => {
    setIsLoading(true)

    if(headElement == null){
      setHeadElement(0)
    }

    count = queue.length;
    setQueue((prevQueue: []) => [...prevQueue, {item: item, index: count}]);
    setHighlightedItem(count);
    setTailElement(count)
    if(tailElement == null){
      setHeadElement(count)
    }
    setTimeout(() => {
      setHighlightedItem(null);
      setIsLoading(false)
    }, 1000);
  };

  async function dequeue(){
    setIsLoading(true)
    if(headElement >= 0 && headElement < queue.length){
      console.log(headElement)
      console.log(tailElement)
      setHighlightedItem(headElement);
      await delay(500)
      setTimeout(() => {
        setHighlightedItem(null);
      }, 0);
      setHeadElement(headElement + 1)
    }
    // console.log(headElement + 1)
    let newQueue = [...queue]
    if(newQueue[deleteCount]){
      newQueue[deleteCount] = null;
    if(deleteCount < 6){
      setDeleteCount(deleteCount + 1)
    }
    setQueue(newQueue)
    setTimeout(() => {
      setIsLoading(false)
      setHighlightedItem(null);
    }, 1000);
    }
    if(headElement == tailElement){
      setHeadElement(null)
      setTailElement(null)
    }
  };

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(Number(e.target.value))
  }

  function onAddButton(event: SyntheticEvent){
    event.preventDefault();
    enqueue(inputState) 

  }
  async function onDeleteButton(event: SyntheticEvent){
    event.preventDefault();
    dequeue()

  }
  function onWipeButton(event: SyntheticEvent){
    event.preventDefault();
    setDeleteCount(0)
    setQueue([])
    setHeadElement(null)
    setTailElement(null)
  }

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.commonWraper}>
      <div className={styles.wraper}>
        <div className={styles.input}>
          <Input onChange={changeInput} value={inputState} id='recursionInput' maxLength={4} />
        </div>
        <Button type="submit" onClick={onAddButton} extraClass = {styles.activateButton} text="Добавить" isLoader={isLoading}/>
        <Button  type="submit" onClick={onDeleteButton} extraClass = {styles.activateButton} text="Удалить" isLoader={isLoading}/>
        <Button  type="submit" onClick={onWipeButton} extraClass = {styles.wipeButton} text="Очистить" />
      </div>
      <p className={styles.textWraper}>Максимум — 4 символа</p>
      <div className={styles.circlesWraper}>
        <Circle index={0} letter={queue[0]? queue[0].item : ''} state={highlightedItem == 0? ElementStates.Changing : ElementStates.Default} head={headElement == 0? 'head' : ''} tail={tailElement == 0? 'tail' : ''}/>
        <Circle index={1} letter={queue[1]? queue[1].item : ''} state={highlightedItem == 1? ElementStates.Changing : ElementStates.Default} head={headElement == 1? 'head' : ''} tail={tailElement == 1? 'tail' : ''}/>
        <Circle index={2} letter={queue[2]? queue[2].item : ''} state={highlightedItem == 2? ElementStates.Changing : ElementStates.Default} head={headElement == 2? 'head' : ''} tail={tailElement == 2? 'tail' : ''}/>
        <Circle index={3} letter={queue[3]? queue[3].item : ''} state={highlightedItem == 3? ElementStates.Changing : ElementStates.Default} head={headElement == 3? 'head' : ''} tail={tailElement == 3? 'tail' : ''}/>
        <Circle index={4} letter={queue[4]? queue[4].item : ''} state={highlightedItem == 4? ElementStates.Changing : ElementStates.Default} head={headElement == 4 && deleteCount != 5? 'head' : ''} tail={tailElement == 4? 'tail' : ''}/>
        <Circle index={5} letter={queue[5]? queue[5].item : ''} state={highlightedItem == 5? ElementStates.Changing : ElementStates.Default} head={headElement == 5? 'head' : ''} tail={tailElement == 5? 'tail' : ''}/>
        <Circle index={6} letter={queue[6]? queue[6].item : ''} state={highlightedItem == 6? ElementStates.Changing : ElementStates.Default} head={headElement == 6? 'head' : ''} tail={tailElement == 6? 'tail' : ''}/>
      </div>
      </div>
    </SolutionLayout>
  );
};
