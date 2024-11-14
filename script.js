const inputGrid = [];
var curRow = 0;
var rowIndex = 0;
var answerWord = ""

function init() {
    answerWord = getAnswerWord();

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
            curUserWord = getInputWord();
            validateRow(curUserWord);
            curRow++;
            rowIndex = 0;
            if (curRow < 6) { 
                inputGrid[curRow][0].focus();
            }
        } else if (e.key === 'Backspace') {
            handleBackspace();
        }
    });
}

function generateGrid() {
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
}

function inputValidation(input) {
    const regex = /^[a-zA-Z]$/;
    if (regex.test(input.value)) {
        input.value = input.value.toUpperCase();
        moveToNextInput();  
    } else {
        input.value = ""; 
    }
}

function getInputWord() {
    var curUserWord = "";
    inputGrid[curRow].forEach(letter => {
        curUserWord += letter.value;
    });
    return curUserWord;
}

function moveToNextInput() {
    if (rowIndex < 4) {
        rowIndex++;
        inputGrid[curRow][rowIndex].focus();
    }
}

function handleBackspace() {
    if (rowIndex > 0) {
        inputGrid[curRow][rowIndex].value = "";
        rowIndex--;
        inputGrid[curRow][rowIndex].focus();
        inputGrid[curRow][rowIndex].value = "";
    } else if (rowIndex === 0) {
        inputGrid[curRow][rowIndex].value = "";
    }
}

function getAnswerWord(){
    return "apple".toUpperCase();
}

function validateRow(userWord){
    inputs = inputGrid[curRow]
    for( var i = 0 ; i < 5 ; i++){
        if (userWord[i] == answerWord[i]){
            inputs[i].classList.add("correct")
        }
        else if(answerWord.includes(userWord[i])){
            inputs[i].classList.add("wrong")
        }
        else{
            inputs[i].classList.add("incorrect")
        }
    }
}

init();
