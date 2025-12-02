import {readInputFile} from "../utils/readFile";

const arrayOfDigitsFirstStage: string[] = [];
const arrayOfDigitsSecondStage: string[] = [];

const valueObjectOne = readInputFile('02/input.txt').split(',').reduce((acc, curr) => {
  const [key, value] = curr.split('-')
  return [ ...acc, [+key, +value] ];
}, [] as number[][]);

const countAndCheckByTwo = (from: number, to: number) => {
  for (let i = from; i <= to; i++) {
    const numToTraverseString = i.toString();
    const mid = numToTraverseString.length / 2;
    const firstHalf = numToTraverseString.substring(0, mid);
    const secondHalf = numToTraverseString.substring(mid);
    if (firstHalf === secondHalf && firstHalf[0] !== '0' && secondHalf[0] !== '0') {
      arrayOfDigitsFirstStage.push(i.toString());
    }
  }
}

const countAndCheckByMany = (from: number, to: number) => {
  for (let i = from; i <= to; i++) {
    const numToTraverseString = i.toString();
    const mid = numToTraverseString.length / 2;
    for (let j = mid; j >= 1; j--) {
      const checkedString = numToTraverseString.substring(0, j);
      const restOfString = numToTraverseString.replaceAll(`${checkedString}`, '');

      if (restOfString.length === 0 && checkedString !== '0') {
        arrayOfDigitsSecondStage.push(i.toString());
        j = 0;
      }
    }

  }
}

valueObjectOne.forEach(([from, to]) => {
  countAndCheckByTwo(from, to);
})
valueObjectOne.forEach(([from, to]) => {
  countAndCheckByMany(from, to);
})

const passwordFirstStage = arrayOfDigitsFirstStage.reduce((acc, curr) => acc + +curr, 0);
console.log('Final password first stage sum is:', passwordFirstStage);
const passwordSecondStage = arrayOfDigitsSecondStage.reduce((acc, curr) => acc + +curr, 0);
console.log('Final password first stage sum is:', passwordSecondStage);