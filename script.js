/* Retrieve DOM elementS */
const body = document.body;
const bodyInHTML = body.innerHTML;

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
const greets = document.getElementById('greetings');
let agePart = 0;
let textPart = agePart;
const getHappyBdayClassEl = (text, addedClasses = '') => {
    const spanEl = document.createElement('span');
    spanEl.classList = 'happy-birthday ' + addedClasses;
    spanEl.innerText = text
    
    return spanEl;
};

function makeGreets(toPerson, hadAge, greetings) {
    // Insert greetings
    greetings.split(" ").forEach(greetsWord => {
        const el = getHappyBdayClassEl(greetsWord);
        greets.innerHTML += el.outerHTML;
    })
    // Insert age count
    let happyBdayClassEl = getHappyBdayClassEl(textPart, 'had-age-box');
    greets.innerHTML += happyBdayClassEl.outerHTML;
    
    for (let i = 1; i <= hadAge; i++) {
        setTimeout(() => {
            // Insert name and update age
            textPart = toPerson + '!!!';
            happyBdayClassEl = getHappyBdayClassEl(textPart);
            lastChildInGreets = greets.lastChild;
            lastChildInGreets.innerText = ++agePart;
            greets.insertBefore(happyBdayClassEl, lastChildInGreets);
            // Start a faster animation for age box background animation
            // and after completion remove background and show pseudo-element
            // for lighter and slower animation (border only animation)
            if (i === hadAge) {
                const { classList } = lastChildInGreets;
                let animationTime = 0.4;
                document.documentElement.style.setProperty('--animation-time', animationTime + 's');
                setTimeout(() => {
                    classList.add('no-gradient-border');
                    setTimeout(() => {
                        classList.add('onbefore-gradient-border')
                        animationTime = 15;
                        document.documentElement.style.setProperty('--animation-time', animationTime + 's');
                    }, 4000);
                }, 8000);
            }
        }, 10000 * i ** (1 / 4));
    }

    greets.style.display = 'block';
}

// Copyright date update
const currentYear = new Date().getFullYear();
const crYear = document.getElementsByClassName('cr-year')[0];
crYear.innerText = currentYear;

makeGreets('Emma', 18, 'Tanti auguri di buon compleanno');