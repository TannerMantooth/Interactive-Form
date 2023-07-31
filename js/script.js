//Focusing on name field when page loads
const nameField = document.getElementById("name");
nameField.focus();

//Createing variables to hide additional text field for job role when other is selected
const jobDisplay = document.getElementById("other-job-role");
jobDisplay.style.display = "none";
const jobRole = document.getElementById("title");

//Event listenter for job role field to change visibility of additional text field
jobRole.addEventListener("change", (e) => {
    if(e.target.value === "other") {
        jobDisplay.style.display = "block";
    } else {
        jobDisplay.style.display = "none";
    }
});

//Declaring variables for T-Shirt section and hiding color until selection is made for design
const color = document.getElementById("color");
color.disabled = true;
const colorOptions = color.children;
const design = document.getElementById("design");

//Event listener for change in design choice that will show available color options based off selected shirt theme
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

//Creating variables for access activity section elements
const activities = document.getElementById("activities");
const totalElement = document.getElementById("activities-cost");
let totalCost = 0;

//Event listener for change in selected activities to dynamically update total cost
activities.addEventListener("change", (e) => {
    let dataCost = e.target.getAttribute("data-cost");
    dataCost = +dataCost;
    if (e.target.checked === true) {
        totalCost += dataCost;
    } else if (e.target.checked === false) {
        totalCost -= dataCost;
    }
    totalElement.innerHTML = `Total: $${totalCost}`;
});

//Creating variables to access payment section elements
const paySelect = document.getElementById("payment");
const creditCard = document.getElementById("credit-card");
const payPal = document.getElementById("paypal");
const bitCoin = document.getElementById("bitcoin");
payPal.hidden = true;
bitCoin.hidden = true;
paySelect.children[1].selected = true;

//Event listener for change in choice of payment type that hides other credit card information fields if one of the other types is selected
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

//Creating variables to access credit card information fields
const email = document.getElementById("email");
const cardNumber = document.getElementById("cc-num");
const zipCode = document.getElementById("zip");
const cvv = document.getElementById("cvv");
const webForm = document.querySelector("form");

/*
    Creating event listner that listens for form submission while also validating required form fields to make sure all required input is present.
    Invalid fields will show hints if submission is attempted to help users know what information is missing. 
*/
webForm.addEventListener("submit", (e) => {
    //Creating validation testing for name
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

    //Creating validation testing for email
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
    
    //Creating validation testing for activies section
    if (totalCost === 0) {
        e.preventDefault();
        activities.classList.add('not-valid');
        activities.classList.remove('valid');
        activities.lastElementChild.display = "block";
    } else {
        activities.classList.add('valid');
        activities.classList.remove('not-valid');
        activities.lastElementChild.display = "none";
    }

    //Creating validation testing for Credit Card information
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

//Shifts focus from each box using tab in the activites section to help with accessibility
const activitiesCheckboxes = document.querySelectorAll('input[type=checkbox]');
for (let i = 0; i < activitiesCheckboxes.length; i++) {
    activitiesCheckboxes[i].addEventListener("focus", (e) => {
        activitiesCheckboxes[i].parentElement.className = "focus";
    })
    activitiesCheckboxes[i].addEventListener("blur", (e) => {
        activitiesCheckboxes[i].parentElement.classList.remove("focus");
    })
}

