import {combinations} from "itertools-ts/lib/combinatorics";

const availableNumbers = [1, 2, 3, 4, 5, 6, 7, 8]
const howManyUsableNumbers = 4;

export function decomposeNumberIntoValidIntegerFactors(n: number): Map<number, number> {
    const factors: Map<number, number> = new Map();
    for (let i = 1; i < Math.round(Math.sqrt(n)) + 1; i++) {
        if (n % i === 0) {
            const secondFactor = Math.floor(n / i);
            if (10 <= i && i <= 26 && 10 <= secondFactor && secondFactor <= 26) {
                factors.set(i, secondFactor);
            }
        }
    }
    return factors;
}

export function getCombinationsForAddition(sum: number) {
    const result: number[][] = []
    for (const tuple of combinations(availableNumbers, howManyUsableNumbers)) {
        if (tuple[0] + tuple[1] + tuple[2] + tuple[3] === sum) {
            result.push(tuple);
        }
    }
    return result;
}

export function getCombinationsForMultiplication(sum: number) {
    const result: number[][] = []
    for (const tuple of combinations(availableNumbers, howManyUsableNumbers)) {
        if (tuple[0] * tuple[1] * tuple[2] * tuple[3] === sum) {
            result.push(tuple);
        }
    }
    return result;
}

export function chooseRandomCombination<T>(array: T[]): T {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

