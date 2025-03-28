// Function to convert 12-hour time to 24-hour format
function convertTime() {
    let inputTime = document.getElementById("timeInput").value.trim().toUpperCase();

    // Normalize input by replacing '.' with ':'
    inputTime = inputTime.replace('.', ':');

    // Check if input matches HH:MM AM/PM format
    if (/^(0?[1-9]|1[0-2]):[0-5]\d\s?(AM|PM)$/.test(inputTime)) {
        // Split time and period (AM/PM)
        let [time, period] = inputTime.split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        // Convert to 24-hour format
        if (period === "AM" && hours === 12) {
            hours = 0; // Midnight
        } else if (period === "PM" && hours !== 12) {
            hours += 12;
        }

        // Format hours and minutes to always have two digits
        const formattedHours = String(hours).padStart(2, "0");
        const formattedMinutes = String(minutes).padStart(2, "0");

        const formattedTime = `${formattedHours}:${formattedMinutes}`;
        document.getElementById("result").innerText = `Converted Time: ${formattedTime}`;
    } else {
        // Alert the user for invalid input
        alert("Please enter a valid time in HH:MM AM/PM format.");
        document.getElementById("result").innerText = "";
    }
}

// Function to clear input and result
function clearFields() {
    document.getElementById("timeInput").value = ""; // Clear the input field
    document.getElementById("result").innerText = ""; // Clear the result display
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

// Event listener for clear button click
document.getElementById("clearButton").addEventListener("click", clearFields);

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