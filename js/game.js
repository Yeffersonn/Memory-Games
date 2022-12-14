

/* VARIABLES USER */

const userName = document.querySelector('#user-name')
const userSession = document.querySelector('.user-signOff')  

userSession.addEventListener('click', ()=>{
    window.location = '../index.html'
})

/* CONTAINERS */
const grid = querySelectorClass('grid')
const gamesOptions = querySelectorClass('games-options')
const game = querySelectorClass('game-container')
const wordleGame = querySelectorClass('wordle-game')
const spinner = querySelectorClass('spinner-container')
const finallyGame = querySelectorClass('finally-game-container')

/* HEADER GAME */

const spanPlayer = querySelectorClass('player')
const spanTimer = querySelectorClass('timer')

/* FINALLY GAME */

const finallyPages = querySelectorClass('finally-game-pages')
const highScore = querySelectorClass('highscore-container')

gamesOptions.addEventListener('click', ({target})=>{
    if(target.classList.contains('button-games')){
        if(target.id == 'memorama'){
            loadMemorama();
            
        }else if(target.id == 'wordle'){
            window.location = '../pages/wordle.html'
        }
        gamesOptions.classList.add('inactive')
    }
})

finallyPages.addEventListener('click', ({target})=>{

    if(target.classList.contains('replay')){
        loadMemorama();
    }
    else if(target.classList.contains('inicio')){
        window.location = '../pages/games.html'
    }
    else if(target.classList.contains('highscore')){
        finallyGame.classList.add('inactive')
        highScore.classList.remove('inactive')
    }

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

    if(grid.hasChildNodes()){
        while(grid.hasChildNodes()){
            grid.firstChild.remove();
            
        }
    }

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
    spanTimer.innerHTML = '0'
    this.loop = setInterval(()=>{
        const currentTime  = +spanTimer.innerHTML;
        spanTimer.innerHTML = currentTime + 1;
    },1000)
}

window.onload = () =>{
    userName.textContent = localStorage.getItem('userInGame');
    spinner.classList.remove('inactive');
    game.classList.add('inactive');
    setTimeout(() => {
        spinner.classList.add('inactive');
        gamesOptions.classList.remove('inactive')
    }, 2000);
}

function loadMemorama(){
    spinner.classList.remove('inactive');
    game.classList.add('inactive');
    highScore.classList.add('inactive')
    setTimeout(() => {
        spinner.classList.add('inactive');
        game.classList.remove('inactive');
        starTimer();
    }, 2000);

    spanPlayer.textContent  = localStorage.getItem('userInGame');
    loadGame();
}

/* function loadWordle(){
    spinner.classList.remove('inactive');
    wordleGame.classList.add('inactive');
    setTimeout(() => {
        spinner.classList.add('inactive');
        wordleGame.classList.remove('inactive');
        starTimer();
    }, 2000);
} */








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
            

            user.textContent = `Usuario: ${spanPlayer.innerHTML}`
            timeUser.textContent = `Tiempo: ${spanTimer.innerHTML} segundos`
            
            const usuario = {
                nombre : spanPlayer.innerHTML,
                tiempo : spanTimer.innerHTML
            }

            guardarTimeLS(usuario);

        },500)
        
    }
}

function guardarTimeLS(timeUser){
    const timesLS = obtenerTimesLS();

    timesLS.push(timeUser);

    localStorage.setItem('tiempos', JSON.stringify(timesLS))

    agregarHighScore(timesLS);
}

function agregarHighScore(timesLS){

    const tbody = querySelectorClass('tiempos')

    timesLS.forEach(usuario =>{
        let highScoreUser = document.createElement('tr')
        highScoreUser.innerHTML = `
            <td >${usuario.nombre}</td>
            <td >${usuario.tiempo}</td>
        `;
        tbody.appendChild(highScoreUser);
    })
}

function obtenerTimesLS(){

    if(localStorage.getItem('tiempos') == null ){
        return []
    }else{
        return JSON.parse(localStorage.getItem('tiempos'))
    }
}



































/* Funciones Fundamentales */
function querySelectorClass (selector){
    return document.querySelector(`.${selector}`);
}
function querySelectorId (selector){
    return document.querySelector(`#${selector}`);
}
