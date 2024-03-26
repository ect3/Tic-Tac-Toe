let clickAudio = new Audio("button.wav");
document.getElementById("BackBtn").addEventListener("click", function(){
    window.location.href="index.html";
    clickAudio.play();
});
let moveAudio = new Audio("move.wav");
let winAudio = new Audio("win.wav");
let boxes = document.querySelectorAll(".boxp");
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
  
boxes.forEach((boxp) =>{
    boxp.addEventListener("click", () =>{
        moveAudio.play();
        if(turn0){
            boxp.innerText = "O";
            boxp.style.color = "blue";
            turn0 = false;
            boxp.classList.add("pop-up");
        } else {
            boxp.innerText = "X";
            boxp.style.color = "red";
            turn0 = true;
            boxp.classList.add("pop-up");
        }
        checkWinner();
        boxp.disabled = true;
    });
});

const checkWinner = () => {
    for (let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                console.log("winner",pos1Val);
                showWinner(pos1Val,pattern);
            }
        }
    }
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
        clickAudio.play();
        turn0 = true;
        enableBoxes();
        msgContainer.classList.add("hide");
        line.style.display = "none";
    };

let newGameBtn = document.querySelector("#NewGame");
newGameBtn.addEventListener("click", newGame);
