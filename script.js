import { validWords, allWords } from './validWords.js';

const inputGrid = [];
var curRow = 0;
var rowIndex = 0;
var answerWord = "";
var GameWon = false;

function init() {
    console.log("init() called");
    answerWord = getAnswerWord();
    console.log("Answer word:", answerWord);

    generateGrid();

    inputGrid[0][0].focus();
    document.querySelector("#input-container").addEventListener('input', (event) => {
        inputValidation(event.target);
    });

    document.querySelector("#input-container").addEventListener('mousedown', (event) => {
        if (event.target.tagName === 'INPUT') {
            event.preventDefault(); 
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && inputGrid[curRow][4].value) {
            console.log("Enter key pressed");
            let curUserWord = getInputWord();
            console.log("Current user word:", curUserWord);
            var correctCount = validateRow(curUserWord);
            if (correctCount == 5){
                console.log("game won");
                inputGrid[curRow][rowIndex].blur();
                GameWon = true;
            }
            curRow++;
            rowIndex = 0;
            if (curRow < 6 && !GameWon) { 
                inputGrid[curRow][0].focus();
            }
        } else if (e.key === 'Backspace') {
            console.log("Backspace key pressed");
            handleBackspace();
        }
    });
}

function generateGrid() {
    console.log("generateGrid() called");
    const inputContainer = document.querySelector("#input-container");
    for (let i = 0; i < 6; i++) {
        let currentGrid = [];
        for (let j = 0; j < 5; j++) {
            let input = document.createElement('input');
            input.type = 'text';
            input.maxLength = 1;
            input.tabIndex = -1;
            currentGrid.push(input);
            inputContainer.appendChild(input);
        }
        inputGrid.push(currentGrid);
    }
    console.log("Grid generated:", inputGrid);
}

function inputValidation(input) {
    console.log("inputValidation() called for input:", input);
    const regex = /^[a-zA-Z]$/;
    if (regex.test(input.value)) {
        input.value = input.value.toUpperCase();
        moveToNextInput();  
    } else {
        input.value = ""; 
    }
}

function getInputWord() {
    console.log("getInputWord() called");
    var curUserWord = "";
    inputGrid[curRow].forEach(letter => {
        curUserWord += letter.value;
    });
    console.log("Current input word:", curUserWord);
    return curUserWord;
}

function moveToNextInput() {
    console.log("moveToNextInput() called, rowIndex:", rowIndex);
    if (rowIndex < 4) {
        rowIndex++;
        inputGrid[curRow][rowIndex].focus();
    }
}

function handleBackspace() {
    console.log("handleBackspace() called, rowIndex:", rowIndex);
    if (rowIndex > 0) {
        inputGrid[curRow][rowIndex].value = "";
        rowIndex--;
        inputGrid[curRow][rowIndex].focus();
        inputGrid[curRow][rowIndex].value = "";
    } else if (rowIndex === 0) {
        inputGrid[curRow][rowIndex].value = "";
    }
}

function getAnswerWord() {
    console.log("getAnswerWord() called");
    const answer = validWords[randomNum()].toUpperCase();
    console.log("Generated answer word:", answer);
    return answer;
}

function validateRow(userWord) {
    const inputs = inputGrid[curRow];
    let correctCount = 0;
    let tempAnswer = [...answerWord];
    
    userWord.split('').forEach((letter, i) => {
        if (letter === answerWord[i]) {
            inputs[i].classList.add('correct');
            tempAnswer[i] = '#';  
            correctCount++;
        }
    });
    
    userWord.split('').forEach((letter, i) => {
        if (letter !== answerWord[i]) {
            const inWord = tempAnswer.indexOf(letter);
            inputs[i].classList.add(inWord !== -1 ? 'wrong' : 'incorrect');
            if (inWord !== -1) tempAnswer[inWord] = '#';
        }
    });

    return correctCount;
}

function randomNum() {
    console.log("randomNum() called");
    const num = Math.floor(Math.random() * validWords.length); 
    console.log("Generated random number:", num);
    return num;
}

init();
