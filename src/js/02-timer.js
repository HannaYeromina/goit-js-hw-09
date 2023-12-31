import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('button[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
let dataSelected = null;




function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}




const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
       if(selectedDates[0].getTime() <= new Date().getTime()) {
        window.alert("Please choose a date in the future");
        startBtn.disabled = true;
       } else {
         startBtn.disabled = false;
         dataSelected = selectedDates[0].getTime();
       }   
    },
};
  
startBtn.addEventListener("click", () => {
  if (dataSelected) {
    timerId = setInterval(() => { 
      if (dataSelected > new Date().getTime()) {
        const counter = convertMs(dataSelected - new Date().getTime())
        console.log(counter);
        dataDays.textContent = `${counter.days}`.padStart(2, '0');
        dataHours.textContent = `${counter.hours}`.padStart(2, '0');
        dataMinutes.textContent = `${counter.minutes}`.padStart(2, '0');
        dataSeconds.textContent = `${counter.seconds}`.padStart(2, '0');
      } else {
        clearInterval(timerId);
      }  
    }, 1000);
  }
});

  flatpickr("input#datetime-picker", options);

  

  