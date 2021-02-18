// 获取元素
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

// 添加随机用户
async function getRandomUser() {
    const response = await fetch("https://randomuser.me/api");
    const data = await response.json();
    const item = data.results[0];
    const newUser = {
        name: `${item.name.first} ${item.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser);
}

// 添加用户到 data 数组
function addData(obj) {
   data.push(obj);
   updateDom();
}

// 更新用户信息到dom树
function updateDom(providedData = data) {
   // clear main div
   main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";
   providedData.forEach(item => {
       const element = document.createElement("div");
       element.classList.add("person");
       element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
           item.money
       )}`
       main.appendChild(element);
   });
}

// 转换为货币格式
function formatMoney(number) {
    return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// 资产翻倍
function doubleMoney() {
    data = data.map((user) => {
        return { ...user, money: user.money * 2};
    });
    updateDom();
}

// 财富排序
function sortByRichest() {
    data.sort((a,b) => b.money - a.money);
    updateDom();
}

// 查询百万富翁
function showMillionaires() {
    data = data.filter(user => user.money > 1000000);
    updateDom();
}

// 计算总金额
function calculateWealth() {
    const total = data.reduce(((acc, num) => acc+num.money),0);
    const totalWealth = document.createElement("div");
    totalWealth.innerHTML = `<h3>Total Wealth: ${formatMoney(total)}</h3>`
    main.appendChild(totalWealth);
}

// 事件监听
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);

getRandomUser();
getRandomUser();
getRandomUser();