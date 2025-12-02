import * as fs from 'fs';

export function readInputFile(pathToFile: string): string {
  try {
    return  fs.readFileSync(pathToFile, 'utf-8');
  } catch (error) {
    console.error('Error reading file:', error);
    return '';
  }
}