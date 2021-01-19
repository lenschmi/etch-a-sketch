
const container = document.querySelector("#container");

//Define UI look
const width = 960;
const height = 540;
const defaultBackground = "rgb(212, 226, 240)";



//Define grids
function gridDef(rows, columns){
    this.rows = rows;
    this.columns = columns;
    this.boxSize = function(){
        return width/columns;
    }
    this.numDivs = function(){
        return rows*columns;
    }
}
const smallGrid = new gridDef(36, 64);
const medGrid = new gridDef(27, 48);
const largeGrid = new gridDef(18, 32);
let currGrid = largeGrid;

function onHover(e){
    const div = e.target;
    div.style.background = "black";
}

function initGrid(){
    makeDivs(largeGrid.rows*largeGrid.columns);
    container.style.height = height;
    container.style.width = width;
    container.style.gridTemplateRows = `repeat(${largeGrid.rows}, ${largeGrid.boxSize()}px)`;
    container.style.gridTemplateColumns = `repeat(${largeGrid.columns}, ${largeGrid.boxSize()}px)`;
}

function makeDivs(newDivs){
    for(let i=0; i<newDivs;i++){
        const div = document.createElement("div");
        div.style.backgroundColor = defaultBackground;
        div.classList.add("grid-square");
        div.addEventListener("mouseover", onHover);
        container.appendChild(div);
    }
}

function deleteDivs(delDivs){
    for(let i=0; i<delDivs; i++){
        const div = container.querySelector(`.grid-square`);
        container.removeChild(div);
    }
}

function clearGrid(){
    //Clear any filled in squares
    const squares = document.querySelectorAll(".grid-square");
    squares.forEach(square => square.style.backgroundColor = defaultBackground);
}

function resizeGrid(grid)
{
    let oldNumDivs = currGrid.numDivs();
    let newNumDivs = grid.numDivs();
    if (oldNumDivs > newNumDivs){
        let delDivs = oldNumDivs - newNumDivs;
        deleteDivs(delDivs);
    } else if(newNumDivs > oldNumDivs){
        let newDivs = newNumDivs - oldNumDivs;
        makeDivs(newDivs);
    }
    //Re-define the number of columns and rows in the grid
    container.style.gridTemplateRows = `repeat(${grid.rows}, ${grid.boxSize()}px)`;
    container.style.gridTemplateColumns = `repeat(${grid.columns}, ${grid.boxSize()}px)`;
    currGrid = grid;
    clearGrid();
}

initGrid();
//Set up event listeners for the grid buttons
const smallButton = document.querySelector("button#small");
smallButton.addEventListener("click", function(e){
    resizeGrid(smallGrid);
});
const medButton = document.querySelector("button#med");
medButton.addEventListener("click", function(e){
    resizeGrid(medGrid);
});
const largeButton = document.querySelector("button#large");
largeButton.addEventListener("click", function(e){
    resizeGrid(largeGrid);
});
//Set up event listeners for color scheme
const classicButton = document.querySelector("button#classic");
classicButton.addEventListener("click", function(e){
    
});
const rainbowButton = document.querySelector("button#rainbow");
rainbowButton.addEventListener("click", function(e){
    
});
const customButton = document.querySelector("button#custom");
customButton.addEventListener("click", function(e){
    
});

//Set up event listener for clear button
const clearButton = document.querySelector("button#clear");
clearButton.addEventListener("click", function(e){
    clearGrid();
});

