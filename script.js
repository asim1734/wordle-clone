const inputContainer = document.querySelector("#input-container");
const inputGrid = [];

function generateGrid() {
    for (let i = 0; i < 6; i++) {
        let currentGrid = []; 
        for (let j = 0; j < 5; j++) {
            let input = document.createElement('input');
            input.type = 'text';  
            input.maxLength = 1;   
            currentGrid.push(input);  
            inputContainer.appendChild(input); 
        }
        inputGrid.push(currentGrid);  // Add the row to the main grid array
    }
}

generateGrid();