// Booking form validation and localStorage

const bookingForm = document.getElementById("booking-form");
const confirmation = document.getElementById("confirmation");
const confirmationText = document.getElementById("confirmation-text");

// Set minimum date to today
const travelDateInput = document.getElementById("travel-date");
if (travelDateInput) {
    const today = new Date().toISOString().split("T")[0];
    travelDateInput.setAttribute("min", today);
}

// RANGE event listener for passengers
const passengersRange = document.getElementById("passengers");
const passengersValue = document.getElementById("passengers-value");

if (passengersRange && passengersValue) {
    passengersRange.addEventListener("change", displayPassengerValue);
    passengersRange.addEventListener("input", displayPassengerValue);
}

function displayPassengerValue() {
    passengersValue.innerHTML = passengersRange.value;
}

// Validate a single field
function validateField(field) {
    const group = field.closest(".form-group");
    if (!group) return true;

    let isValid = true;

    if (field.required && !field.value.trim()) {
        isValid = false;
    } else if (field.type === "email" && field.value) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailPattern.test(field.value);
    } else if (field.pattern && field.value) {
        const regex = new RegExp(`^${field.pattern}$`);
        isValid = regex.test(field.value);
    } else if (field.id === "travel-date" && field.value) {
        const selectedDate = new Date(field.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        isValid = selectedDate >= today;
    }

    if (isValid) {
        group.classList.remove("error");
    } else {
        group.classList.add("error");
    }

    return isValid;
}

// Add real-time validation on blur
if (bookingForm) {
    const inputs = bookingForm.querySelectorAll("input, select, textarea");
    inputs.forEach(input => {
        input.addEventListener("blur", () => validateField(input));
        input.addEventListener("change", () => validateField(input));
    });
}

// Form submission
if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const fields = bookingForm.querySelectorAll("input[required], select[required]");
        let allValid = true;

        fields.forEach(field => {
            if (!validateField(field)) {
                allValid = false;
            }
        });

        if (!allValid) return;

        // Gather luggage checkbox values
        const luggageChecked = bookingForm.querySelectorAll("input[name='luggage']:checked");
        const luggageValues = Array.from(luggageChecked).map(cb => cb.value);

        // Gather form data
        const bookingData = {
            fullname: document.getElementById("fullname").value.trim(),
            email: document.getElementById("email").value.trim(),
            phone: document.getElementById("phone").value.trim(),
            departure: document.getElementById("departure").value.trim(),
            route: document.getElementById("route").value,
            routeText: document.getElementById("route").options[document.getElementById("route").selectedIndex].text,
            travelDate: document.getElementById("travel-date").value,
            passengers: document.getElementById("passengers").value,
            luggage: luggageValues,
            requests: document.getElementById("requests").value.trim(),
            timestamp: new Date().toISOString()
        };

        // Store in localStorage
        let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
        bookings.push(bookingData);
        localStorage.setItem("bookings", JSON.stringify(bookings));

        // Show personalized confirmation
        const dateFormatted = new Date(bookingData.travelDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric"
        });

        confirmationText.innerHTML = `
            Thank you, <strong>${bookingData.fullname}</strong>! Your reservation has been confirmed.<br><br>
            <strong>Departure:</strong> ${bookingData.departure}<br>
            <strong>Route:</strong> ${bookingData.routeText}<br>
            <strong>Date:</strong> ${dateFormatted}<br>
            <strong>Passengers:</strong> ${bookingData.passengers}<br>
            <strong>Confirmation Email:</strong> ${bookingData.email}<br><br>
            Total bookings made: <strong>${bookings.length}</strong>
        `;

        // Hide form, show confirmation
        bookingForm.style.display = "none";
        confirmation.style.display = "block";

        // Scroll to confirmation
        confirmation.scrollIntoView({ behavior: "smooth" });
    });
}
