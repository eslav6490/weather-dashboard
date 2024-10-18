const apiKey = 'a81f51ae660c416bb434cd1fa1f4d55c78542f0a18fc437eb5b77923f7a99106';
const applicationKey = '8e8f95d471db42ee8f6144d58755d8d2fd7ace1693ba4d0ca6f55ff1e8b0592d';

const apiUrl = `https://api.ambientweather.net/v1/devices?applicationKey=${applicationKey}&apiKey=${apiKey}`;

// Store history of values to track trends (last 3 values)
let valueHistory = {
    tempf: [],
    tempinf: [],
    humidity: [],
    humidityin: [],
    windspeedmph: [],
    baromrelin: [],
    pm25: [],
    pm25_24h: []
};

// Set dark mode on page load
document.body.classList.add('dark-mode');

// Dark mode toggle functionality
const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.checked = true; // Default to dark mode
darkModeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});

// Fetch weather data when the page loads
getWeatherData();

// Automatically refresh the data every 1 minute (60000 ms)
setInterval(getWeatherData, 10000);

// Flash effect for changed values
function applyFlashEffect(element) {
    element.classList.add('flash');
    setTimeout(() => element.classList.remove('flash'), 1000); // Remove the flash effect after 1 second
}

// Add value to history and maintain the last 3 values
function updateHistory(history, newValue) {
    history.push(newValue);
    if (history.length > 3) history.shift(); // Keep the last 3 values
}

// Compare trends based on last 3 values, show only up/down arrows
function getTrend(history) {
    if (history.length < 3) return null;
    const [oldest, middle, newest] = history;
    if (newest > oldest) return '↑'; // Increasing trend
    if (newest < oldest) return '↓'; // Decreasing trend
    return ''; // No trend, remove arrow
}

// Compare old and new data, and apply flash effect if values change
function updateValue(elementId, newValue, unit, history) {
    const element = document.getElementById(elementId);
    const currentValue = element.textContent.replace(unit, '').trim();

    if (newValue != currentValue) {
        applyFlashEffect(element);
        element.textContent = (newValue !== null && newValue !== undefined) ? `${newValue} ${unit}` : 'N/A';
    }

    // Update history and show trend
    updateHistory(history, newValue);
    const trend = getTrend(history);
    const trendElement = document.getElementById(`${elementId}-trend`);
    if (trendElement) trendElement.textContent = trend || '';
}

async function getWeatherData() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const weatherData = data[0].lastData;

        // Update and compare data for flashing effect
        updateValue('tempf', weatherData.tempf, '°F', valueHistory.tempf);
        updateValue('tempinf', weatherData.tempinf, '°F', valueHistory.tempinf);
        updateValue('humidity', weatherData.humidity, '%', valueHistory.humidity);
        updateValue('humidityin', weatherData.humidityin, '%', valueHistory.humidityin);
        updateValue('windspeed', weatherData.windspeedmph, 'mph', valueHistory.windspeedmph);
        updateValue('pressure', weatherData.baromrelin, 'inHg', valueHistory.baromrelin);
        updateValue('pm25', weatherData.pm25, 'µg/m³', valueHistory.pm25);
        updateValue('pm25_24h', weatherData.pm25_24h, 'µg/m³', valueHistory.pm25_24h);

        // No arrows for rain data
        document.getElementById('hourlyrainin').textContent = weatherData.hourlyrainin !== null ? `${weatherData.hourlyrainin} in` : 'N/A';
        document.getElementById('dailyrainin').textContent = weatherData.dailyrainin !== null ? `${weatherData.dailyrainin} in` : 'N/A';
        document.getElementById('weeklyrainin').textContent = weatherData.weeklyrainin !== null ? `${weatherData.weeklyrainin} in` : 'N/A';
        document.getElementById('monthlyrainin').textContent = weatherData.monthlyrainin !== null ? `${weatherData.monthlyrainin} in` : 'N/A';

        // Update "Last Updated" timestamp
        const now = new Date();
        const lastUpdated = now.toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' });
        document.getElementById('last-updated').textContent = `Last Updated: ${lastUpdated}`;

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}
