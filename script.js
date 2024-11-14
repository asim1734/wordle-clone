const inputGrid = [];
var curRow = 0;

function init(){
    generateGrid();

    document.querySelector("#input-container").addEventListener('input', (event) =>{
        console.log(event.target);
        inputValidation(event.target);
    });
    
    document.addEventListener('keydown', (e) =>{
        if (e.key === 'Enter' && inputGrid[curRow][4].value){
            curUserWord = getInputWord();
            curRow++;
        }
    })
}

function generateGrid() {
    const inputContainer = document.querySelector("#input-container");
    for (let i = 0; i < 6; i++) {
        let currentGrid = []; 
        for (let j = 0; j < 5; j++) {
            let input = document.createElement('input');
            input.type = 'text';  
            input.maxLength = 1;   
            currentGrid.push(input);  
            inputContainer.appendChild(input); 
        }
        inputGrid.push(currentGrid);
    }
}

function inputValidation(input){
    const regex = /^[a-zA-Z]$/;
    if (regex.test(input.value)){
        input.value = input.value.toUpperCase();
    }
    else{
        input.value = "";
    }
}

function getInputWord(){
    var curUserWord = ""
    inputGrid[curRow].forEach(letter => {
        curUserWord += letter.value;
    });
    return curUserWord;
}

init()
