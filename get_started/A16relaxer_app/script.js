const container = document.getElementById("container");
const text = document.getElementById("text");

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function breatheAnimation() {
  while (true) {
    text.innerText = "吸气";
    container.className = "container grow";
    await sleep(breatheTime);
    text.innerText = "保持";
    await sleep(holdTime);
    text.innerText = "呼气";
    container.className = "container shrink";
    await sleep(breatheTime);
  }
}
breatheAnimation();