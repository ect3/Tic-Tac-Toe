document.getElementById("BackBtn").addEventListener("click", function(){
    clickAudio.play();
    window.location.href="index.html";
});
let moveAudio = new Audio("move.wav");
let winAudio = new Audio("win.wav");
let aiAudio = new Audio("aiMove.wav");
let clickAudio = new Audio("button.wav");
clickAudio.preload = 'auto';
let boxes = document.querySelectorAll(".boxa");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

let turn0 = true;

// Function to handle player's turn
const playerTurn = (box) => {
    if (turn0) {
        box.innerText = "O";
        moveAudio.play();
        turn0 = false;
        box.style.color = "blue";
        box.classList.add("pop-up");
        box.disabled = true;
        checkWinner();
        setTimeout(aiTurn, 1000);
    }
};


const aiTurn = () => {
    turn0 = true;
    if (checkWinner()) {
        return; // If game is already won, exit the function
    }
    
    const emptyBoxes = Array.from(boxes).filter(box => box.innerText === "");
    if (emptyBoxes.length === 0) {
        return; // If there are no empty boxes left, exit the function (game is a draw)
    }
    let moveFound = false;
    let selectedBox;
    for(let pattern of winPatterns){
        if(moveFound) break;
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;
        if((pos1Val == pos2Val && pos1Val == "X" && pos3Val == "") || (pos1Val == pos3Val && pos1Val == "X" && pos2Val == "") || (pos2Val == pos3Val && pos2Val == "X" && pos1Val == "")){
            if(pos1Val == "") selectedBox = boxes[pattern[0]];
            else if(pos2Val == "") selectedBox = boxes[pattern[1]];
            else if(pos3Val == "") selectedBox = boxes[pattern[2]];
            selectedBox.innerText = "X";
            selectedBox.style.color = "red";
            moveFound = true;
            break;
        }
    }
    if(!moveFound){
        for(let pattern of winPatterns){
            if(moveFound) break;
            let pos1Val = boxes[pattern[0]].innerText;
            let pos2Val = boxes[pattern[1]].innerText;
            let pos3Val = boxes[pattern[2]].innerText;
            if((pos1Val == pos2Val && pos1Val == "O" && pos3Val == "") || (pos1Val == pos3Val && pos1Val == "O" && pos2Val == "") || (pos2Val == pos3Val && pos2Val == "O" && pos1Val == "")){
                if(pos1Val == "") selectedBox = boxes[pattern[0]];
                else if(pos2Val == "") selectedBox = boxes[pattern[1]];
                else if(pos3Val == "") selectedBox = boxes[pattern[2]];
                selectedBox.innerText = "X";
                selectedBox.style.color = "red";
                moveFound = true;
                break;
            }
        }
    }
    if(!moveFound){
        const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
        selectedBox = emptyBoxes[randomIndex];
        selectedBox.innerText = "X";
        selectedBox.style.color = "red";
    }
    
    aiAudio.play();
    selectedBox.style.color = "red";
    selectedBox.classList.add("pop-up");
    selectedBox.disabled = true;
    if (checkWinner()) {
        return; // Check for winner again after AI's move
    }
    turn0 = true;
};




// Adding event listener to each box
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        playerTurn(box); // Calling playerTurn function when box is clicked
    });
});


const checkWinner = () => {
    for (let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val,pattern);
                return true;
            }
        }
    }
    return false;
};

const showWinner = (winner, pattern) => {
    msg.innerText = `${winner} Wins`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    if (winner === 'O'){
        line.style.backgroundColor = 'blue';
    } else if ( winner === 'X'){
        line.style.backgroundColor = 'red';
    }
    drawLine(boxes[pattern[0]], boxes[pattern[2]]);
    winAudio.play();
};

const drawLine = (start, end) => {
        const line = document.getElementById('line');
        const rect1 = start.getBoundingClientRect();
        const rect2 = end.getBoundingClientRect();
        const x1 = rect1.left + rect1.width / 2;
        const y1 = rect1.top + rect1.height / 2;
        const x2 = rect2.left + rect2.width / 2;
        const y2 = rect2.top + rect2.height / 2;
        const dx = x2 - x1;
        const dy = y2 - y1;
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        const length = Math.sqrt(dx * dx + dy * dy);
        line.style.width = `${length}px`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.transformOrigin = '0 0';
        line.style.left = `${x1}px`;
        line.style.top = `${y1}px`;
        line.style.display = 'block';
    };

    const disableBoxes = () => {
        for (let box of boxes){
            box.disabled = true;
        }
    };

    const enableBoxes = () => {
        for (let box of boxes) {
            box.disabled = false;
            box.innerText = "";
            box.classList.remove("pop-up");
        }
    };

    const newGame = () => {
        clickAudio.currentTime = 0;
        clickAudio.play();
        turn0 = true;
        enableBoxes();
        msgContainer.classList.add("hide");
        line.style.display = "none";
    };

let newGameBtn = document.querySelector("#NewGame");
newGameBtn.addEventListener("click", newGame);
