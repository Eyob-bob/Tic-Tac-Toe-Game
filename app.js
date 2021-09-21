const fills = document.querySelectorAll(".fill")
const display = document.querySelector("p")
const btn = document.querySelector("button")

let gameOn = true
let turn = "X"
let allFills = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
let reseter = [...allFills]
let win = ""

fills.forEach((fill) => {
    fill.addEventListener("click", fillEvent)
})

function fillEvent(e) {
    if (gameOn) {
        fillBoard(e.currentTarget)
    } else {
        finish()
    }
}

function finish() {

    if (win === "win") {
        display.textContent = `Player ${turn} won the game`
    } else if (win === "draw") {
        display.textContent = "It is draw"
    }

    fills.forEach((fill) => {
        fill.removeEventListener("click", fillEvent)
    })
}

function fillBoard(fill) {
    if (fill.textContent.includes("X") || fill.textContent.includes("O")) {
        return
    }
    fill.textContent = turn
    allFills[eval(fill.dataset.id)] = turn
    checkFinish()
    changeTurn()
}

function changeTurn() {
    turn = turn === "X" ? "O" : "X"
}

function checkFinish() {
    if ((allFills[0] === allFills[1] && allFills[1] === allFills[2])
        || (allFills[3] === allFills[4] && allFills[4] === allFills[5])
        || (allFills[6] === allFills[7] && allFills[7] === allFills[8])
        || (allFills[0] === allFills[4] && allFills[4] === allFills[8])
        || (allFills[2] === allFills[4] && allFills[4] === allFills[6])
        || (allFills[0] === allFills[3] && allFills[3] == allFills[6])
        || (allFills[1] === allFills[4] && allFills[4] == allFills[7])
        || (allFills[2] === allFills[5] && allFills[5] == allFills[8])) {
        win = "win"
        gameOn = false
        finish()
    } else {
        for (let i = 0; i < allFills.length; i++) {
            if (allFills[i] === "X" || allFills[i] === "O") {
                gameOn = false
                win = "draw"
            } else {
                gameOn = true
                break
            }
        }
        if (!gameOn) {
            finish()
        }
    }
}

btn.addEventListener("click", () => {
    turn = "X"
    gameOn = true
    allFills = [...reseter]
    win = ""
    display.textContent = ""
    fills.forEach((fill) => {
        fill.textContent = ""
        fill.addEventListener("click", fillEvent)
    })
})