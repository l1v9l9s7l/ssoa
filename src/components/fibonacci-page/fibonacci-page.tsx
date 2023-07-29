import React from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import styles from './fibonacci-page.module.css'
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { useState, useEffect } from "react";
import { Circle } from "../ui/circle/circle";
import { SyntheticEvent } from "react";
import { delay } from "../../utils/delay";


export const FibonacciPage: React.FC = () => {
  const [inputState, setInputState] = useState<number>(0);
  const [circleSymbolsState, setCircleSymbolsState] = useState<JSX.Element[]>();
  const [fibState, setFibState] = useState<string[]>()
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setButtonDisabled] = useState(false)

  const fibonachi: (n: number) => number = (n: number) => {
    if (n === 1 || n === 2) {
    return 1
  }
    return fibonachi(n-1) + fibonachi(n-2)
  }

  const fibonachiRow: (n: number) => void = (n: number) => {
    const fibArr = [];
    for(let i= 1; i < n + 1; i++){
      fibArr.push(fibonachi(i).toString())
      setFibState(fibArr)
    }
  }

  const changeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState(Number(e.target.value))
  }

  async function onSubmit(event: SyntheticEvent){
    event.preventDefault();
    fibonachiRow(inputState / 1)
  }

  useEffect(() => {
    async function renderSymbols(){
      setCircleSymbolsState([])
      let newFibState = []
      if(fibState){
        for(let i = 0; i < fibState.length; i++){
          setIsLoading(true)
          await delay(1000);
          newFibState.push(<Circle letter={fibState[i]} key={i} />)
          setCircleSymbolsState(newFibState)
          if(i + 1 === fibState.length){
            setIsLoading(false)
          }
        }
      }
    }
    renderSymbols()
    renderSymbols()

  }, [fibState])

  useEffect(() => {
    if(inputState > 19){
      setButtonDisabled(true)
    }
    if(inputState < 19){
      setButtonDisabled(false)
    }
  }, [inputState])

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <div className={styles.commonWraper}>
      <div className={styles.wraper}>
        <Input onChange={changeInput} value={inputState} id='recursionInput' maxLength={2} type="number"/>
        <Button isLoader= {isLoading} type="submit" onClick={onSubmit} extraClass = {styles.activateButton} text="Развернуть" disabled={isButtonDisabled} />
      </div>
      <p className={styles.textWraper}>Максимальное число - 19</p>
      <div className={styles.circlesWraper}>
      {circleSymbolsState}
      </div>
      </div>
    </SolutionLayout>
  );
};
