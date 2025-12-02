console.log('js ok');

const body = document.body;
// Prepare cell for mapping mouse position
const bodyInHTML = body.innerHTML;
body.innerHTML = '';

for (let i = 0; i < 250; i++) {
    const cellEl = '<div class="cell"></div>';
    
    if (i < 249) body.innerHTML += cellEl;
    else body.innerHTML += cellEl + bodyInHTML;
}

const greetsSec = document.getElementById('greetings');
const greetsSecInHTML = greetsSec.innerHTML;
let agePart = 0;
let textPart = agePart;
const getHappyBdayClassEl = (text, addedClasses) => `<div class="happy-birthday ${addedClasses}">${text}</div>`;
let happyBdayClassEl = getHappyBdayClassEl(textPart, 'box-18');

for (let i = 1; i <= 18; i++) {
    setTimeout(() => {
        agePart++;
        textPart = 'Emma!!!';
        happyBdayClassEl = getHappyBdayClassEl(textPart);
        greetsSec.innerHTML = greetsSecInHTML + Array(i).fill(happyBdayClassEl).join("") + getHappyBdayClassEl(agePart, 'box-18');
    }, 10000 * i ** (1 / 4));
    console.log(400 * i ** (1 / 2));
}
greetsSec.innerHTML += happyBdayClassEl; 


// Copyright update
const currentYear = new Date().getFullYear();
const crYear = document.getElementsByClassName('cr-year')[0];
crYear.innerText = currentYear;
