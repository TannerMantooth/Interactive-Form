const inputFocus = document.getElementById("name");
inputFocus.focus();

const jobDisplay = document.getElementById("other-job-role");
jobDisplay.style.display = "none";
const jobRole = document.getElementById("title");

jobRole.addEventListener("change", (e) => {
    if(e.target.value === "other") {
        jobDisplay.style.display = "block";
    } else {
        jobDisplay.style.display = "none";
    }
});

const color = document.getElementById("color");
color.disabled = true;
const colorOptions = color.children;
const design = document.getElementById("design");

design.addEventListener("change", (e) => {
    color.disabled = false;
    for (let i = 0; i <colorOptions.length; i++) {
        const eventValue = design.value;
        const dataTheme = colorOptions[i].getAttribute("data-theme");
        if (eventValue === dataTheme) {
            colorOptions[i].hidden = false;
            colorOptions[i].setAttribute("selected", "true");
        } else {
            colorOptions[i].hidden = true;
            colorOptions[i].setAttribute("selected", "false");
        }
    }
});

const register = document.getElementById("activities");
const totalElement = document.getElementById("activities-cost");
let totalCost = 0;
register.addEventListener("change", (e) => {
    let dataCost = e.target.getAttribute("data-cost");
    dataCost = +dataCost;
    if (e.target.checked === true) {
        totalCost += dataCost;
    } else if (e.target.checked === false) {
        totalCost -= dataCost;
    }
    totalElement.innerHTML = `Total: $${totalCost}`;
});

const paySelect = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");
const payPal = document.getElementById("paypal");
const bitCoin = document.getElementById("bitcoin");
payPal.hidden = true;
bitCoin.hidden = true;
paySelect.children[1].selected = true;

paySelect.addEventListener("change", (e) => {
    if (e.target.value === "paypal") {
        payPal.hidden = false;
        creditCard.hidden = true;
        bitCoin.hidden = true;
    } else if (e.target.value === "bitcoin") {
        bitCoin.hidden = false;
        payPal.hidden = true;
        creditCard.hidden = true;
    } else {
        creditCard.hidden = false;
        payPal.hidden = true;
        bitCoin.hidden = true;
    }
});