const body = document.body;
// Prepare cell for mapping mouse position
const bodyInHTML = body.innerHTML;
const compDocumentSt = document.documentElement;
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
const getHappyBdayClassEl = (text, addedClasses = '') => {
    const divEl = document.createElement('div');
    divEl.classList = 'happy-birthday ' + addedClasses;
    divEl.innerText = text
    
    return divEl;
};

for (let i = 1; i <= 18; i++) {
    setTimeout(() => {
        textPart = 'Emma!!!';
        happyBdayClassEl = getHappyBdayClassEl(textPart);
        lastChildInGreets = greetsSec.lastChild;
        lastChildInGreets.innerText = ++agePart;
        greetsSec.insertBefore(happyBdayClassEl, lastChildInGreets);
        if (i === 18) {
            const { style: lastChildSt, classList } = lastChildInGreets;
            let animationTime = 0.4;
            compDocumentSt.style.setProperty('--animation-time', animationTime + 's');
            setTimeout(() => {
                classList.add('no-gradient-border');
                setTimeout(() => {
                    classList.add('onbefore-gradient-border')
                    animationTime = 15;
                    compDocumentSt.style.setProperty('--animation-time', animationTime + 's');
                }, 4000);
                // lastChildSt.animationDuration = '30s';
            }, 8000);
        } 
            
    }, 10000 * i ** (1 / 4));
}
let happyBdayClassEl = getHappyBdayClassEl(textPart, 'box-18');
greetsSec.innerHTML += happyBdayClassEl.outerHTML; 


// Copyright update
const currentYear = new Date().getFullYear();
const crYear = document.getElementsByClassName('cr-year')[0];
crYear.innerText = currentYear;
