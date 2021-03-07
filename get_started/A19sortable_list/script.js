const draggableList = document.getElementById("draggable-list");
const checkBtn = document.getElementById("check");

const richestPeople = [
  "Jeff Bezos",
  "Bill Gates",
  "Bernard Arnault",
  "Warren Buffett",
  "Mark Zuckerberg",
  "Amancio Ortega",
  "Larry Ellison",
  "Larry Page",
  "Steve Ballmer",
  "Carlos Slim Helu"
];

const listItems = [];
let dragStartIndex;

function createList() {
  richestPeople
  .map(person => ({name: person, value: Math.random()}))
  .sort((a, b) => a.value - b.value)
  .forEach((person, index) => {
    const listItem = document.createElement("li");
    listItem.setAttribute("data-index", index);
    listItem.innerHTML = `
      <span class="number">${index + 1}</span>
      <div class="draggable" draggable="true">
      <p class="person-name">${person.name}</p>
      <i class="fas fa-grip-lines"></i>
      </div>
    `
    listItems.push(listItem);
    draggableList.appendChild(listItem);
    addDragEventListener();
  })
}
createList();

function dragStart() {
  // console.log("dragStart");
  dragStartIndex = this.closest("li").dataset.index;
}

function dragEnter() {
  // console.log("dragEnter");
  this.classList.add("over");
}

function dragOver(e) {
  // console.log("dragOver");
  e.preventDefault();
}

function dragLeave() {
  // console.log("dragLeave");
  this.classList.remove("over");
}

function dragDrop() {
  // console.log("dragDrop");
  const dragEndIndex = this.dataset.index;
  swapItems(dragStartIndex, dragEndIndex);
  this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {
  const fromItem = listItems[fromIndex].querySelector(".draggable");
  const toItem = listItems[toIndex].querySelector(".draggable");
  listItems[fromIndex].appendChild(toItem);
  listItems[toIndex].appendChild(fromItem);
}

function addDragEventListener() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");
  draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", dragStart);
  });  
  dragListItems.forEach(item => {
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragover", dragOver);
    item.addEventListener("dragleave", dragLeave);
    item.addEventListener("drop", dragDrop);
  }); 
}

function checkOrder() {
  listItems.forEach((item,index) => {
    let personName = item.querySelector(".person-name").innerText.trim();
    if (personName === richestPeople[index]) {
      item.classList.remove("wrong");
      item.classList.add("right");
    } else {
      item.classList.add("wrong");
    }
  });
}

checkBtn.addEventListener("click", checkOrder);