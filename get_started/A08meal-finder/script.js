// 获得节点
const search = document.getElementById("search"),
  submit = document.getElementById("submit"),
  random = document.getElementById("random"),
  mealsEl = document.getElementById("meals"),
  resultHeading = document.getElementById("result-heading"),
  single_mealEl = document.getElementById("single-meal");

// 搜索食谱
function searchMeal(e) {
  e.preventDefault();
  resultHeading.innerHTML="";
  mealsEl.innerHTML="";
  single_mealEl.innerHTML="";

  const term = search.value;
  if (term.trim()) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
    .then(res => res.json())
    .then(data => {
      if (data.meals === null) {
        resultHeading.innerHTML = `<p>没有查询到相关食谱，请重新输入! </p>`;
      } else {
        resultHeading.innerHTML = `<h2>${term}的查询结果为：</h2>`;
        mealsEl.innerHTML = data.meals
          .map(
            meal => `
            <div class="meal">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
              <div class="meal-info" data-mealId="${meal.idMeal}">
                <h3>${meal.strMeal}</h3>
              </div>
            </div>
            `
          ).join("");
      }});
    search.value = "";
  } else {
    alert("请输入搜索的内容");
  }
}

//获取单个菜单
function getMealById(mealID) {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    })
}

//渲染单个菜单
function addMealToDOM(meal) {
  let ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients.push(
        `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
      );
    } else {
      break;
    }
  }

  single_mealEl.innerHTML = `
  <div class="single-meal">
  <h1>${meal.strMeal}</h1>
  <img src= "${meal.strMealThumb}" alt="${meal.strmeal}">
  <div class="single-meal-info">
  ${meal.strCategory ? `<p>${meal.strCategory}</p>` : ""}
  ${meal.strArea ? `<p>${meal.strArea}</p>` : ""}
  </div>
  <div class="main">
  <p>${meal.strInstructions}</p>
  <h2>Ingredients</h2>
  <ul>
  ${ingredients.map(ing => `<li>${ing}</li>`).join("")}
  </ul>
  </div>
  </div>
  `;
}

function getRandomMeal() {
  resultHeading.innerHTML="";
  mealsEl.innerHTML="";
  single_mealEl.innerHTML="";

  fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(data => {
      const meal = data.meals[0];
      addMealToDOM(meal);
    });
}

// 设置搜索框监听事件
submit.addEventListener("submit", searchMeal);
mealsEl.addEventListener("click", e => {
  const mealInfo = e.composedPath().find(item => {
    if (item.classList) {
      return item.classList.contains("meal-info");
    } else {
      return false;
    }
  });

  if (mealInfo) {
    const mealID = mealInfo.dataset.mealid;
    getMealById(mealID);
  }
});
random.addEventListener("click", getRandomMeal);