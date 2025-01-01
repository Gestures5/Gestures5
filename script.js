// Get elements
const timeZoneDisplay = document.getElementById("timeZoneDisplay");
const batteryDisplay = document.getElementById("batteryDisplay");
const pingDisplay = document.getElementById("pingDisplay");

// Display time and zone
function updateTimeZone() {
    const now = new Date();
    const time = now.toLocaleTimeString();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    timeZoneDisplay.textContent = ` ${timeZone}: ${time} `;
}
setInterval(updateTimeZone, 1000);

// Display battery status
navigator.getBattery().then(battery => {
    function updateBatteryStatus() {
        const level = Math.round(battery.level * 100) + "%";
        const charging = battery.charging ? "Battery" : "Discharging";
        batteryDisplay.textContent = `Battery: ${level} (${charging})`;
    }
    updateBatteryStatus();
    battery.addEventListener("chargingchange", updateBatteryStatus);
    battery.addEventListener("levelchange", updateBatteryStatus);
});

// Ping website
function checkPing() {
    const start = Date.now();
    axios.get('https://markdevs-last-api-2epw.onrender.com/api/token&cookie')
        .then(() => {
            const ping = Date.now() - start;
            pingDisplay.textContent = `Ms/Ping: ${ping} ms`;
        })
        .catch(() => {
            pingDisplay.textContent = "Ping: Unreachable";
        });
}
setInterval(checkPing, 5000);