const screens = document.querySelectorAll('.screen');
const choose_streamer_btns = document.querySelectorAll('.choose-streamer-btn');
const start_btn = document.getElementById('start-btn');

const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const game_container = document.getElementById('game-container');

let seconds =0;
let score=0;
let selected_streamer={}

start_btn.addEventListener('click', () => screens[0].classList.add('up'))

choose_streamer_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img')
        const src = img.getAttribute('src')
        const alt = img.getAttribute('alt')
        selected_streamer = { src,alt }
        screens[1].classList.add('up')
        setTimeout(createstreamer, 1000)
        startGame()
    })
})

function createstreamer(){
    const streamer = document.createElement('div')
    streamer.classList.add('streamer')
    const {x, y} = getRandomLocation()
    streamer.style.top= `${y}px`
    streamer.style.left=`${x}px`
    streamer.innerHTML = `<img src="${selected_streamer.src}" 
  alt="${selected_streamer.alt}" 
  style="transform: rotate(${Math.random() * 360}deg)" />`;
    streamer.addEventListener('click', catchstreamer)
    game_container.appendChild(streamer)
}

function getRandomLocation(){
    const width = window.innerWidth
    const height = window.innerHeight
    const x = Math.random() * (width - 200) + 100
    const y = Math.random() * (height - 200) + 100
    return {x, y}
}

function catchstreamer (){
    increaseScore()
    this.classList.add('caught')
    setTimeout(() => this.remove(), 2000)
    addstreamers()
}
function addstreamers(){
    setTimeout(createstreamer,1000)
    setTimeout(createstreamer,1500)
    
}

function startGame(){
    setInterval(increaseTime, 1000)
}
function increaseTime(){
    let m =Math.floor(seconds / 60)
    let s =seconds % 60
    m=m <10 ? `0${m}` : m 
    s=s <10 ? `0${s}` : s
    timeEl.innerHTML=`Time: ${m}:${s}`
    seconds++
}

function increaseScore(){
    score++
    scoreEl.innerHTML=`Score: ${score}`
}