// Store bookings in localStorage
let bookings = JSON.parse(localStorage.getItem('bookings')) || {};

// Handle booking form submission
document.getElementById('booking-form').addEventListener('submit', function (event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const registrationNo = document.getElementById('registration-no').value;
    const interests = document.getElementById('interests').value;
    const faculty = document.getElementById('faculty').value;
    const time = document.getElementById('time').value;
    const timestamp = new Date().toLocaleString();

    if (!bookings[faculty]) {
        bookings[faculty] = [];
    }

    // Add booking data
    bookings[faculty].push({
        name,
        registrationNo,
        interests,
        time,
        timestamp
    });

    // Update localStorage
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // Show confirmation
    const slotStart = new Date(time);
    const slotEnd = new Date(slotStart.getTime() + 30 * 60 * 1000); // 30 minutes later
    document.getElementById('slot-start').textContent = slotStart.toLocaleString();
    document.getElementById('slot-end').textContent = slotEnd.toLocaleString();
    document.getElementById('confirmation').style.display = 'block';
    
    // Reset the form
    this.reset();
    
    // Update faculty booking count
    updateFacultyBookings();
});

// Function to update booking counts on faculty list
function updateFacultyBookings() {
    const facultyMembers = document.querySelectorAll('.faculty-member');
    
    facultyMembers.forEach(member => {
        const facultyName = member.querySelector('.faculty-info h4').innerText;
        const count = bookings[facultyName] ? bookings[facultyName].length : 0;
        
        const bookingButton = member.querySelector('.booking-button');
        bookingButton.textContent = `Slot booked: ${count}`;
    });
}

// Show detailed booking info when clicking on booking button
document.addEventListener('click', function (event) {
    if (event.target.classList.contains('booking-button')) {
        const facultyName = event.target.getAttribute('data-faculty');
        const detailsContainer = event.target.nextElementSibling;
        
        if (bookings[facultyName] && bookings[facultyName].length > 0) {
            detailsContainer.innerHTML = '';
            bookings[facultyName].forEach(booking => {
                const bookingDetails = document.createElement('div');
                bookingDetails.innerHTML = `
                    <p><strong>Booked By:</strong> ${booking.name}</p>
                    <p><strong>Registration No:</strong> ${booking.registrationNo}</p>
                    <p><strong>Interests:</strong> ${booking.interests}</p>
                    <p><strong>Time Slot:</strong> ${booking.time}</p>
                    <p><strong>Booked On:</strong> ${booking.timestamp}</p>
                    <hr>
                `;
                detailsContainer.appendChild(bookingDetails);
            });
            detailsContainer.style.display = 'block';
        } else {
            detailsContainer.innerHTML = '<p>No bookings yet.</p>';
        }
    }
});

// Initialize faculty bookings on page load
document.addEventListener('DOMContentLoaded', function () {
    updateFacultyBookings();
});
