// Utility functions
function getRandInt(max = 100, min) {
    let randInt = 0;
    
    if (!min) randInt = Math.floor(Math.random() * (max + 1));
    else randInt = min + Math.floor(Math.random() * (max + 1 - min));
    
    return randInt;
}

/**
 * Prepare the HTML skeleton to be used with a css 'firework' class.
 * A single pack object has {
 *  num: number,
 *  color: color,
 *  explCoor: a coordinates array, respectively relative to left and top border
 *    of the screen with number meaning a percentage related to screen lenghts          
 * } 
 * 
 * @param  {...Object} packs Pack with reported destructured properties
 * @returns 
*/
function prepareFireworks(...packs) {
    let fireworkEls = [];
    packs.forEach(({ num, color = 'white', exploCoor = []}) => {
        // Generate random positions if not specified
        if (!exploCoor.toString()) {
            for (let i = 0; i < num; i++) {
                const coor = [];
                for (let j = 0; j < 2; j++) {
                    let range = [5, 95];
                    if (j === 1) range[1] = 35;
                    coor.push(getRandInt(...range.reverse()) + '%');
                }
                exploCoor.push(coor);
            }
        }
        
        for (let i = 0; i < num; i++) {
            const fireworkEl = document.createElement('div');
            fireworkEl.classList.add('firework', 'fw' + i);
            fireworkEl.style.setProperty('--color', color);
            fireworkEl.style.setProperty('left', exploCoor[i]?.[0]);
            fireworkEl.style.setProperty('top', exploCoor[i]?.[1]);
            fireworkEl.style.setProperty('--initialY', 100 - exploCoor[i]?.[1].slice(0, -1) + 'vh');
            fireworkEl.style.setProperty('--explosion-delay', i < 2 ? '0s' : getRandInt(0, 8) + 's');
            const displacementSign = i < num / 2 ? '+' : '-';
            fireworkEl.style.setProperty('--x',  displacementSign + getRandInt(5) + 'vw');
            fireworkEls.push(fireworkEl);
        }
    })
    
    return fireworkEls;
}

/**
 * Start the greetings animation, where 'toPerson' appear
 * after 'greetings'
 * 
 * @param {String} toPerson greeted person's name
 * @param {Number} hadAge new age
 * @param {String} greetings greetings text
*/
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
                fireworks.forEach(el => el.classList.add('animate'));
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

/* Prepare cells for mapping mouse position */
// Retrieve body element and starter content
const body = document.body;
const bodyInHTML = body.innerHTML;

body.innerHTML = '';
for (let i = 0; i < 250; i++) {
    const cellEl = '<div class="cell"></div>';
    
    if (i < 249) body.innerHTML += cellEl;
    else body.innerHTML += cellEl + bodyInHTML;
}

/* Prepare fireworks packs */
body.append(...prepareFireworks(
    { num: 3 },
    { num: 5, color: 'slateblue' },
    { num: 2, color: 'orange'},
    { num: 5, color: 'yellow'}
));

// Retrieve DOM elements
const crYearSpan = document.getElementsByClassName('cr-year')[0];
const celBtn = document.getElementById('celebrate');
const fireworks = document.querySelectorAll('.firework');
const greets = document.getElementById('greetings');

/* Set Copyright date update */
const currentYear = new Date().getFullYear();
crYearSpan.innerText = currentYear;

/* Add age in front of '.greetings' text and a series of birthday person's names
as long as the age. This is sequential, hence create steps where you increment
age count and add a name  */  
let agePart = 0;
let textPart = agePart;
const getHappyBdayClassEl = (text, addedClasses = '') => {
    const spanEl = document.createElement('span');
    spanEl.classList = 'happy-birthday ' + addedClasses;
    spanEl.innerText = text
    
    return spanEl;
};

/* Start fireworks animation on hover */
celBtn.onmouseover = () => {
    fireworks.forEach(el => el.classList.add('animate'));
};
celBtn.onmouseleave = () => {
    fireworks.forEach(el => el.classList.remove('animate'));
};
celBtn.onclick = (ev) => {
    ev.target.style.display = 'none';
    fireworks.forEach(el => el.classList.remove('animate'));
    makeGreets('Emma', 18, 'Tanti auguri di buon compleanno');
}

