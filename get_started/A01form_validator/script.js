// get element 
const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");


// get keywords
function getKeywords(field) {
    return field.placeholder.slice(3);
}
// show error
function showError(input, message) {
    const fomrControl = input.parentElement;
    fomrControl.className = "form-control error";
    const small = fomrControl.querySelector("small");
    small.innerText = message;
}

// show success
function showSuccess(input) {
    const fomrControl = input.parentElement;
    fomrControl.className = "form-control success";   
}

// checkRequired
function checkRequired(inputArray) {
    inputArray.forEach(function(input) {
        if (input.value !== "") {
            showSuccess(input);
        } else {
            showError(input,`${getKeywords(input)}为必填项`);
        };
    });
}

// checkLength
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getKeywords(input)}长度至少为${min}个字符`);
    } else if (input.value.length > max) {
        showError(input, `${getKeywords(input)}长度至多为${min}个字符`);
    } else {
        showSuccess(input);
    }
}

// checkEmail
function checkEmail(input) {
    const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, "邮箱格式错误");
    }
}

// checkPasswordsMatch
function checkPasswordsMatch(password, password2) {
    if (password.value !== password2.value) {
        showError(password2, "密码不匹配");
    }
}

// listen form submit event
form.addEventListener("submit", function(e) {
    e.preventDefault();
    checkRequired([username,email,password,password2]);
    checkLength(username, 6, 20);
    checkLength(password, 6, 20);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
})