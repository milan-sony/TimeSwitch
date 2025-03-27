// Function to convert time
function convertTime() {
    let inputTime = document.getElementById("timeInput").value.trim();

    // Normalize input by replacing '.' with ':'
    inputTime = inputTime.replace('.', ':');

    // Check if input matches HH:MM format
    if (/^(?:[01]?\d|2[0-3]):[0-5]\d$/.test(inputTime)) {
        const [hours, minutes] = inputTime.split(":").map(Number);
        let period = "AM";
        let convertedHours = hours;

        // Convert to 12-hour format
        if (hours === 0) {
            convertedHours = 12; // Midnight
        } else if (hours === 12) {
            period = "PM"; // Noon
        } else if (hours > 12) {
            convertedHours = hours - 12;
            period = "PM";
        }

        // Format hours and minutes to always have two digits
        const formattedHours = String(convertedHours).padStart(2, "0");
        const formattedMinutes = String(minutes).padStart(2, "0");

        const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;
        document.getElementById("result").innerText = `Converted Time: ${formattedTime}`;
    } else {
        // Alert the user for invalid input
        alert("Please enter a valid time in HH:MM format (24-hour format).");
        document.getElementById("result").innerText = "";
    }
}

function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Determine AM or PM suffix
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Format minutes and seconds to always be two digits
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    // Construct the time string
    const timeString = `${String(hours).padStart(2, '0')}:${formattedMinutes}:${formattedSeconds} ${ampm}`;

    // Update the clock display
    document.getElementById('clock').textContent = timeString;
}

// Update the clock every second
setInterval(updateClock, 1000);
updateClock(); // Initial call to set the clock immediately

function updateClock2() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Format hours, minutes, and seconds to always be two digits
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    // Construct the time string in 24-hour format
    const timeString = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;

    // Update the clock display
    document.getElementById('clock2').textContent = timeString;
}

// Update the clock every second
setInterval(updateClock2, 1000);
updateClock2(); // Initial call to set the clock immediately

// Event listener for button click
document.getElementById("convertButton").addEventListener("click", convertTime);

// Event listener for Enter key press
document.getElementById("timeInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        convertTime();
    }
});

// Event listener for input field to clear result when empty
document.getElementById("timeInput").addEventListener("input", function () {
    if (this.value.trim() === "") {
        document.getElementById("result").innerText = ""; // Clear the result
    }
});

// Service Worker registration
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    });
}