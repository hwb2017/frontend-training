// 获取元素
const toggle = document.getElementById("toggle");
const close = document.getElementById("close");
const login = document.getElementById("login");
const modal = document.getElementById("modal");

// 监听事件
toggle.addEventListener("click", () => 
  document.body.classList.toggle("show-nav")
);

login.addEventListener("click", () =>
  modal.classList.add("show-modal")
);

close.addEventListener("click", () => 
  modal.classList.remove("show-modal")
);

modal.addEventListener("click", (e) => 
  e.target === modal ? modal.classList.remove("show-modal") : false
);