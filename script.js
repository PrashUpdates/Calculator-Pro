/* ==========================
   ELEMENTS
========================== */

const expression =
document.getElementById(
    "expression"
);

const result =
document.getElementById(
    "result"
);

const historyList =
document.getElementById(
    "historyList"
);

const clearHistoryBtn =
document.getElementById(
    "clearHistory"
);

const themeBtn =
document.getElementById(
    "themeBtn"
);

const themeIcon =
document.querySelector(
    ".theme-icon"
);

const liveTime =
document.getElementById(
    "liveTime"
);

const memoryIndicator =
document.getElementById(
    "memoryIndicator"
);

/* ==========================
   VARIABLES
========================== */

let currentInput = "";

let history =
JSON.parse(
    localStorage.getItem(
        "calculatorHistory"
    )
) || [];

let memoryValue =
Number(
    localStorage.getItem(
        "memoryValue"
    )
) || 0;

/* ==========================
   DISPLAY
========================== */

function updateDisplay(){

    expression.textContent =
    currentInput || "0";
}

/* ==========================
   MEMORY DISPLAY
========================== */

function updateMemoryDisplay(){

    if(
        memoryValue === 0
    ){

        memoryIndicator.textContent =
        "";

    }else{

        memoryIndicator.textContent =
        "";
    }
}

/* ==========================
   THEME SYSTEM
========================== */

if(
    localStorage.getItem(
        "theme"
    ) === "light"
){

    document.body
    .classList.add(
        "light"
    );

    themeIcon.textContent =
    "◑";
}

themeBtn.addEventListener(
    "click",
    () => {

        document.body
        .classList.toggle(
            "light"
        );

        if(
            document.body
            .classList.contains(
                "light"
            )
        ){

            localStorage.setItem(
                "theme",
                "light"
            );

            themeIcon.textContent =
            "◑";

        }else{

            localStorage.setItem(
                "theme",
                "dark"
            );

            themeIcon.textContent =
            "◐";
        }
    }
);

/* ==========================
   LIVE CLOCK
========================== */

function updateClock(){

    const now =
    new Date();

    liveTime.textContent =
    now.toLocaleString();
}

setInterval(
    updateClock,
    1000
);

updateClock();

/* ==========================
   HISTORY
========================== */

function saveHistory(){

    localStorage.setItem(
        "calculatorHistory",
        JSON.stringify(
            history
        )
    );
}

function renderHistory(){

    if(
        history.length === 0
    ){

        historyList.innerHTML =
        `
        <div class="empty-history">
            No calculations yet
        </div>
        `;

        return;
    }

    historyList.innerHTML =
    "";

    [...history]
    .reverse()
    .forEach(item => {

        const div =
        document.createElement(
            "div"
        );

        div.className =
        "history-item";

        div.textContent =
        item;

        historyList.appendChild(
            div
        );
    });
}

clearHistoryBtn.addEventListener(
    "click",
    () => {

        history = [];

        saveHistory();

        renderHistory();
    }
);

/* ==========================
   STARTUP
========================== */

renderHistory();

updateDisplay();

updateMemoryDisplay();

/* ==========================
   BUTTONS
========================== */

const buttons =
document.querySelectorAll(
    ".buttons button"
);

const equalBtn =
document.querySelector(
    ".equal"
);

/* ==========================
   CALCULATE
========================== */

function calculate(){

    if(
        currentInput.trim() === ""
    ){
        return;
    }

    try{

        let expressionToSolve =
        currentInput;

        /* Percentage Logic */

        expressionToSolve =
        expressionToSolve.replace(
            /(\d+(\.\d+)?)%(\d+(\.\d+)?)/g,
            "(($1*$3)/100)"
        );

        expressionToSolve =
        expressionToSolve.replace(
            /(\d+(\.\d+)?)%/g,
            "($1/100)"
        );

        const answer =
        eval(
            expressionToSolve
        );

        result.textContent =
        answer;

        history.push(
            currentInput +
            " = " +
            answer
        );

        saveHistory();

        renderHistory();

        currentInput =
        answer.toString();

        updateDisplay();

    }catch{

        result.textContent =
        "Error";
    }
}

/* ==========================
   MAIN BUTTON EVENTS
========================== */

buttons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const value =
            button.textContent
            .trim();

            /* Clear */

            if(
                value === "C"
            ){

                currentInput = "";

                result.textContent =
                "0";

                updateDisplay();

                return;
            }

            /* Delete */

            if(
                value === "⌫"
            ){

                currentInput =
                currentInput.slice(
                    0,
                    -1
                );

                updateDisplay();

                return;
            }

            currentInput += value;

            updateDisplay();
        }
    );
});

/* ==========================
   EQUAL BUTTON
========================== */

equalBtn.addEventListener(
    "click",
    () => {

        calculate();
    }
);

/* ==========================
   MEMORY BUTTONS
========================== */

const mcBtn =
document.getElementById(
    "mcBtn"
);

const mrBtn =
document.getElementById(
    "mrBtn"
);

const mPlusBtn =
document.getElementById(
    "mPlusBtn"
);

const mMinusBtn =
document.getElementById(
    "mMinusBtn"
);

/* ==========================
   MEMORY SAVE
========================== */

function saveMemory(){

    localStorage.setItem(
        "memoryValue",
        memoryValue
    );

    updateMemoryDisplay();
}

/* ==========================
   MC
========================== */

mcBtn.addEventListener(
    "click",
    () => {

        memoryValue = 0;

        saveMemory();

        result.textContent =
        "Memory Cleared";
    }
);

/* ==========================
   MR
========================== */

mrBtn.addEventListener(
    "click",
    () => {

        currentInput =
        memoryValue.toString();

        updateDisplay();

        result.textContent =
        memoryValue;
    }
);

/* ==========================
   M+
========================== */

mPlusBtn.addEventListener(
    "click",
    () => {

        let value =
        Number(
            result.textContent
        );

        if(
            isNaN(value)
        ){

            value =
            Number(
                currentInput
            );
        }

        if(
            !isNaN(value)
        ){

            memoryValue +=
            value;

            saveMemory();

            result.textContent =
            "M+ : " +
            memoryValue;
        }
    }
);

/* ==========================
   M-
========================== */

mMinusBtn.addEventListener(
    "click",
    () => {

        let value =
        Number(
            result.textContent
        );

        if(
            isNaN(value)
        ){

            value =
            Number(
                currentInput
            );
        }

        if(
            !isNaN(value)
        ){

            memoryValue -=
            value;

            saveMemory();

            result.textContent =
            "M- : " +
            memoryValue;
        }
    }
);

/* ==========================
   START MEMORY
========================== */

updateMemoryDisplay();

/* ==========================
   SCIENTIFIC BUTTONS
========================== */

const sqrtBtn =
document.querySelector(
    ".sqrt-btn"
);

const squareBtn =
document.querySelector(
    ".square-btn"
);

const inverseBtn =
document.querySelector(
    ".inverse-btn"
);

const percentBtn =
document.getElementById(
    "percentBtn"
);

/* ==========================
   SQRT
========================== */

sqrtBtn.addEventListener(
    "click",
    () => {

        let value =
        Number(
            currentInput ||
            result.textContent
        );

        if(
            value < 0
        ){

            result.textContent =
            "Error";

            return;
        }

        const answer =
        Math.sqrt(value);

        result.textContent =
        answer;

        currentInput =
        answer.toString();

        updateDisplay();
    }
);

/* ==========================
   SQUARE
========================== */

squareBtn.addEventListener(
    "click",
    () => {

        let value =
        Number(
            currentInput ||
            result.textContent
        );

        const answer =
        value * value;

        result.textContent =
        answer;

        currentInput =
        answer.toString();

        updateDisplay();
    }
);

/* ==========================
   INVERSE
========================== */

inverseBtn.addEventListener(
    "click",
    () => {

        let value =
        Number(
            currentInput ||
            result.textContent
        );

        if(
            value === 0
        ){

            result.textContent =
            "Error";

            return;
        }

        const answer =
        1 / value;

        result.textContent =
        answer;

        currentInput =
        answer.toString();

        updateDisplay();
    }
);

/* ==========================
   PERCENT BUTTON
========================== */

percentBtn.addEventListener(
    "click",
    () => {

        const lastChar =
        currentInput.slice(-1);

        if(
            currentInput !== "" &&
            !isNaN(lastChar)
        ){

            currentInput += "%";

            updateDisplay();
        }
    }
);

/* ==========================
   KEYBOARD SUPPORT
========================== */

document.addEventListener(
    "keydown",
    e => {

        const key =
        e.key;

        if(
            (
                key >= "0" &&
                key <= "9"
            ) ||

            key === "+" ||
            key === "-" ||
            key === "*" ||
            key === "/" ||
            key === "." ||
            key === "(" ||
            key === ")" ||
            key === "%"
        ){

            currentInput += key;

            updateDisplay();
        }

        if(
            key === "Enter"
        ){

            calculate();
        }

        if(
            key === "Backspace"
        ){

            currentInput =
            currentInput.slice(
                0,
                -1
            );

            updateDisplay();
        }

        if(
            key === "Escape"
        ){

            currentInput = "";

            result.textContent =
            "0";

            updateDisplay();
        }

        /* Shortcuts */

        if(
            key === "r"
        ){

            sqrtBtn.click();
        }

        if(
            key === "s"
        ){

            squareBtn.click();
        }

        if(
            key === "i"
        ){

            inverseBtn.click();
        }
    }
);

/* ==========================
   BUTTON ANIMATION
========================== */

document
.querySelectorAll(
    "button"
)
.forEach(btn => {

    btn.addEventListener(
        "click",
        () => {

            btn.style.transform =
            "scale(0.95)";

            setTimeout(
                () => {

                    btn.style.transform =
                    "";

                },
                100
            );
        }
    );
});

/* ==========================
   AUTO SCROLL HISTORY
========================== */

const observer =
new MutationObserver(
    () => {

        historyList.scrollTop =
        0;
    }
);

observer.observe(
    historyList,
    {
        childList:true
    }
);

/* ==========================
   STARTUP
========================== */

console.clear();

console.log(
    "Calculator Pro+ Loaded"
);

updateDisplay();

updateMemoryDisplay();

renderHistory();