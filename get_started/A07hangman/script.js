// 第一步 获取节点
const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");

const words = ["application", "programming", "interface", "wonder"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let correctLetters = [];
let wrongLetters = [];


// 第二步 显示单词
function displayWord() {
    wordEl.innerHTML = `
    ${selectedWord
        .split("")
        .map(
            letter => `
            <span class="letter">
            ${correctLetters.includes(letter) ? letter : ""}
            </span>
            `
        )
        .join("")
    }`;

    const innerWord = wordEl.innerText.replace(/\n/g, "");

    if (innerWord === selectedWord) {
        finalMessage.innerText = "恭喜你输入正确！ 😃";
        popup.style.display = "flex";
    }
}

function checkAlphabet(char) {
    let alphabetReg = /^[A-Za-z]+$/;
    return alphabetReg.test(char);
}

// 监听键盘敲击事件
window.addEventListener("keydown", (e) => {
    const letter = e.key;
    if (checkAlphabet(letter)) {
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});

// 重复输入提示
function showNotification() {
    notification.classList.add("show");
    setTimeout(() => {
        notification.classList.remove("show");
    }, 2000)
}

// 更新错误字母列表及火柴人
function updateWrongLettersEl() {
    wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? "<p>错误: </p>": ""}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    const errors = wrongLetters.length;
    figureParts.forEach((part, index) => {
        if (index < errors) {
            part.style.display = "block";
        } else {
            part.style.display = "none";
        }
    });

    if (wrongLetters.length === figureParts.length) {
        finalMessage.innerText = "抱歉输入错误，游戏结束. 😕";
        popup.style.display = "flex";
    }
}

// 再玩一次
playAgainBtn.addEventListener("click", () => {
    wrongLetters.splice(0);
    correctLetters.splice(0);

    popup.style.display = "none";
    displayWord();
    updateWrongLettersEl();
})

displayWord();