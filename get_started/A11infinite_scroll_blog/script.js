// 获取元素
const filter = document.getElementById("filter");
const postContainer = document.getElementById("post-container");
const loading = document.querySelector(".loader");

let limit = 5;
let page = 1;

// fetch posts from API
async function getPosts() {
  const res = await fetch(
  `http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );
  const data = await res.json();
  return data;
}

// show posts in DOM
async function showPosts() {
  const post = await getPosts();
  post.forEach(post => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
    <div class="number">${post.id}</div>
    <div class="post-info">
    <h2 class="post-title">${post.title}</h2>
    <p class="post-body">${post.body}</p>
    </div>
    `;
    postContainer.appendChild(postEl);
  });
}
showPosts();

// 加载Posts
async function showLoading() {
  loading.classList.add("show");
  page++;
  await showPosts();
  loading.classList.remove("show");
}
// function showLoading() {
//   loading.classList.add("show");
//   setTimeout(() => {
//     loading.classList.remove("show");

//     setTimeout(() => {
//       page++;
//       showPosts();
//     }, 300);
//   }, 1000);
// }

// 筛选当前Posts
function filterPosts(e) {
  const term = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");
  posts.forEach(post => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();
    if (title.includes(term) || body.includes(term)) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

function debounce(fn, wait) {
  let timer = null;  
  return function() {
    let context = this;
    let args = arguments;
    if (timer != null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => fn.apply(context, args), wait)
  }
}

// 添加滚轮滚动到底部的事件监听函数
window.addEventListener("scroll", () => {
  let {scrollHeight, scrollTop, clientHeight} = document.documentElement;
  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
})

filter.addEventListener("input", debounce(filterPosts, 1000));