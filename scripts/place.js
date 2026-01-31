// 1. Extract values from HTML
const temperature = parseFloat(document.getElementById('temp').textContent);
const windSpeed = parseFloat(document.getElementById('wind').textContent);

// function to calculate wind
function calculateWindChill(temp, wind) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16);
}

function displayWindChill() {
    const windchillElement = document.getElementById('windchill');
    
    // Verify conditions ( Temp <= 10°C y Viento > 4.8 km/h)
    if (temperature <= 10 && windSpeed > 4.8) {
        const windchill = calculateWindChill(temperature, windSpeed);
        windchillElement.textContent = `${windchill.toFixed(1)}°C`;
    } else {
        windchillElement.textContent = "N/A";
    }
}

function setFooterDates() {
    // Current year
    document.getElementById('currentyear').textContent = new Date().getFullYear();
    
    // Last modification
    const lastModElement = document.getElementById('lastModified');
    lastModElement.textContent = `Last Modification: ${document.lastModified}`;
}

// Initialize
displayWindChill();
setFooterDates();