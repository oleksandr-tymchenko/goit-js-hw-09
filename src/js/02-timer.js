import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';  

const startBtn = document.querySelector('button[data-start]');
const timerContainer = document.querySelector('.timer')

startBtn.addEventListener('click', startTimer);

disactivateBtn(true);
updateDate('00', '00', '00', '00');

let date = [];
let timerId = null;


const options = {
  enableTime: true,
    time_24hr: true,
    clickOpens: true,
  
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      
      if (selectedDates[0] < new Date()) {
          Notiflix.Notify.failure("Please choose a date in the future");
      } else {
          disactivateBtn(false);
          options.clickOpens = false;
        //   console.log(selectedDates[0].getTime());
          date.push(selectedDates[0].getTime())
      }
  },
};


function changeClickOpens() {
   options.clickOpens = false; 
}


console.log(flatpickr("#datetime-picker", options));


console.log(options.clickOpens)

function startTimer() {
    changeClickOpens();
    const currentDate = options.defaultDate.getTime();
    let chooseDate = date[0];
    disactivateBtn(true);
    // changeClickOpens();

    activateChangeColor();
    
    // setInterval(countShowTimer, 1000, currentDate, chooseDate);

    timerId = setInterval(() => {
        // while (chooseDate !== currentDate) {
        const deltaTime = chooseDate - currentDate;
        if (deltaTime > 0) {
            const { days, hours, minutes, seconds } = convertMs(deltaTime);
        
            updateDate(days, hours, minutes, seconds);
        
            chooseDate -= 1000; 
        } else {
            clearInterval(timerId);
            activateChangeColor()
        }
        
        
        // clearInterval(timerId);
    }, 1000);
   
};

// function setDates() {
    
// };

function disactivateBtn (state){
    startBtn.disabled = state;
};

function activateChangeColor() {
    timerContainer.classList.toggle('timer__active')
};

function updateDate(days, hours, minutes, seconds) {
    timerContainer.innerHTML = `<div class="field">
        <span class="value" data-days>${days}</span>
        <span class="label">DAYS</span>
      </div>
      <div class="field">
        <span class="value" data-hours>${hours}</span>
        <span class="label">HOURS</span>
      </div>
      <div class="field">
        <span class="value" data-minutes>${minutes}</span>
        <span class="label">MINUTES</span>
      </div>
      <div class="field">
        <span class="value" data-seconds>${seconds}</span>
        <span class="label">SECONDS</span>
      </div>`;

}


// function countShowTimer (currentDate, chooseDate) {
//      const deltaTime = chooseDate - currentDate;
//         const {days, hours, minutes, seconds} = convertMs(deltaTime)
//         // console.log(`${days}::${hours}::${minutes}::${seconds}`);

//         timerContainer.innerHTML = `<div class="field">
//         <span class="value" data-days>${days}</span>
//         <span class="label">Days</span>
//       </div>
//       <div class="field">
//         <span class="value" data-hours>${hours}</span>
//         <span class="label">Hours</span>
//       </div>
//       <div class="field">
//         <span class="value" data-minutes>${minutes}</span>
//         <span class="label">Minutes</span>
//       </div>
//       <div class="field">
//         <span class="value" data-seconds>${seconds}</span>
//         <span class="label">Seconds</span>
//       </div>`;

//         chooseDate -= 1000;
//         startBtn.setAttribute('disabled', true);
//     };

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
};
