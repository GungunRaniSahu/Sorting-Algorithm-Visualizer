const array = [];
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function generateArray(size = 20) {
    array.length = 0;
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1);
    }
    drawArray();
}

function drawArray() {
    const container = document.getElementById("array-container");
    container.innerHTML = "";
    array.forEach((value) => {
        const bar = document.createElement("div");
        bar.style.height = `${value * 3}px`;
        bar.classList.add("bar");
        container.appendChild(bar);
    });
}

async function bubbleSort() {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
                drawArray();
                await delay(100);
            }
        }
    }
}

async function selectionSort() {
    for (let i = 0; i < array.length; i++) {
        let minIndex = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
        }
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
        drawArray();
        await delay(100);
    }
}

async function insertionSort() {
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;
        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            j--;
            drawArray();
            await delay(100);
        }
        array[j + 1] = key;
        drawArray();
    }
}

async function quickSort(left = 0, right = array.length - 1) {
    if (left >= right) return;
    let pivot = array[right], partitionIndex = left;
    for (let i = left; i < right; i++) {
        if (array[i] < pivot) {
            [array[i], array[partitionIndex]] = [array[partitionIndex], array[i]];
            partitionIndex++;
        }
    }
    [array[partitionIndex], array[right]] = [array[right], array[partitionIndex]];
    drawArray();
    await delay(100);
    await quickSort(left, partitionIndex - 1);
    await quickSort(partitionIndex + 1, right);
}

document.addEventListener("DOMContentLoaded", () => {
    generateArray();
    document.getElementById("sort-button").addEventListener("click", bubbleSort);
    document.getElementById("selection-button").addEventListener("click", selectionSort);
    document.getElementById("insertion-button").addEventListener("click", insertionSort);
    document.getElementById("quick-button").addEventListener("click", () => quickSort());
    document.getElementById("reset-button").addEventListener("click", () => generateArray());
});
