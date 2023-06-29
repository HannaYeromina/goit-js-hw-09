import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const date = new Date();
const startBtn = document.querySelector('button[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
let counter = 0;



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
       if(selectedDates[0].getTime() <= date.getTime()) {
        window.alert("Please choose a date in the future");
        startBtn.disabled = true;
       } else {
        startBtn.disabled = false;
        startBtn.addEventListener( "click", () => {
          timerId = setInterval( () => {
            
            counter = selectedDates[0].getTime() - date.getTime();
            //  for (let i = 0; i >= 0; i += 1000) {
            //   counter -= i;
            //   console.log(counter);
            //  }
            
            
           
            dataDays.textContent = `${convertMs(counter).days}`.padStart(2, '0');
            dataHours .textContent = `${convertMs(counter).hours}`.padStart(2, '0');
            dataMinutes.textContent = `${convertMs(counter).minutes}`.padStart(2, '0');
            dataSeconds.textContent = `${convertMs(counter).seconds}`.padStart(2, '0');
           
          }, 1000);
        });
       }   
    },
  };

  flatpickr("input#datetime-picker", options);

  

  