// Flight booking application JavaScript

// Mock flight data
const mockFlights = [
    {
        id: 1,
        airline: "NewLife Airways",
        flightNumber: "NL101",
        from: "NYC",
        to: "LAX",
        departureTime: "08:00",
        arrivalTime: "11:30",
        duration: "5h 30m",
        price: 299,
        aircraft: "Boeing 737"
    },
    {
        id: 2,
        airline: "SkyHigh Airlines",
        flightNumber: "SH205",
        from: "NYC",
        to: "LAX",
        departureTime: "14:15",
        arrivalTime: "17:45",
        duration: "5h 30m",
        price: 349,
        aircraft: "Airbus A320"
    },
    {
        id: 3,
        airline: "CloudNine Express",
        flightNumber: "CN403",
        from: "LAX",
        to: "NYC",
        departureTime: "09:30",
        arrivalTime: "18:00",
        duration: "5h 30m",
        price: 279,
        aircraft: "Boeing 787"
    },
    {
        id: 4,
        airline: "NewLife Airways",
        flightNumber: "NL302",
        from: "CHI",
        to: "MIA",
        departureTime: "12:00",
        arrivalTime: "15:30",
        duration: "3h 30m",
        price: 199,
        aircraft: "Boeing 737"
    },
    {
        id: 5,
        airline: "Pacific Wings",
        flightNumber: "PW501",
        from: "SFO",
        to: "CHI",
        departureTime: "07:45",
        arrivalTime: "13:15",
        duration: "4h 30m",
        price: 259,
        aircraft: "Airbus A321"
    }
];

// Global variables
let selectedFlight = null;
let searchCriteria = null;

// DOM elements
const searchForm = document.getElementById('flight-search-form');
const resultsSection = document.getElementById('results-section');
const flightResults = document.getElementById('flight-results');
const bookingSection = document.getElementById('booking-section');
const bookingForm = document.getElementById('booking-form');
const passengerForms = document.getElementById('passenger-forms');
const confirmationSection = document.getElementById('confirmation-section');
const bookingDetails = document.getElementById('booking-details');

// Set minimum date to today
document.getElementById('departure-date').min = new Date().toISOString().split('T')[0];

// Event listeners
searchForm.addEventListener('submit', handleFlightSearch);
bookingForm.addEventListener('submit', handleBooking);

// Handle flight search
function handleFlightSearch(e) {
    e.preventDefault();
    
    const from = document.getElementById('from').value;
    const to = document.getElementById('to').value;
    const departureDate = document.getElementById('departure-date').value;
    const passengers = document.getElementById('passengers').value;
    
    // Validate that from and to are different
    if (from === to) {
        alert('Please select different departure and destination cities.');
        return;
    }
    
    // Store search criteria
    searchCriteria = { from, to, departureDate, passengers };
    
    // Show loading state
    const searchBtn = document.querySelector('.search-btn');
    const originalText = searchBtn.textContent;
    searchBtn.innerHTML = '<span class="loading"></span> Searching...';
    searchBtn.disabled = true;
    
    // Simulate search delay
    setTimeout(() => {
        searchFlights(from, to);
        searchBtn.textContent = originalText;
        searchBtn.disabled = false;
    }, 1500);
}

// Search for flights
function searchFlights(from, to) {
    // Filter flights based on route
    const availableFlights = mockFlights.filter(flight => 
        flight.from === from && flight.to === to
    );
    
    if (availableFlights.length === 0) {
        flightResults.innerHTML = `
            <div class="flight-card">
                <p style="text-align: center; color: #718096; font-size: 1.1rem;">
                    😔 No flights found for ${getCityName(from)} to ${getCityName(to)}
                </p>
                <p style="text-align: center; color: #718096; margin-top: 1rem;">
                    Try searching for a different route.
                </p>
            </div>
        `;
    } else {
        displayFlights(availableFlights);
    }
    
    // Show results section
    resultsSection.classList.remove('hidden');
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Display flights
function displayFlights(flights) {
    const flightsHtml = flights.map(flight => `
        <div class="flight-card">
            <div class="flight-header">
                <div class="airline">${flight.airline}</div>
                <div class="price">$${flight.price}</div>
            </div>
            <div class="flight-details">
                <div class="detail-item">
                    <div class="detail-label">Flight</div>
                    <div class="detail-value">${flight.flightNumber}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Departure</div>
                    <div class="detail-value">${flight.departureTime}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Arrival</div>
                    <div class="detail-value">${flight.arrivalTime}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Duration</div>
                    <div class="detail-value">${flight.duration}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Aircraft</div>
                    <div class="detail-value">${flight.aircraft}</div>
                </div>
            </div>
            <button class="select-flight-btn" onclick="selectFlight(${flight.id})">
                Select This Flight
            </button>
        </div>
    `).join('');
    
    flightResults.innerHTML = flightsHtml;
}

// Select a flight
function selectFlight(flightId) {
    selectedFlight = mockFlights.find(flight => flight.id === flightId);
    generatePassengerForms();
    bookingSection.classList.remove('hidden');
    bookingSection.scrollIntoView({ behavior: 'smooth' });
}

// Generate passenger forms
function generatePassengerForms() {
    const passengerCount = parseInt(searchCriteria.passengers);
    const formsHtml = Array.from({ length: passengerCount }, (_, index) => `
        <div class="passenger-form">
            <h4>Passenger ${index + 1}</h4>
            <div class="form-row">
                <div class="input-group">
                    <label for="firstName${index}">First Name</label>
                    <input type="text" id="firstName${index}" name="firstName${index}" required>
                </div>
                <div class="input-group">
                    <label for="lastName${index}">Last Name</label>
                    <input type="text" id="lastName${index}" name="lastName${index}" required>
                </div>
            </div>
            <div class="form-row">
                <div class="input-group">
                    <label for="dateOfBirth${index}">Date of Birth</label>
                    <input type="date" id="dateOfBirth${index}" name="dateOfBirth${index}" required>
                </div>
                <div class="input-group">
                    <label for="gender${index}">Gender</label>
                    <select id="gender${index}" name="gender${index}" required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>
            </div>
        </div>
    `).join('');
    
    passengerForms.innerHTML = formsHtml;
}

// Handle booking submission
function handleBooking(e) {
    e.preventDefault();
    
    // Show loading state
    const bookBtn = document.querySelector('.book-btn');
    const originalText = bookBtn.textContent;
    bookBtn.innerHTML = '<span class="loading"></span> Processing Booking...';
    bookBtn.disabled = true;
    
    // Simulate booking process
    setTimeout(() => {
        processBooking();
        bookBtn.textContent = originalText;
        bookBtn.disabled = false;
    }, 2000);
}

// Process booking and show confirmation
function processBooking() {
    // Generate booking reference
    const bookingRef = 'NL' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Collect passenger data
    const passengerCount = parseInt(searchCriteria.passengers);
    const passengers = [];
    
    for (let i = 0; i < passengerCount; i++) {
        passengers.push({
            firstName: document.getElementById(`firstName${i}`).value,
            lastName: document.getElementById(`lastName${i}`).value,
            dateOfBirth: document.getElementById(`dateOfBirth${i}`).value,
            gender: document.getElementById(`gender${i}`).value
        });
    }
    
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    // Calculate total price
    const totalPrice = selectedFlight.price * passengerCount;
    
    // Create booking confirmation
    const confirmation = {
        bookingRef,
        flight: selectedFlight,
        passengers,
        contact: { email, phone },
        totalPrice,
        departureDate: searchCriteria.departureDate
    };
    
    displayConfirmation(confirmation);
}

// Display booking confirmation
function displayConfirmation(confirmation) {
    const passengerList = confirmation.passengers.map((p, index) => 
        `<li>${p.firstName} ${p.lastName}</li>`
    ).join('');
    
    const confirmationHtml = `
        <div class="confirmation-card">
            <h3>🎉 Booking Successful!</h3>
            <p style="font-size: 1.2rem; margin: 1rem 0;">
                Booking Reference: <strong>${confirmation.bookingRef}</strong>
            </p>
        </div>
        
        <div class="booking-summary">
            <h4>Flight Details</h4>
            <p><strong>Flight:</strong> ${confirmation.flight.airline} ${confirmation.flight.flightNumber}</p>
            <p><strong>Route:</strong> ${getCityName(confirmation.flight.from)} → ${getCityName(confirmation.flight.to)}</p>
            <p><strong>Date:</strong> ${formatDate(confirmation.departureDate)}</p>
            <p><strong>Departure:</strong> ${confirmation.flight.departureTime}</p>
            <p><strong>Arrival:</strong> ${confirmation.flight.arrivalTime}</p>
            
            <h4 style="margin-top: 1.5rem;">Passengers</h4>
            <ul>${passengerList}</ul>
            
            <h4 style="margin-top: 1.5rem;">Contact Information</h4>
            <p><strong>Email:</strong> ${confirmation.contact.email}</p>
            <p><strong>Phone:</strong> ${confirmation.contact.phone}</p>
            
            <h4 style="margin-top: 1.5rem;">Total Cost</h4>
            <p style="font-size: 1.5rem; color: #667eea;"><strong>$${confirmation.totalPrice}</strong></p>
        </div>
        
        <div style="text-align: center; margin-top: 2rem;">
            <p style="color: #718096;">
                📧 A confirmation email has been sent to ${confirmation.contact.email}
            </p>
            <p style="color: #718096; margin-top: 0.5rem;">
                Please arrive at the airport at least 2 hours before your departure time.
            </p>
        </div>
    `;
    
    bookingDetails.innerHTML = confirmationHtml;
    
    // Hide other sections and show confirmation
    document.getElementById('search-section').classList.add('hidden');
    resultsSection.classList.add('hidden');
    bookingSection.classList.add('hidden');
    confirmationSection.classList.remove('hidden');
    confirmationSection.scrollIntoView({ behavior: 'smooth' });
}

// Utility functions
function getCityName(code) {
    const cities = {
        'NYC': 'New York',
        'LAX': 'Los Angeles',
        'CHI': 'Chicago',
        'MIA': 'Miami',
        'SFO': 'San Francisco'
    };
    return cities[code] || code;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Start new search
function startNew() {
    // Reset form
    searchForm.reset();
    
    // Reset variables
    selectedFlight = null;
    searchCriteria = null;
    
    // Show search section and hide others
    document.getElementById('search-section').classList.remove('hidden');
    resultsSection.classList.add('hidden');
    bookingSection.classList.add('hidden');
    confirmationSection.classList.add('hidden');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    console.log('NewLife Flight Booking System initialized');
});