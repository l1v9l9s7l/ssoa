import {ElementStates} from "./element-states";

export type TArrayItem = {
  item: number,
  state: ElementStates,
}

export enum SortName {
  select = "выбор",
  bubble = "пузырек"
}