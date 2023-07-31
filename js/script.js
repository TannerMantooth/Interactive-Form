const nameField = document.getElementById("name");
nameField.focus();

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

const email = document.getElementById("email");
const cardNumber = document.getElementById("cc-num");
const zipCode = document.getElementById("zip");
const cvv = document.getElementById("cvv");
const webForm = document.querySelector("form");

webForm.addEventListener("submit", (e) => {
    const nameValue = nameField.value;
    const nameTest = /\D/;
    const validName = nameTest.test(nameValue);
    if (validName === false || nameValue === "") {
        e.preventDefault();
        nameField.parentElement.classList.add('not-valid');
        nameField.parentElement.classList.remove('valid');
        nameField.parentElement.lastElementChild.display = "block";
    } else {
        nameField.parentElement.classList.add('valid');
        nameField.parentElement.classList.remove('not-valid');
        nameField.parentElement.lastElementChild.display = "none";
    }

    const emailValue = email.value;
    const emailTest = /^[a-z0-9_]+@[a-z]+\.[a-z]{2,3}$/;
    const validEmail = emailTest.test(emailValue);
    if (validEmail === false || emailValue === "") {
        e.preventDefault();
        email.parentElement.classList.add('not-valid');
        email.parentElement.classList.remove('valid');
        email.parentElement.lastElementChild.display = "block";
    } else {
        email.parentElement.classList.add('valid');
        email.parentElement.classList.remove('not-valid');
        email.parentElement.lastElementChild.display = "none";
    }
    
    if (totalCost === 0) {
        e.preventDefault();
        register.classList.add('not-valid');
        register.classList.remove('valid');
        register.lastElementChild.display = "block";
    } else {
        register.classList.add('valid');
        register.classList.remove('not-valid');
        register.lastElementChild.display = "none";
    }

    const cardNumberValue = cardNumber.value;
    const cvvValue = cvv.value;
    const zipValue = zipCode.value;
    const cardTest = /\b\d{13,16}\b/;
    const cvvTest = /\b\d{3}\b/;
    const zipTest = /\b\d{5}\b/;
    const validCard = cardTest.test(cardNumberValue);
    const validCvv = cvvTest.test(cvvValue);
    const validZip = zipTest.test(zipValue);

    if (creditCard.hidden === false) {
        if (validCard === false) {
            e.preventDefault();
            cardNumber.parentElement.classList.add('not-valid');
            cardNumber.parentElement.classList.remove('valid');
            cardNumber.parentElement.lastElementChild.display = "block";
        } else {
            cardNumber.parentElement.classList.add('valid');
            cardNumber.parentElement.classList.remove('not-valid');
            cardNumber.parentElement.lastElementChild.display = "none";
        }

        if (validCvv === false) {
            e.preventDefault();
            cvv.parentElement.classList.add('not-valid');
            cvv.parentElement.classList.remove('valid');
            cvv.parentElement.lastElementChild.display = "block";
        } else {
            cvv.parentElement.classList.add('valid');
            cvv.parentElement.classList.remove('not-valid');
            cvv.parentElement.lastElementChild.display = "none";
        }
        
        if (validZip === false) {
            e.preventDefault();
            zipCode.parentElement.classList.add('not-valid');
            zipCode.parentElement.classList.remove('valid');
            zipCode.parentElement.lastElementChild.display = "block";
        } else {
            zipCode.parentElement.classList.add('valid');
            zipCode.parentElement.classList.remove('not-valid');
            zipCode.parentElement.lastElementChild.display = "none";
        }
    }
});

const activitiesCheckboxes = document.querySelectorAll('input[type=checkbox]');
for (let i = 0; i < activitiesCheckboxes.length; i++) {
    activitiesCheckboxes[i].addEventListener("focus", (e) => {
        activitiesCheckboxes[i].parentElement.className = "focus";
    })
    activitiesCheckboxes[i].addEventListener("blur", (e) => {
        activitiesCheckboxes[i].parentElement.classList.remove("focus");
    })
}

