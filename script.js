

// DOM
const CHOICES = [
    {
        name: "paper",
        beats: "rock"
    },
    {
        name: "scissors",
        beats: "paper"
    },
    {
        name: "rock",
        beats: "scissors"
    },
]

const choiceButtons = document.querySelectorAll('.choice-btn')
const gameDiv = document.querySelector('.game')
const resultsDiv = document.querySelector('.results')
const resultDivs = document.querySelectorAll('.results_result')

const resultWinner = document.querySelector('.results_winner')
const resultText = document.querySelector('.results_text')
const playAgainBtn = document.querySelector('.play-again')

let nextBtn_div = document.querySelector('.next_btn_section')

let comp_score_div = document.querySelector('#comp_score')
let user_score_div = document.querySelector('#user_score')

let userScore = 0;
let compScore = 0;

let comp_score_get = JSON.parse(localStorage.getItem("comp_scored"))
let user_score_get = JSON.parse(localStorage.getItem("user_scored"))

if (user_score_get) {
    user_score_div.innerText = user_score_get
}
else if (comp_score_get) {
    comp_score_div.innerText = comp_score_get
}


// Game logic
choiceButtons.forEach(button => {
    button.addEventListener('click', () => {
        const choiceName = button.dataset.choice;
        const choice = CHOICES.find(choice => choice.name === choiceName)
        choose(choice)
    })
})

function choose(choice) {
    const aichoice = aiChoose()
    displayResults([choice, aichoice])
    displayWinner([choice, aichoice])
}

function aiChoose() {
    const rand = Math.floor(Math.random() * CHOICES.length)
    return CHOICES[rand]
}

function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
        setTimeout(() => {
            resultDiv.innerHTML = `
                <div class="choice ${results[idx].name}">
                <img src="/img/${results[idx].name}.png" alt="${results[idx].name}"/>
            `;
        }, 0);
    })

    gameDiv.classList.toggle('hidden')
    resultsDiv.classList.toggle('hidden')
}

function displayWinner(results) {
    setTimeout(() => {
        const userWins = isWinner(results)
        const aiWins = isWinner(results.reverse())

        if (userWins) {
            resultText.innerText = "YOU WIN"
            resultDivs[0].classList.toggle('winner')
            userScore = user_score_get
            userScore++;
            user_score_div.innerText = userScore;
            localStorage.setItem('user_scored', JSON.stringify(userScore))
            nextBtn_div.classList.toggle('hidden');

        }
        else if (aiWins) {
            resultText.innerText = "YOU LOST"
            resultDivs[1].classList.toggle('winner')
            keepScore(1)
            

        }
        else {
            resultText.innerText = "TIE UP"

        }

        resultWinner.classList.toggle('hidden');
        resultsDiv.classList.toggle('show-winner');

    }, 0)


}

function isWinner(results) {
    return results[0].beats === results[1].name;
}

// play ahain button
playAgainBtn.addEventListener('click', () => {
    gameDiv.classList.toggle('hidden')
    resultsDiv.classList.toggle('hidden')

    resultDivs.forEach(resultDiv => {
        resultDiv.innerHTML = ""
        resultDiv.classList.remove('winner')
    })

    resultText.innerText = ""
    resultWinner.classList.toggle('hidden')
    resultsDiv.classList.toggle('show-winner')
})

// score
function keepScore(point) {
    compScore = comp_score_get
    compScore += point
    comp_score_div.innerText = compScore
    localStorage.setItem('comp_scored', JSON.stringify(compScore))
}


// show / hide rules
const ruleButton = document.querySelector(".rules_btn");
const ruleWrapper = document.querySelector(".rule_wrapper");
const ruleBoxCloseButton = document.querySelector(".close_btn");

let isRuleBoxOpen = true;
ruleBoxCloseButton.addEventListener('click', () => {
    if (!isRuleBoxOpen) {
        ruleWrapper.style.display = "block";
    }
    else{
        ruleWrapper.style.display = "none";
       
    }
})

let ruleButtonClick = true;
ruleButton.addEventListener('click', () => {
    console.log('clicked')
    if (!isRuleBoxOpen) {
        ruleWrapper.style.display = "none";
    }
    else{
        ruleWrapper.style.display = "block";
        
    }
})

