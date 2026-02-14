// Flight data using arrays and objects
const flights = [
    {
        id: "RAC-101",
        origin: "SAL",
        originName: "San Salvador",
        destination: "RTB",
        destinationName: "Roatán",
        departure: "07:00",
        arrival: "09:30",
        duration: "2h 30m",
        totalSeats: 12,
        bookedSeats: 6,
        stops: [],
        type: "direct",
        days: ["Monday", "Wednesday", "Friday", "Saturday"]
    },
    {
        id: "RAC-102",
        origin: "SAL",
        originName: "San Salvador",
        destination: "RTB",
        destinationName: "Roatán",
        departure: "06:30",
        arrival: "10:45",
        duration: "4h 15m",
        totalSeats: 12,
        bookedSeats: 4,
        stops: [
            { code: "LCE", name: "La Ceiba", pickupSeats: 3 }
        ],
        type: "stopover",
        days: ["Tuesday", "Thursday", "Sunday"]
    },
    {
        id: "RAC-103",
        origin: "SAL",
        originName: "San Salvador",
        destination: "RTB",
        destinationName: "Roatán",
        departure: "08:00",
        arrival: "12:30",
        duration: "4h 30m",
        totalSeats: 12,
        bookedSeats: 3,
        stops: [
            { code: "SAP", name: "San Pedro Sula", pickupSeats: 5 }
        ],
        type: "stopover",
        days: ["Monday", "Friday"]
    },
    {
        id: "RAC-201",
        origin: "RTB",
        originName: "Roatán",
        destination: "SAL",
        destinationName: "San Salvador",
        departure: "14:00",
        arrival: "16:30",
        duration: "2h 30m",
        totalSeats: 12,
        bookedSeats: 8,
        stops: [],
        type: "direct",
        days: ["Monday", "Wednesday", "Friday", "Saturday"]
    },
    {
        id: "RAC-202",
        origin: "RTB",
        originName: "Roatán",
        destination: "SAL",
        destinationName: "San Salvador",
        departure: "13:00",
        arrival: "17:15",
        duration: "4h 15m",
        totalSeats: 12,
        bookedSeats: 5,
        stops: [
            { code: "LCE", name: "La Ceiba", pickupSeats: 4 }
        ],
        type: "stopover",
        days: ["Tuesday", "Thursday", "Sunday"]
    }
];

// Calculate available seats for a flight
function getAvailableSeats(flight) {
    return flight.totalSeats - flight.bookedSeats;
}

// Determine seat availability class (for color coding)
function getSeatClass(available) {
    if (available <= 3) return "low";
    if (available <= 6) return "medium";
    return "high";
}

// Determine if a flight needs a stopover to optimize occupancy
function shouldAddStopover(flight) {
    const available = getAvailableSeats(flight);
    const occupancyRate = flight.bookedSeats / flight.totalSeats;
    return occupancyRate < 0.7 && flight.stops.length === 0;
}

// Build the route display string (e.g., SAL → LCE → RTB)
function buildRouteString(flight) {
    let route = flight.origin;
    flight.stops.forEach(stop => {
        route += ` → ${stop.code}`;
    });
    route += ` → ${flight.destination}`;
    return route;
}

// Render a single flight card
function renderFlightCard(flight) {
    const available = getAvailableSeats(flight);
    const seatClass = getSeatClass(available);
    const routeString = buildRouteString(flight);
    const hasStopover = flight.stops.length > 0;
    const needsStopover = shouldAddStopover(flight);

    let stopoverHTML = "";
    if (hasStopover) {
        flight.stops.forEach(stop => {
            stopoverHTML += `<span class="stopover-badge">Stopover: ${stop.name} (+${stop.pickupSeats} potential passengers)</span>`;
        });
    }

    let optimizationNote = "";
    if (needsStopover) {
        optimizationNote = `<span class="stopover-badge" style="background-color: var(--secondary-color);">Route optimization available — stopover can be added</span>`;
    }

    return `
        <div class="route-card ${hasStopover ? 'has-stopover' : ''}">
            <div class="route-info">
                <h3>${flight.originName} → ${flight.destinationName}</h3>
                <div style="font-family: 'Oswald', sans-serif; font-size: 1.1rem; color: var(--secondary-color); letter-spacing: 1px;">${routeString}</div>
                <div class="route-details">
                    <span>🛫 ${flight.departure}</span>
                    <span>🛬 ${flight.arrival}</span>
                    <span>⏱ ${flight.duration}</span>
                    <span>${hasStopover ? '📍 ' + flight.stops.length + ' Stop' : '✈ Direct'}</span>
                </div>
                <div class="route-details">
                    <span>📅 ${flight.days.join(", ")}</span>
                </div>
                ${stopoverHTML}
                ${optimizationNote}
            </div>
            <div class="route-availability">
                <div class="seats-number ${seatClass}">${available}</div>
                <div class="seats-label">Seats Available</div>
                <a href="booking.html" class="btn-primary" style="font-size: 0.8rem; padding: 0.4rem 1rem; margin-top: 0.5rem;">Book</a>
            </div>
        </div>
    `;
}

// Render all flights
function renderFlights(filter = "all") {
    const container = document.getElementById("flights-container");

    let filteredFlights = flights;

    if (filter !== "all") {
        filteredFlights = flights.filter(flight => flight.origin === filter);
    }

    // Sort: direct flights first, then by departure time
    filteredFlights.sort((a, b) => {
        if (a.type === "direct" && b.type !== "direct") return -1;
        if (a.type !== "direct" && b.type === "direct") return 1;
        return a.departure.localeCompare(b.departure);
    });

    if (filteredFlights.length === 0) {
        container.innerHTML = '<p class="no-flights">No flights found for the selected filter.</p>';
        return;
    }

    container.innerHTML = filteredFlights.map(renderFlightCard).join("");
}

// Initialize
renderFlights();

// Filter event listener
const filterSelect = document.getElementById("filter-origin");
if (filterSelect) {
    filterSelect.addEventListener("change", (e) => {
        renderFlights(e.target.value);
    });
}
