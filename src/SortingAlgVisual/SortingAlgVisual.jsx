import React, { Component } from 'react';
import { getMergeSortAnimations } from "../sortingAlgorithms/mergeSort";
import { getQuickSortAnimations } from "../sortingAlgorithms/quickSort";
import './SortingAlgVisual.css';

const ANIMATION_SPEED = 200;  // milliseconds (ms)

const NUM_OF_ARRAY_BARS = 10;

export default class SortingAlgVisual extends Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }
    
    resetArray() {
        const array = [];
        for (let i = 0; i < NUM_OF_ARRAY_BARS; i++) {
            array.push(getRandomInt(5, 500));
        }
        this.setState({ array });
    };

    insertionSort() {}

    selectionSort() {}

    bubbleSort() {}

    quickSort() {
        const animations = getQuickSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [bar1, bar2] = animations[i];
            const bar1Style = arrayBars[bar1].style;
            const bar2Style = arrayBars[bar2].style;
            if (i % 3 !== 1) {
                const color = i % 3 === 0 ? 'lightCoral' : 'lightSkyBlue';
                setTimeout(() => {
                    bar1Style.backgroundColor = color;
                    bar2Style.backgroundColor = color;
                }, i * ANIMATION_SPEED);
            } else {
                setTimeout(() => {
                    const tempHeight = bar1Style.height;
                    bar1Style.height = bar2Style.height;
                    bar2Style.height = tempHeight;
                }, i * ANIMATION_SPEED);
            }
        }
    }

    mergeSort() {
        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            if (i % 3 !== 2) {
                // Compare animation
                const [bar1, bar2] = animations[i];
                const bar1Style = arrayBars[bar1].style;
                const bar2Style = arrayBars[bar2].style;
                const color = i % 3 === 0 ? 'lightCoral' : 'lightSkyBlue';
                setTimeout(() => {
                    bar1Style.backgroundColor = color;
                    bar2Style.backgroundColor = color;
                }, i * ANIMATION_SPEED);
            } else {
                const [bar, newHeight] = animations[i];
                const barStyle = arrayBars[bar].style;
                setTimeout(() => {
                    barStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED);
            }
        }
    }

    heapSort() {}

    testSortingAlgorithms() {
        for (let i = 0; i < 100; i++) {
            const array = [];
            const len = getRandomInt(1, 1000);
            for (let j = 0; j < len; j++) {
                array.push(getRandomInt(-1000, 1000));
            }
            const jsSortedArray = array.slice().sort((a, b) => a - b);
            const sortedArray = getQuickSortAnimations(array);
            console.log(arraysEqual(jsSortedArray, sortedArray));
        }
    }
    
    render() {
        return (
            <div>
                <h1>Sorting Algorithm Visualization</h1>
                <button onClick={() => this.resetArray()}>Generate New Array</button>
                <button onClick={() => this.insertionSort()}>Insertion Sort</button>
                <button onClick={() => this.selectionSort()}>Selection Sort</button>
                <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                <button onClick={() => this.quickSort()}>Quick Sort</button>
                <button onClick={() => this.mergeSort()}>Merge Sort</button>
                <button onClick={() => this.heapSort()}>Heap Sort</button>
                <button onClick={() => this.testSortingAlgorithms()}>Test SortingAlgorithms</button>
            <div className="array-container">
                {this.state.array.map((num, index) => (
                    <div 
                        className="array-bar"
                        key={index}
                        style={{
                            backgroundColor: 'lightSkyBlue',
                            height:`${num}px`,
                        }}>
                    </div>
                ))}
            </div>
            </div>
        );
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function arraysEqual(array1, array2) {
    if (array1.length !== array2.length) return false;

    for (let i = 0; i < array1.length; i++) {
        if (array1[i] !== array2[i]) return false;
    }
    return true;
}
