import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';  

const startBtn = document.querySelector('button[data-start]');
const timerContainer = document.querySelector('.timer')
    
startBtn.addEventListener('click', startTimer);
startBtn.setAttribute('disabled', true);

let date = [];

const options = {
  enableTime: true,
    time_24hr: true,
  
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      
      if (selectedDates[0] < new Date()) {
          Notiflix.Notify.failure("Please choose a date in the future");
      } else {
          startBtn.removeAttribute('disabled');
        //   console.log(selectedDates[0].getTime());
          date.push(selectedDates[0].getTime())
      }
  },
};



flatpickr("#datetime-picker", options);

function startTimer() {
    const currentDate = options.defaultDate.getTime();
    let chooseDate = date[0];



    setInterval(() => {
        const deltaTime = chooseDate - currentDate;
        const {days, hours, minutes, seconds} = convertMs(deltaTime)
        console.log(`${days}::${hours}::${minutes}::${seconds}`);

        timerContainer.innerHTML = `<div class="field">
        <span class="value" data-days>${days}</span>
        <span class="label">Days</span>
      </div>
      <div class="field">
        <span class="value" data-hours>${hours}</span>
        <span class="label">Hours</span>
      </div>
      <div class="field">
        <span class="value" data-minutes>${minutes}</span>
        <span class="label">Minutes</span>
      </div>
      <div class="field">
        <span class="value" data-seconds>${seconds}</span>
        <span class="label">Seconds</span>
      </div>`;

        chooseDate -= 1000;
        startBtn.setAttribute('disabled', true);
    }, 1000)
   
}

function pad(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
