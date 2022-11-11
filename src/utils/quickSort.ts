import { ParkingLotsInfo } from '../types';

const getPivot = (array: ParkingLotsInfo[], start = 0, end = array.length - 1) => {
  const swap = (arr: any[], idx1: number, idx2: number) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  };

  const pivot = array[start].distanceFromOrigin || 1;
  let swapIdx = start;

  for (let i = start + 1; i <= end; i += 1) {
    const distance = array[i].distanceFromOrigin || Infinity;
    if (pivot > distance) {
      swapIdx += 1;
      swap(array, swapIdx, i);
    }
  }

  swap(array, start, swapIdx);

  return swapIdx;
};

const quickSort = (array: ParkingLotsInfo[], left = 0, right = array.length - 1) => {
  if (left < right) {
    const pivotIndex = getPivot(array, left, right);
    quickSort(array, left, pivotIndex - 1);
    quickSort(array, pivotIndex + 1, right);
  }

  return array;
};

export default quickSort;
