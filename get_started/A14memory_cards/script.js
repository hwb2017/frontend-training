// 获取节点
const cardsContainer = document.getElementById("cards-container");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const currentEl = document.getElementById("current");
const showBtn = document.getElementById("show");
const hideBtn = document.getElementById("hide");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCardBtn = document.getElementById("add-card");
const clearBtn = document.getElementById("clear");
const addContainer = document.getElementById("add-container");

// 当前卡片下标
let currentActiveCard = 0;

// 存储卡片domyuansu
let cardsEl = [];

// 获取卡片信息
const cardsData = getCardsData();
// [
//   {
//     question: "DOM 事件有哪些阶段",
//     answer: "分为三大阶段：捕获阶段--目标阶段--冒泡阶段"
//   },
//   {
//     question: "js有哪些数据类型",
//     answer: "Undefined、Null、Boolean、Number、String、Object"
//   },
//   {
//     question: "主流浏览器有哪些",
//     answer: "IE、火狐（Firefox）、谷歌（Chrome）、Safari和Opera"
//   }
// ];

function getCardsData() {
  const cards = JSON.parse(localStorage.getItem("cards"));
  return cards === null ? [] : cards;
}

function setCardsData(cards) {
  localStorage.setItem("cards", JSON.stringify(cards));
  window.location.reload();
}

function createCards() {
  cardsData.forEach((data, index) => createCard(data, index));
}
createCards();

function createCard(data, index) {
  const card = document.createElement("div");
  card.classList.add("card");
  if (index === currentActiveCard) {
    card.classList.add("active");
  }
  card.innerHTML = `
    <div class="card-front">
      <p>${data.question}</p>
    </div>
    <div class="card-backward">
      <p>${data.answer}</p>
    </div>
    `;
  card.addEventListener("click", () => card.classList.toggle("show-answer"));
  cardsEl.push(card);
  cardsContainer.appendChild(card);
  updateCurrentPage();
}

function updateCurrentPage() {
  currentEl.innerHTML = `${currentActiveCard + 1}/${cardsEl.length}`;
}

//卡片切换
nextBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].classList = "card shift-left";
  currentActiveCard++;
  if (currentActiveCard > cardsEl.length -1 ) {
    currentActiveCard = cardsEl.length - 1;
  }
  cardsEl[currentActiveCard].classList = "card active";
  updateCurrentPage();
});

prevBtn.addEventListener("click", () => {
  cardsEl[currentActiveCard].classList = "card shift-right";
  currentActiveCard--;
  if (currentActiveCard < 0 ) {
    currentActiveCard = 0;
  }
  cardsEl[currentActiveCard].classList = "card active";
  updateCurrentPage();
});

showBtn.addEventListener("click", () => addContainer.classList.add("show"));
hideBtn.addEventListener("click", () => addContainer.classList.remove("show"));
addCardBtn.addEventListener("click", () => {
  const question = questionEl.value;
  const answer = answerEl.value;
  if (question.trim() && answer.trim()) {
    const newCard = { question, answer };
    question.value = "";
    answer.value = "";
    cardsData.push(newCard);
    setCardsData(cardsData);
    addContainer.classList.remove("show");
  }
});

clearBtn.addEventListener("click", () => {
  localStorage.removeItem("cards");
  window.location.reload();
});