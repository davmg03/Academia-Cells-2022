let months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Augosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  let weekdays = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miercoles',
    'Jueves',
    'Viernes',
    'Sabado',
  ];
  let giveaway = document.querySelector('.giveaway');
  let deadline = document.querySelector('.deadline');
  let items = document.querySelectorAll('.deadline-format h4');
  let tempDate = new Date();
  let tempYear = tempDate.getFullYear();
  let tempMonth = tempDate.getMonth();
  let tempDay = tempDate.getDate();
  let futureDate = new Date(tempYear, tempMonth, tempDay + 18, 8, 30, 0);
  let year = futureDate.getFullYear();
  let hours = futureDate.getHours();
  let minutes = futureDate.getMinutes();
  let month = futureDate.getMonth();
  month = months[month];
  let weekday = weekdays[futureDate.getDay()];
  let date = futureDate.getDate();
  giveaway.textContent = `El sorteo termina el ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}am`;
  let futureTime = futureDate.getTime();
  function getRemaindingTime() {
    let today = new Date().getTime();
    let t = futureTime - today;
    let oneDay = 24 * 60 * 60 * 1000;
    let oneHour = 60 * 60 * 1000;
    let oneMinute = 60 * 1000;
    let days = t / oneDay;
    days = Math.floor(days);
    let hours = Math.floor((t % oneDay) / oneHour);
    let minutes = Math.floor((t % oneHour) / oneMinute);
    let seconds = Math.floor((t % oneMinute) / 1000);
    let values = [days, hours, minutes, seconds];
    function format(item) {
      if (item < 10) {
        return (item = `0${item}`);
      }
      return item;
    }
  
    items.forEach(function (item, index) {
      item.innerHTML = format(values[index]);
    });
  
    if (t < 0) {
      clearInterval(countdown);
      deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired!</h4>`;
    }
  }
  let countdown = setInterval(getRemaindingTime, 1000);
  getRemaindingTime();