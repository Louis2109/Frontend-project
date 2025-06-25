const weatherForm = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const weatherResult = document.getElementById('weather-result');
const errorMessage = document.getElementById('error-message');

// Replace with your own OpenWeatherMap API key!
const API_KEY = 'c3e616771364a879798c4a4c1584f45b';

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (!city) return;
    weatherResult.classList.add('hidden');
    errorMessage.classList.add('hidden');
    errorMessage.textContent = '';

    try {
        // Fetch weather data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        // Show weather
        showWeather(data);
    } catch (err) {
        errorMessage.textContent = err.message;
        errorMessage.classList.remove('hidden');
    }
});

function showWeather(data) {
    // Extract main info
    const { name, sys, weather, main } = data;
    const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
    weatherResult.innerHTML = `
    <div class="weather-main">${Math.round(main.temp)}&deg;C</div>
    <img class="weather-icon" src="${iconUrl}" alt="${weather[0].main}"/>
    <div><strong>${weather[0].main}</strong> in ${name}, ${sys.country}</div>
    <div>Feels like: ${Math.round(main.feels_like)}&deg;C</div>
    <div>Humidity: ${main.humidity}%</div>
  `;
    weatherResult.classList.remove('hidden');
}
