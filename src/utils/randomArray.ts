import {ElementStates} from "../types/element-states";
import {TArrayItem} from "../types/types";

const getRandomInt = (min: number = 3, max: number = 17) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

export const randomArray = (length: number = getRandomInt(), max: number = 100): TArrayItem[] =>
    [...Array(length)].map(() =>
        ({item: Math.floor(Math.random() * max), state: ElementStates.Default }));


