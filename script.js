// Example JS for booking and animations (this will expand based on your booking system)
document.addEventListener("DOMContentLoaded", function() {
    console.log("Page Loaded and ready!");

    // Add your interactive JS here for booking slots and reminders
});

document.getElementById('booking-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const timeInput = document.getElementById('time').value;
    const date = new Date(timeInput);
    const startTime = date.toLocaleString();
    const endTime = new Date(date.getTime() + 30 * 60000).toLocaleString(); // Add 30 minutes

    // Display confirmation
    document.getElementById('slot-start').innerText = startTime;
    document.getElementById('slot-end').innerText = endTime;
    document.getElementById('confirmation').style.display = 'block';
});
