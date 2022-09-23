
const grid = querySelectorClass('grid')
const game = querySelectorClass('game-container')
const spinner = querySelectorClass('spinner-container')
const finallyGame = querySelectorClass('finally-game-container')

/* HEADER GAME */

const spanPlayer = querySelectorClass('player')
const spanTimer = querySelectorClass('timer')

/* FINALLY GAME */

const highScoreBtn = querySelectorId('highscore') 
const replayBtn = querySelectorId('replay')

replayBtn.addEventListener('click', ()=>{
    window.location = '../pages/games.html'
})

/* PREVIEW GAME */


const characters = [
    'beth',
    'jerry',
    'jessica',
    'morty',
    'pessoa-passaro',
    'pickle-rick',
    'rick',
    'summer',
    'meeseeks',
    'scroopy',
];


function loadGame(){

    const duplicateCharacters = [...characters, ...characters]

    const shuffledArray  = duplicateCharacters.sort( () => Math.random()-0.5 )

    shuffledArray.forEach(character =>{
        const card  = createCard(character);
        grid.append(card);
    })
}



function createCard(character){

    const card = document.createRange().createContextualFragment(`
        <div class="card" data-character='${character}'>
            <div style="background-image: url('../images/${character}.png');"  class="face front"></div>
            <div class="face back" ></div>
        </div>
    `);

    return card;
}

function starTimer(){

    this.loop = setInterval(()=>{
    
        const currentTime  = +spanTimer.innerHTML;
        spanTimer.innerHTML = currentTime + 1;
    },1000)
}

window.onload = () =>{

    spinner.classList.remove('inactive');
    game.classList.add('inactive');
    setTimeout(() => {
        spinner.classList.add('inactive');
        game.classList.remove('inactive');
        starTimer();
    }, 2000);

    spanPlayer.textContent  = localStorage.getItem('userInGame');
    loadGame();
}





/* GAME */

let firstCard = '';
let secondCard = '';

grid.addEventListener('click', ({target})=>{
    
    if(target.parentElement.classList.contains('reveal-card')){
        return;
    }else{
        if(target.classList.contains('face')){
            if(firstCard === ''){
                target.parentElement.classList.add('reveal-card')
                firstCard = target.parentElement;
            }else if(secondCard === ''){
                target.parentElement.classList.add('reveal-card')
                secondCard = target.parentElement;
                checkCards();
            }
        }
    }
    
})

function checkCards(){
    
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if( firstCharacter == secondCharacter ){
        console.log('acertado')

        setTimeout(()=>{
            firstCard.firstElementChild.classList.add('disabled-card')
            secondCard.firstElementChild.classList.add('disabled-card')
            
            
            firstCard = '';
            secondCard = '';

            checkEndgame();
            
        },300)

    }else{
        setTimeout(()=>{
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';
        },500)
    }
}

function checkEndgame(){
    const disabledCards = document.querySelectorAll('.disabled-card');

    if(disabledCards.length == 20){

        const timeUser = querySelectorClass('time-user')
        const user = querySelectorClass('user')

        game.classList.add('inactive')
        finallyGame.classList.remove('inactive')
        
        setTimeout(()=>{
            clearInterval(this.loop)
            /* alert(`Juego Terminado: ${spanTimer.innerHTML} segundos`) */
            user.textContent = `Usuario: ${spanPlayer.innerHTML}`
            timeUser.textContent = `Tiempo: ${spanTimer.innerHTML} segundos`
        },500)
        
    }
}

































/* Funciones Fundamentales */
function querySelectorClass (selector){
    return document.querySelector(`.${selector}`);
}
function querySelectorId (selector){
    return document.querySelector(`#${selector}`);
}
