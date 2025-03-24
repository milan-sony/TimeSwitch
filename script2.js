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