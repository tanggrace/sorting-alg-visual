export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    // Use auxiliary array for more optimal Merge Sort implementation
    const auxiliaryArray = array.slice();
    mergeSortHelper(array, auxiliaryArray, 0, array.length - 1, animations);
    return animations;
}

function mergeSortHelper(array, auxiliaryArray, start, end, animations) {
    // Base case
    if (start === end) return;
    // Using recursion to merge sort each half of auxiliaryArray
    const middle = Math.floor((start + end) / 2);
    mergeSortHelper(auxiliaryArray, array, start, middle, animations);
    mergeSortHelper(auxiliaryArray, array, middle + 1, end, animations);
    // Merge the sorted halves of auxiliaryArray into array
    merge(array, auxiliaryArray, start, middle, end, animations);
}

function merge(array, auxiliaryArray, start, middle, end, animations) {
    // Write values into array in order from each half of auxiliaryArray
    let k = start, i = start, j = middle + 1;
    while (i <= middle && j <= end) {
        animations.push([i, j]);
        animations.push([i, j]);
        if (auxiliaryArray[i] <= auxiliaryArray[j]) {
            animations.push([k, auxiliaryArray[i]]);
            array[k++] = auxiliaryArray[i++];
        } else {
            animations.push([k, auxiliaryArray[j]]);
            array[k++] = auxiliaryArray[j++];
        }
    }
    // Remaining elements in either half of auxiliaryArray
    while (i <= middle) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxiliaryArray[i]]);
        array[k++] = auxiliaryArray[i++];
    }
    while (j <= end) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxiliaryArray[i]]);
        array[k++] = auxiliaryArray[j++];
    }
}
