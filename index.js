const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const weekdays = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

const giveawayElement = document.querySelector('.giveaway');
const deadlineElement = document.querySelector('.deadline');
const countdownElements = document.querySelectorAll('.deadline-format h4');

const currentDate = new Date();
const futureDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 10, 10, 30, 0);

const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
const month = months[futureDate.getMonth()];
const weekday = weekdays[futureDate.getDay()];
const date = futureDate.getDate();

giveawayElement.textContent = `Giveaway ends on ${weekday}, ${date} ${month} ${year} at ${hours}:${minutes}am`;

const futureTime = futureDate.getTime();

function updateCountdown() {
  const currentTime = new Date().getTime();
  const timeRemaining = futureTime - currentTime;

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  const days = Math.floor(timeRemaining / oneDay);
  const remainingHours = Math.floor((timeRemaining % oneDay) / oneHour);
  const minutes = Math.floor((timeRemaining % oneHour) / oneMinute);
  const seconds = Math.floor((timeRemaining % oneMinute) / 1000);

  const values = [days, remainingHours, minutes, seconds];

  function format(item) {
    return item < 10 ? `0${item}` : item.toString();
  }

  countdownElements.forEach((element, index) => {
    element.innerHTML = format(values[index]);
  });

  if (timeRemaining < 0) {
    clearInterval(countdown);
    const expiredMessage = document.querySelector('.expired-message');
    deadlineElement.innerHTML = `<h4 class="expired expired-message">Sorry, this giveaway has expired! <br/> Please check back soon.</h4>`;

    expiredMessage.style.color = 'red';
    expiredMessage.style.fontWeight = 'bold';
    expiredMessage.textContent = expiredMessage.textContent.toUpperCase();
  }
}

let countdown = setInterval(updateCountdown, 1000);
updateCountdown();
