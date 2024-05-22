// Fetch data through Custom property and using id Selectors(queryselector)

// Display Property throught custom property 

const lengthDisplay = document.querySelector("[data-lengthNumber]")
const passwordDisplay = document.querySelector("[data-passwordDisplay]");

// Copy Button for copied password throught custom property 

const copyMsg = document.querySelector("[data-copyMsg]")
const copybtn = document.querySelector("[data-copy]")

// fetch Slider 

const inputSlider = document.querySelector("[data-lengthSlider]")

// fetch CheckBoxes using id attribute
const uppercase = document.querySelector("#uppercase")
const lowercase = document.querySelector("#lowercase")
const number = document.querySelector("#number")
const symbols = document.querySelector("#symbols")
const allcheckbox = document.querySelectorAll("input[type=checkbox]")

// fetch Indicator throught custom property 

const indicator = document.querySelector("[data-indicator]")

// fetch generate button using class attribute

const generatebtn = document.querySelector(".generatePassword")

// generate symbol
const symbolsRndm = "@#$&";

// Set Default property

let password = "";
let passwordLength = 10;
let checkCount = 1;
uppercase.checked = true;

// Set Password Length

handleSlider();

// set indicator
setIndicator("#ccc")

function handleSlider() {
    inputSlider.value = passwordLength;
    lengthDisplay.innerText = passwordLength;
    const min = inputSlider.min;
    const max = inputSlider.max;
    inputSlider.style.backgroundSize =
    ((passwordLength - min) * 100) / (max - min) + "% 100%";
}

// Set indicator color

function setIndicator(color) {
    indicator.style.backgroundColor = color;
    // indicator.style.boxShadow
    indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
}

// Generate Random Integer

function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// Generate Random Number 

function generateRandomNumber() {
    return getRandomInteger(0,9);
}

// Generate Random Lower case (a to z) 

function generateLowerCase() {
    return String.fromCharCode(getRandomInteger(97,123));
}

// Generate Random Upper case (A to Z) 

function generateUpperCase() {
    return String.fromCharCode(getRandomInteger(65,91));
}

// Generate Random Symbol (@#$&) 

function generateSymbols() {
    const randomNum = getRandomInteger(0, symbolsRndm.length)
    return symbolsRndm.charAt(randomNum);
}

// Shuffle the password

// Fisher Yates algorithm
function ShufflePassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
      // find out random j
      const j = Math.floor(Math.random() * (i + 1));
      // swap 2 numbers
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    let str = "";
    // array.forEach((el) => (str += el));
    str = array.join("");
    return str;
}


function calculateStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNumber = false;
    let hasSymbols = false;

    if(uppercase.checked) hasUpper = true;
    if(lowercase.checked) hasLower = true;
    if(number.checked) hasNumber = true;
    if(symbols.checked) hasSymbols = true;

    if(hasUpper && hasLower && (hasNumber || hasSymbols) && passwordLength >= 8) {
        setIndicator("#0f0");
    }
    else if(
        (hasLower || hasUpper) && (hasNumber || hasSymbols) && passwordLength >= 6
    )
    {
        setIndicator("#ff0")
    }
    else    setIndicator("#f00")
}

// Copy password

async function copyContent() {

    try{   // asyncronous code to generate Promises 
        navigator.clipboard.writeText(passwordDisplay.value);
        copyMsg.innerText = "copied"
    }
    catch(e){
        copyMsg.innerText = "Failed"
    }

    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
    },2000);
}

inputSlider.addEventListener("input", (e)=>{
    passwordLength = e.target.value;
    handleSlider();
})

copybtn.addEventListener("click", ()=> {
    if(passwordDisplay.value){
        copyContent();
    }
})

function handleCheckBoxChange() {
    checkCount = 0;
    allcheckbox.forEach((checkbox) => {
        if(checkbox.checked)
            checkCount++;
    });

    if(checkCount > passwordLength) {
        passwordLength = checkCount;
        handleSlider();
    }
}

allcheckbox.forEach((checkbox) => {
    checkbox.addEventListener("change", handleCheckBoxChange);
});

// Generate Password
generatebtn.addEventListener("click", ()=> {

    if(checkCount <= 0) return;
    
    if(checkCount > passwordLength) {
        passwordLength = checkCount;
        handleSlider();
    }
    password = "";

    let funArr = [];

    if(uppercase.checked) {
        funArr.push(generateUpperCase)
    }
    if(lowercase.checked) {
        funArr.push(generateLowerCase)
    }
    if(number.checked) {
        funArr.push(generateRandomNumber)
    }
    if(symbols.checked) {
        funArr.push(generateSymbols)
    }

    for(let i = 0; i < funArr.length; i++) {
        password += funArr[i]();
    }


    for(let i = 0; i < passwordLength - funArr.length; i++) {
        let randomIndex = getRandomInteger(0, funArr.length)
        password += funArr[randomIndex]();
    }


    password = ShufflePassword(Array.from(password));

    passwordDisplay.value = password

    calculateStrength();
})

