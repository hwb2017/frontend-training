// 获取元素
const currencyOrigin = document.getElementById("currency-origin");
const currencyTarget = document.getElementById("currency-target");
const amountOrigin = document.getElementById("amount-origin");
const amountTarget = document.getElementById("amount-target");

const swap = document.getElementById("swap");
const rate = document.getElementById("rate");

function calculate() {
    const originCurrency = currencyOrigin.value;
    const targetCurrency = currencyTarget.value;
    fetch(`https://api.exchangerate-api.com/v4/latest/${originCurrency}`)
      .then(res => res.json())
      .then(data => {
          const rateVal = data.rates[targetCurrency];
          rate.innerText = `1${originCurrency} = ${rateVal}${targetCurrency}`;
          amountTarget.value = (+amountOrigin.value * rateVal).toFixed(2);
      });
}

// 监听事件
currencyOrigin.addEventListener("change", calculate);
currencyTarget.addEventListener("change", calculate);
amountOrigin.addEventListener("input", calculate);
amountTarget.addEventListener("input", calculate);

// 下拉框的change事件，是要在值改变且控件失焦的情况下才会触发的，因此函数中改变select元素的值不会再触发calculate函数
swap.addEventListener("click", () => {
    const temp = currencyOrigin.value;
    currencyOrigin.value = currencyTarget.value;
    currencyTarget.value = temp;
    calculate();
});

calculate();