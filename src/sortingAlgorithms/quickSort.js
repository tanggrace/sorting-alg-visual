export function getQuickSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) return array;
    quickSortHelper(array, 0, array.length - 1, animations);
    return animations;
}

function quickSortHelper(array, start, end, animations) {
    // Base case
    if (start >= end) return;

    const partitionIndex = partition(array, start, end, animations);
    quickSortHelper(array, start, partitionIndex - 1, animations);
    quickSortHelper(array, partitionIndex, end, animations);
}

function partition(array, start, end, animations) {
    const pivot = array[end]; // selecting last element as pivot
    let partitionIndex = start;
    for (let i = start; i < end; i++) {
        // If the current element is smaller than or equal to pivot
        // move current element to smaller side of partition
        if (array[i] <= pivot) {
            swap(array, i, partitionIndex);
            animations.push([i, partitionIndex]);
            animations.push([i, partitionIndex]);
            animations.push([i, partitionIndex]);
            partitionIndex++;
        }
    }
    // move pivot to correct index position
    swap(array, partitionIndex, end);
    animations.push([partitionIndex, end]);
    return partitionIndex;
}

function swap(array, firstIndex, secondIndex){
    const temp = array[firstIndex];
    array[firstIndex] = array[secondIndex];
    array[secondIndex] = temp;
}
