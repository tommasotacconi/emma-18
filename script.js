/* Retrieve DOM elementS */
const body = document.body;
const bodyInHTML = body.innerHTML;
const documentEl = document.documentElement;

/* Prepare cells for mapping mouse position */
body.innerHTML = '';

for (let i = 0; i < 250; i++) {
    const cellEl = '<div class="cell"></div>';
    
    if (i < 249) body.innerHTML += cellEl;
    else body.innerHTML += cellEl + bodyInHTML;
}

/* Add age in front of '.greetings' text and a series of birthday person's names
as long as the age. This is sequential, hence create steps where you increment
age count and add a name  */  
const greetsSec = document.getElementById('greetings');
const greetsSecInHTML = greetsSec.innerHTML;
let agePart = 0;
let textPart = agePart;
const getHappyBdayClassEl = (text, addedClasses = '') => {
    const divEl = document.createElement('div');
    divEl.classList = 'happy-birthday ' + addedClasses;
    divEl.innerText = text
    
    return divEl;
};

// Insert age count
let happyBdayClassEl = getHappyBdayClassEl(textPart, 'box-18');
greetsSec.innerHTML += happyBdayClassEl.outerHTML;

for (let i = 1; i <= 18; i++) {
    setTimeout(() => {
        // Insert name and update age
        textPart = 'Emma!!!';
        happyBdayClassEl = getHappyBdayClassEl(textPart);
        lastChildInGreets = greetsSec.lastChild;
        lastChildInGreets.innerText = ++agePart;
        greetsSec.insertBefore(happyBdayClassEl, lastChildInGreets);
        // Start a faster animation for age box background animation
        // and after completion remove background and show pseudo-element
        // for lighter and slower animation (border only animation) 
        if (i === 18) {
            const { classList } = lastChildInGreets;
            let animationTime = 0.4;
            documentEl.style.setProperty('--animation-time', animationTime + 's');
            setTimeout(() => {
                classList.add('no-gradient-border');
                setTimeout(() => {
                    classList.add('onbefore-gradient-border')
                    animationTime = 15;
                    documentEl.style.setProperty('--animation-time', animationTime + 's');
                }, 4000);
            }, 8000);
        } 
    }, 10000 * i ** (1 / 4));
}

// Copyright date update
const currentYear = new Date().getFullYear();
const crYear = document.getElementsByClassName('cr-year')[0];
crYear.innerText = currentYear;
