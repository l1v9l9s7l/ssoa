import React from "react";
import styles from './string.module.css'
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useState} from "react";
import { Circle } from "../ui/circle/circle";
import { SyntheticEvent } from "react";
import { delay } from "../../utils/delay";



export const StringComponent: React.FC = () => {
  let [recursionInputState, setRecursionInputState] = useState('');
  let [circleSymbolsState, setCircleSymbolsState] = useState<any>();
  let [isLoading, setIsLoading] = useState(false);

  async function wordRebuild(arr: any)
  {
    const initSelect = (data: any) => {
      return data.map((item: any) => ({
          ...item,
          props: {state: 'default', letter: item.props.letter}    
      }));
    }



    let newArr = initSelect(arr.slice(''))

    for (let i = 0; i < arr.length/2; i++) {
      if(i === 0){
        setIsLoading(true)
      }
      await delay(1000);
      if(i + 1 >= arr.length/2){
        setIsLoading(false)
      }
      let tmp = newArr[i];
      newArr[i].props.state = 'changing'
      if(i > 0){
        newArr[i - 1].props.state = 'modified'
        newArr[newArr.length - i].props.state = 'modified'
      }
      newArr[i] = newArr[newArr.length- 1 -i]
      newArr[newArr.length - i - 1].props.state = 'changing'
      newArr[newArr.length - i - 1] = tmp
      if(i === Math.floor(arr.length/2)){
        newArr[Math.floor(arr.length/2)].props.state = 'modified'
      }
      if(i + 1 === arr.length/2){
        newArr[arr.length/2].props.state = 'modified'
        newArr[arr.length/2 - 1].props.state = 'modified'
      }
      setCircleSymbolsState(newArr)
  }
  }


  const changeRecursionInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecursionInputState(e.target.value)
  }

  const onSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    let circleSymbols = recursionInputState.split('').map((element,index) => {
      return (
          <Circle letter={element} key={index}/>
      );
    });
    setCircleSymbolsState(circleSymbols)
    wordRebuild(circleSymbols)
    wordRebuild(circleSymbols)
  }



  
  
  return (
    <SolutionLayout title="Строка">
      <div className={styles.commonWraper}>
      <div className={styles.wraper}>
        <Input onChange={changeRecursionInput} value={recursionInputState} id='recursionInput' maxLength={11} />
        <Button isLoader={isLoading} type="submit" onClick={onSubmit} extraClass = {styles.activateButton} text="Развернуть" />
      </div>
      <p className={styles.textWraper}>Максимум — 11 символов</p>
      </div>
      <div className={styles.circlesWraper}>
        {circleSymbolsState}
      </div>
    </SolutionLayout>
  );
};
