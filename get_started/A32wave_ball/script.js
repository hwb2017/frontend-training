const container = document.getElementById("container");
let rows = 15;
let cols = 15;

for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    container.appendChild(circle);
    circle.addEventListener("click", () => {
      growCircles(i, j);
    });
  }
}

function growCircles(i, j) {
  if (!container.children[i*15 + j].classList.contains("grow")) {
    container.children[i*15 + j].classList.add("grow");
    setTimeout(() => {
      growCircles(i-1,j);
      growCircles(i+1,j);
      growCircles(i,j-1);
      growCircles(i,j+1);
    }, 100);
    setTimeout(() => {
      container.children[i*15+j].classList.remove("grow");
    }, 300);
  }
}