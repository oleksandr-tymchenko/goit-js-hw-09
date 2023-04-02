
const body = document.querySelector('body')
const startBtn = document.querySelector('button[data-start]')
const stopBtn = document.querySelector('button[data-stop]')

startBtn.addEventListener('click', showColorSwitcher);
stopBtn.addEventListener('click', stopColorSwitcher);

onClickStop();


let intervalId = null;

function showColorSwitcher() {
    intervalId = setInterval(() => {
      body.style.backgroundColor = getRandomHexColor();
      
    }, 1000);
   onClickStart()
};

function stopColorSwitcher() {
    clearInterval(intervalId);
   onClickStop()
};

function onClickStart() {
    startBtn.setAttribute('disabled', true);
    stopBtn.removeAttribute('disabled');
}
function onClickStop() {
    startBtn.removeAttribute('disabled');
    stopBtn.setAttribute('disabled', true);
}


function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}