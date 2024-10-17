const board=document.querySelector(".board")
const message=document.querySelector(".message")
const resetBtn=document.querySelector("button")
let [x,y] = prompt("Enter two colors separated by commas:").split(",");;

let currPlayer=x;
// let gameBoard= Array.from({length:6}).fill(Array.from({length:7}).fill(null)) 
//NEVER DO THE ABOVE FOR EMPTY MATRIX bcoz in this method all the rows references to the same array. change in one will reflect in all the other rows
let gameBoard = Array.from({length: 6}, () => Array.from({length: 7}, () => null));
function createBoard(){
    board.addEventListener('click', handleClick);
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 7; col++) {
            let cell=document.createElement('div')
            cell.classList.add('cell')
            // cell.classList.add(`${row}`)
            // cell.classList.add(`${col}`)
            //no need as handleClick me data-row col se hi kaam ho gaya
            cell.dataset.row=row;
            cell.dataset.col=col;
            board.appendChild(cell);
        }
    }
}

function resetBoard(){
    currPlayer='red';
    gameBoard=Array.from({ length: 6 }, () => Array.from({ length: 7 }, () => null));
    board.innerHTML=''
    message.innerText=''
    createBoard();
}
function handleClick(event){
    const col=event.target.dataset.col;
    if(col===undefined) return;

    const row=findAvailableRow(parseInt(col,10)); //default radix is 10 but not for string starting with 0x or 0X (radix=8)
    if(row===-1) return;

    gameBoard[row][col]=currPlayer;
    console.log(gameBoard);
    document.querySelector(`[data-row="${row}"][data-col="${col}"]`).style.backgroundColor = currPlayer;

    if(checkWin()){
        message.innerHTML= `${currPlayer.toUpperCase()} wins!`;
        board.removeEventListener('click',handleClick);
    }
    else if(checkDraw()){
        message.innerHTML= `Its a DRAW!`;
        board.removeEventListener('click',handleClick);
    }
    else{
        currPlayer= currPlayer===x?y:x;
    }
}
function findAvailableRow(col){
    for(let row=5; row>=0; row--){
        if(gameBoard[row][col]===null) return row;
    }
    return -1;
}
function checkWin() {
    // Check rows
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            if (
                gameBoard[row][col] === currPlayer &&
                gameBoard[row][col + 1] === currPlayer &&
                gameBoard[row][col + 2] === currPlayer &&
                gameBoard[row][col + 3] === currPlayer
            ) {
                return true;
            }
        }
    }

    // Check columns
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 7; col++) {
            if (
                gameBoard[row][col] === currPlayer &&
                gameBoard[row + 1][col] === currPlayer &&
                gameBoard[row + 2][col] === currPlayer &&
                gameBoard[row + 3][col] === currPlayer
            ) {
                return true;
            }
        }
    }

    // Check right diagonals
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
            if (
                gameBoard[row][col] === currPlayer &&
                gameBoard[row + 1][col + 1] === currPlayer &&
                gameBoard[row + 2][col + 2] === currPlayer &&
                gameBoard[row + 3][col + 3] === currPlayer
            ) {
                return true;
            }
        }
    }
    //check left diagonals
    for (let row = 0; row < 3; row++) {
        for (let col = 3; col < 7; col++) {
            if (
                gameBoard[row][col] === currPlayer &&
                gameBoard[row + 1][col - 1] === currPlayer &&
                gameBoard[row + 2][col - 2] === currPlayer &&
                gameBoard[row + 3][col - 3] === currPlayer
            ) {
                return true;
            }
        }
    }

    return false;
}
function checkDraw(){
    return gameBoard.every(row => row.every(cell => cell!==null));
}

createBoard();
resetBtn.addEventListener('click',resetBoard);