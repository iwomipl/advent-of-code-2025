import * as fs from 'fs';
type TraverseType = { endPosition: number, passingOver: number };
const startPosition = 50;

function readInputFile(): string[] {
  try {
    const fileContent = fs.readFileSync('01/input.txt', 'utf-8');
    return fileContent.split('\n');
  } catch (error) {
    console.error('Error reading file:', error);
    return [];
  }
}


const arrayOfValues = readInputFile();

const traverseTroughArray = (steps: string, start: number) => {
  const stepsArray = steps.replace('\r', '').split("")
  const sign = stepsArray.filter(step => step.includes('R') || step.includes('L')).join('');
  const stepsNumber = +stepsArray.filter(step => !step.includes('R') && !step.includes('L')).join('');

  const modulo = stepsNumber % 100;
  const moreThanHundredPassingOver = Math.floor(stepsNumber / 100);

  if (sign.includes('R')) {
    let endPosition = start + modulo;
    if (start + modulo > 99) {
      endPosition = start + modulo - 99 - 1
      return { endPosition,  passingOver: moreThanHundredPassingOver + (start === 0 ? 0 : 1 || endPosition === 0 ? 1 : 0)};
    }

    return { endPosition, passingOver: moreThanHundredPassingOver + (endPosition === 0 ? 1 : 0)};
  }

  if (sign.includes("L")) {
    let endPosition = start - modulo;
    if (start - modulo < 0) {
      endPosition = 100 + (start - modulo);
      return { endPosition, passingOver: moreThanHundredPassingOver + (start === 0 ? 0 : 1 || endPosition === 0 ? 1 : 0)};
    }
    return { endPosition, passingOver: moreThanHundredPassingOver + (endPosition === 0 ? 1 : 0)};
  }
};

const result = arrayOfValues.reduce((acc, curr) => {
  const { endPosition, passingOver } = traverseTroughArray(curr, acc.start) as TraverseType;
  const nextLevelResult = acc.nextLevelResult + passingOver;

  if (endPosition === 0) {
    return {result: acc.result + 1, start: endPosition, nextLevelResult };
  }
  return {result: acc.result, start: endPosition, nextLevelResult};
}, {result: 0, start: startPosition, nextLevelResult: 0});
console.log('Final Result:', result);