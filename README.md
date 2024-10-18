Weather Dashboard

This project is a weather dashboard using data from an Ambient Weather Station, displaying various weather parameters such as temperature, humidity, wind speed, pressure, PM2.5 air quality, and rain data. The dashboard features dark mode, automatic data refresh, and trend indication for temperature, humidity, wind speed, pressure, and air quality.

Features

Dark Mode: The dashboard defaults to dark mode and includes a toggle switch to switch between light and dark modes.
Live Data: Weather data is fetched from the Ambient Weather API and updated every minute.
Trend Indication: For temperature, humidity, wind speed, pressure, and PM2.5 air quality, arrows indicate whether values are increasing (↑) or decreasing (↓).
Flash Effect: When a value changes during an update, it flashes briefly to indicate the change.
Responsive Design: The dashboard is styled with CSS for mobile and desktop viewing.


Technologies Used

HTML: For structuring the dashboard.
CSS: For styling and animations, including the flash effect and dark mode.
JavaScript: For fetching data from the API, updating the dashboard, and handling trends.

Project Setup

Clone the Repository:

git clone https://github.com/your-username/weather-dashboard.git
cd weather-dashboard
Edit API Keys:

Open the script.js file and replace the apiKey and applicationKey variables with your own keys from the Ambient Weather API.
Run Locally:

You can use any local server to serve the HTML file. If you have Python installed, you can run a local server with:

python -m http.server
Then, open your browser and go to http://localhost:8000 to view the dashboard.
File Structure
.
├── index.html       # Main dashboard file
├── style.css        # CSS file for styling and animations
└── script.js        # JavaScript for data fetching, updates, and trends


Usage

Dark Mode: Use the toggle switch in the top right corner to enable or disable dark mode. The page defaults to dark mode on load.
Live Updates: Data is fetched and updated every 1 minute.
Flashing Values: Values flash briefly when they are updated.
Trends: Up (↑) and down (↓) arrows next to values indicate whether the value is increasing or decreasing over the last three updates.
Rain Data: No trend arrows are displayed for rain data fields.
Example Dashboard Screenshot

Future Improvements
Add more detailed weather data such as hourly or daily forecasts.
Incorporate additional sensors or API data from the weather station.
