// ========== DOM ELEMENTS ==========
const countryInput = document.querySelector('.country');
const cityInput = document.querySelector('.city');
const searchBtn = document.querySelector('.searchbtn');
const locationDisplay = document.querySelector('.location');
const dateDisplay = document.querySelector('.date');
const prayerList = document.querySelector('.prayer-list');

// ========== EVENT LISTENERS ==========
searchBtn.addEventListener('click', () => {
  fetchPrayerTimes();
});

// ========== MAIN FUNCTION ==========
function fetchPrayerTimes() {
  const country = countryInput.value.trim();
  const city = cityInput.value.trim();

  // Validate user input
  if (!country || !city) {
    alert('YOU MUST ENTER BOTH YOUR COUNTRY AND CITY');
    return;
  }

  // API endpoint for prayer times
  const PRAYER_API = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`;

  fetch(PRAYER_API)
    .then(response => response.json())
    .then(data => {
      // Check if API returned success
      if (data.code !== 200) {
        alert('ERROR DETECTED: ' + (data.status || 'UNKNOWN ERROR'));
        return;
      }

      // Display location and date
      locationDisplay.textContent = `${city.toUpperCase()}, ${country.toUpperCase()}`;
      dateDisplay.textContent = data.data.date.readable;

      // Clear previous results
      prayerList.innerHTML = '';

      // Loop through prayer timings and create list items
      const timings = data.data.timings;
      for (let prayer in timings) {
        const li = document.createElement('li');
        li.textContent = `${prayer} : ${timings[prayer]}`;
        prayerList.appendChild(li);
      }
    })
    .catch(err => {
      alert('API ERROR: ' + err.message);
    });
}

