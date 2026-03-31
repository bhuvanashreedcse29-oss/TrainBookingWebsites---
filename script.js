// LOGIN SYSTEM
const DEMO_EMAIL = 'user@trainbooking.com';
const DEMO_PASSWORD = 'password123';

let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Check login status on page load
function checkLoginStatus() {
    const loginPage = document.getElementById('loginPage');
    const navbar = document.getElementById('navbar');
    const mainContainer = document.querySelector('.main-container');

    if (currentUser) {
        // User is logged in
        loginPage.style.display = 'none';
        navbar.style.display = 'flex';
        mainContainer.style.display = 'block';
        document.getElementById('userEmail').textContent = currentUser.email;
    } else {
        // User is not logged in
        loginPage.style.display = 'flex';
        navbar.style.display = 'none';
        mainContainer.style.display = 'none';
    }
}

function setupLoginPage() {
    const loginForm = document.getElementById('loginForm');
    const demoLoginBtn = document.getElementById('demoLoginBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (demoLoginBtn) {
        demoLoginBtn.addEventListener('click', demoLogin);
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', logoutUser);
    }
}

function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value.trim();

    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }

    if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
        loginUser(email);
    } else {
        alert('Invalid email or password. Use demo credentials:\nEmail: user@trainbooking.com\nPassword: password123');
    }
}

function demoLogin() {
    loginUser(DEMO_EMAIL);
}

function loginUser(email) {
    currentUser = { email: email, loginTime: new Date().toLocaleString() };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    document.getElementById('loginForm').reset();
    checkLoginStatus();
    updateNotification('Welcome ' + email + '!', 'success');
    initializeApp();
}

function logoutUser() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        localStorage.removeItem('currentUser');
        checkLoginStatus();
        updateNotification('You have been logged out', 'info');
    }
}

// Train Data
const trainsData = [
    {
        id: 1,
        name: 'Express Premium',
        number: '12001',
        source: 'Mumbai',
        destination: 'Delhi',
        departureTime: '18:30',
        arrivalTime: '10:15',
        duration: '15h 45m',
        classes: ['Sleeper', 'AC', 'First'],
        availableSeats: { 'Sleeper': 45, 'AC': 30, 'First': 15 },
        totalSeats: { 'Sleeper': 72, 'AC': 48, 'First': 24 },
        food: true,
        snacks: true,
        price: { 'Sleeper': 500, 'AC': 800, 'First': 1200 }
    },
    {
        id: 2,
        name: 'Rajdhani Express',
        number: '12002',
        source: 'Delhi',
        destination: 'Mumbai',
        departureTime: '16:00',
        arrivalTime: '08:30',
        duration: '16h 30m',
        classes: ['AC', 'First'],
        availableSeats: { 'AC': 40, 'First': 20 },
        totalSeats: { 'AC': 48, 'First': 24 },
        food: true,
        snacks: true,
        price: { 'AC': 1000, 'First': 1500 }
    },
    {
        id: 3,
        name: 'Shatabdi Express',
        number: '12003',
        source: 'Mumbai',
        destination: 'Bangalore',
        departureTime: '06:00',
        arrivalTime: '14:30',
        duration: '8h 30m',
        classes: ['AC', 'General'],
        availableSeats: { 'AC': 35, 'General': 60 },
        totalSeats: { 'AC': 48, 'General': 72 },
        food: true,
        snacks: true,
        price: { 'AC': 650, 'General': 350 }
    },
    {
        id: 4,
        name: 'Intercity Local',
        number: '16501',
        source: 'Bangalore',
        destination: 'Hyderabad',
        departureTime: '22:00',
        arrivalTime: '06:00',
        duration: '8h',
        classes: ['Sleeper', 'General'],
        availableSeats: { 'Sleeper': 30, 'General': 80 },
        totalSeats: { 'Sleeper': 72, 'General': 96 },
        food: false,
        snacks: true,
        price: { 'Sleeper': 400, 'General': 250 }
    },
    {
        id: 5,
        name: 'City Express',
        number: '12004',
        source: 'Chennai',
        destination: 'Kolkata',
        departureTime: '08:00',
        arrivalTime: '08:00',
        duration: '24h',
        classes: ['Sleeper', 'AC', 'General'],
        availableSeats: { 'Sleeper': 50, 'AC': 25, 'General': 70 },
        totalSeats: { 'Sleeper': 72, 'AC': 48, 'General': 96 },
        food: true,
        snacks: true,
        price: { 'Sleeper': 600, 'AC': 900, 'General': 400 }
    },
    {
        id: 6,
        name: 'Palace Express',
        number: '12005',
        source: 'Hyderabad',
        destination: 'Pune',
        departureTime: '14:30',
        arrivalTime: '06:30',
        duration: '16h',
        classes: ['Sleeper', 'AC'],
        availableSeats: { 'Sleeper': 65, 'AC': 38 },
        totalSeats: { 'Sleeper': 72, 'AC': 48 },
        food: true,
        snacks: true,
        price: { 'Sleeper': 550, 'AC': 850 }
    },
    {
        id: 7,
        name: 'Golden Arrow',
        number: '12006',
        source: 'Delhi',
        destination: 'Ahmedabad',
        departureTime: '10:00',
        arrivalTime: '20:00',
        duration: '10h',
        classes: ['AC', 'General'],
        availableSeats: { 'AC': 42, 'General': 88 },
        totalSeats: { 'AC': 48, 'General': 96 },
        food: true,
        snacks: true,
        price: { 'AC': 700, 'General': 300 }
    },
    {
        id: 8,
        name: 'Heritage Express',
        number: '12007',
        source: 'Kolkata',
        destination: 'Chennai',
        departureTime: '12:00',
        arrivalTime: '12:00',
        duration: '24h',
        classes: ['Sleeper', 'AC', 'First'],
        availableSeats: { 'Sleeper': 55, 'AC': 20, 'First': 10 },
        totalSeats: { 'Sleeper': 72, 'AC': 48, 'First': 24 },
        food: true,
        snacks: true,
        price: { 'Sleeper': 700, 'AC': 1100, 'First': 1600 }
    }
];

// Global Variables
let currentBookingTrain = null;
let currentBookingClass = null;
let selectedSeats = [];
let allBookings = JSON.parse(localStorage.getItem('trainBookings')) || [];

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    setupLoginPage();
    checkLoginStatus();
    if (currentUser) {
        initializeApp();
        setMinimumDate();
    }
});

function initializeApp() {
    setupEventListeners();
    displayAllTrains();
    updateNotification('Welcome to TrainBooking!', 'info');
}

function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });

    // CTA Button
    document.querySelector('.cta-button').addEventListener('click', handleNavigation);

    // Menu Toggle for Mobile
    document.querySelector('.menu-toggle').addEventListener('click', toggleMenu);

    // Search Form
    document.getElementById('searchForm').addEventListener('submit', handleSearchTrains);

    // Track Train
    document.getElementById('trackBtn').addEventListener('click', trackTrain);

    // Modal
    document.querySelector('.close-btn').addEventListener('click', closeModal);
    document.getElementById('passengerForm').addEventListener('submit', confirmBooking);

    // Modal Close on Outside Click
    document.getElementById('seatModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
}

function handleNavigation(e) {
    e.preventDefault();
    const section = e.target.dataset.section;
    if (section) {
        navigateToSection(section);
    }
}

function navigateToSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');

        // Update navbar active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === sectionId) {
                link.classList.add('active');
            }
        });

        // Close mobile menu
        closeMenu();

        // Load section-specific content
        if (sectionId === 'bookings') {
            displayMyBookings();
        } else if (sectionId === 'trains') {
            displayAllTrains();
        }
    }
}

function toggleMenu() {
    document.querySelector('.nav-menu').classList.toggle('active');
    document.querySelector('.menu-toggle').classList.toggle('active');
}

function closeMenu() {
    document.querySelector('.nav-menu').classList.remove('active');
    document.querySelector('.menu-toggle').classList.remove('active');
}

function setMinimumDate() {
    const dateInput = document.getElementById('date');
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${year}-${month}-${day}`;
    dateInput.value = `${year}-${month}-${day}`;
}

// Search Trains
function handleSearchTrains(e) {
    e.preventDefault();

    const source = document.getElementById('source').value.trim();
    const destination = document.getElementById('destination').value.trim();
    const date = document.getElementById('date').value;
    const classType = document.getElementById('class').value;

    if (!source || !destination) {
        updateNotification('Please enter both source and destination', 'error');
        return;
    }

    if (source.toLowerCase() === destination.toLowerCase()) {
        updateNotification('Source and destination cannot be the same', 'error');
        return;
    }

    const results = searchTrains(source, destination, classType);
    displaySearchResults(results, source, destination);
}

function searchTrains(source, destination, classType) {
    return trainsData.filter(train => {
        const matchesRoute = train.source.toLowerCase() === source.toLowerCase() &&
                           train.destination.toLowerCase() === destination.toLowerCase();
        
        if (!matchesRoute) return false;

        if (classType) {
            return train.classes.includes(classType);
        }
        return true;
    });
}

function displaySearchResults(trains, source, destination) {
    const resultsContainer = document.getElementById('searchResults');
    resultsContainer.innerHTML = '';

    if (trains.length === 0) {
        // Show next available trains
        const nextAvailable = trainsData.filter(t => 
            !allBookings.some(b => b.trainId === t.id)
        ).slice(0, 2);

        resultsContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <h3>No trains found for this route</h3>
                <p>But here are the next available trains:</p>
            </div>
        `;

        if (nextAvailable.length > 0) {
            nextAvailable.forEach(train => {
                resultsContainer.innerHTML += createNextAvailableCard(train);
            });
        } else {
            resultsContainer.innerHTML += createEmptyState('No trains available', '🚫');
        }
        return;
    }

    trains.forEach(train => {
        resultsContainer.innerHTML += createTrainCard(train);
    });

    // Attach book button listeners
    document.querySelectorAll('.book-button').forEach(btn => {
        btn.addEventListener('click', function() {
            const trainId = parseInt(this.dataset.trainId);
            const classType = this.dataset.class;
            const train = trainsData.find(t => t.id === trainId);
            openBookingModal(train, classType);
        });
    });
}

function displayAllTrains() {
    const trainsGrid = document.getElementById('trainsGrid');
    trainsGrid.innerHTML = '';

    trainsData.forEach(train => {
        trainsGrid.innerHTML += createTrainCard(train);
    });

    // Attach book button listeners
    document.querySelectorAll('.book-button').forEach(btn => {
        btn.addEventListener('click', function() {
            const trainId = parseInt(this.dataset.trainId);
            const classType = this.dataset.class;
            const train = trainsData.find(t => t.id === trainId);
            openBookingModal(train, classType);
        });
    });
}

function createTrainCard(train) {
    const allClasses = train.classes.join(', ');
    const totalAvailable = Object.values(train.availableSeats).reduce((a, b) => a + b, 0);
    const availabilityStatus = totalAvailable > 50 ? 'High' : totalAvailable > 20 ? 'Medium' : 'Low';
    const availabilityColor = totalAvailable > 50 ? 'availability-high' : totalAvailable > 20 ? 'availability-medium' : 'availability-low';

    let classButtonsHTML = '';
    train.classes.forEach(classType => {
        const available = train.availableSeats[classType];
        classButtonsHTML += `
            <div class="class-badge">${classType}</div>
        `;
    });

    let bookButtonsHTML = '';
    train.classes.forEach(classType => {
        const available = train.availableSeats[classType];
        const isDisabled = available === 0;
        bookButtonsHTML += `
            <button 
                class="book-button" 
                data-train-id="${train.id}" 
                data-class="${classType}"
                ${isDisabled ? 'disabled' : ''}
            >
                Book ${classType} (₹${train.price[classType]})
            </button>
        `;
    });

    return `
        <div class="train-card">
            <div class="train-header">
                <div>
                    <div class="train-name">${train.name}</div>
                </div>
                <div class="train-number">${train.number}</div>
            </div>

            <div class="train-route">
                <div class="route-station">
                    <div class="station-time">${train.departureTime}</div>
                    <div class="station-name">${train.source}</div>
                </div>
                <div class="route-separator">→</div>
                <div class="route-station">
                    <div class="station-time">${train.arrivalTime}</div>
                    <div class="station-name">${train.destination}</div>
                </div>
            </div>

            <div class="train-details">
                <div class="detail-row">
                    <span class="detail-label">Duration:</span>
                    <span class="detail-value">${train.duration}</span>
                </div>
                <div class="detail-row">
                    <span class="detail-label">Available Seats:</span>
                    <span class="detail-value">${totalAvailable}</span>
                </div>
            </div>

            <div class="class-badges">
                ${classButtonsHTML}
            </div>

            <div class="availability">
                <span class="availability-status ${availabilityColor}">Availability: ${availabilityStatus}</span>
            </div>

            <div class="food-snacks">
                ${train.food ? '🍽️ Food' : ''} ${train.snacks ? '🥤 Snacks' : 'No food service'}
            </div>

            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                ${bookButtonsHTML}
            </div>
        </div>
    `;
}

function createNextAvailableCard(train) {
    return `
        <div class="train-card next-available">
            <h4>Next Available Train</h4>
            <div class="train-header" style="margin: 1rem 0;">
                <div class="train-name">${train.name}</div>
                <div class="train-number">${train.number}</div>
            </div>
            <div class="train-route">
                <div class="route-station">
                    <div class="station-time">${train.departureTime}</div>
                    <div class="station-name">${train.source}</div>
                </div>
                <div class="route-separator">→</div>
                <div class="route-station">
                    <div class="station-time">${train.arrivalTime}</div>
                    <div class="station-name">${train.destination}</div>
                </div>
            </div>
            <button class="book-button" data-train-id="${train.id}" data-class="${train.classes[0]}">
                Book Now
            </button>
        </div>
    `;
}

// Seat Selection Modal
function openBookingModal(train, classType) {
    if (!classType) {
        classType = train.classes[0];
    }

    currentBookingTrain = train;
    currentBookingClass = classType;
    selectedSeats = [];

    const modal = document.getElementById('seatModal');
    modal.classList.add('show');
    
    generateSeats(train, classType);
}

function generateSeats(train, classType) {
    const seatContainer = document.getElementById('seatContainer');
    seatContainer.innerHTML = '';

    const totalSeats = train.totalSeats[classType];
    const bookedSeats = train.availableSeats[classType];

    // Create seat layout
    const rows = Math.ceil(totalSeats / 6);
    
    for (let i = 1; i <= totalSeats; i++) {
        const seatNumber = `${String.fromCharCode(64 + Math.ceil(i / 6))}${((i - 1) % 6) + 1}`;
        const isBooked = Math.random() > 0.7; // 30% seats are booked randomly
        
        const seatElement = document.createElement('div');
        seatElement.className = `seat ${isBooked ? 'booked' : 'available'}`;
        seatElement.textContent = seatNumber;
        seatElement.dataset.seatNumber = seatNumber;

        if (!isBooked) {
            seatElement.addEventListener('click', function() {
                toggleSeatSelection(this);
            });
        }

        seatContainer.appendChild(seatElement);
    }

    updateSelectedSeatsDisplay();
}

function toggleSeatSelection(seatElement) {
    if (seatElement.classList.contains('booked')) return;

    seatElement.classList.toggle('selected');

    if (seatElement.classList.contains('selected')) {
        selectedSeats.push(seatElement.dataset.seatNumber);
    } else {
        selectedSeats = selectedSeats.filter(seat => seat !== seatElement.dataset.seatNumber);
    }

    updateSelectedSeatsDisplay();
}

function updateSelectedSeatsDisplay() {
    const display = document.getElementById('selectedSeats');
    if (selectedSeats.length > 0) {
        display.innerHTML = `<strong>Selected Seats:</strong> ${selectedSeats.join(', ')}`;
        display.style.display = 'block';
    } else {
        display.innerHTML = '';
        display.style.display = 'none';
    }

    // Enable/disable confirm button
    const confirmBtn = document.querySelector('.confirm-btn');
    confirmBtn.disabled = selectedSeats.length === 0;
}

function closeModal() {
    document.getElementById('seatModal').classList.remove('show');
    selectedSeats = [];
    currentBookingTrain = null;
    currentBookingClass = null;
}

// Booking Confirmation
function confirmBooking(e) {
    e.preventDefault();

    if (selectedSeats.length === 0) {
        updateNotification('Please select at least one seat', 'error');
        return;
    }

    const passengerName = document.getElementById('passengerName').value.trim();
    const passengerEmail = document.getElementById('passengerEmail').value.trim();
    const passengerPhone = document.getElementById('passengerPhone').value.trim();

    if (!passengerName || !passengerEmail || !passengerPhone) {
        updateNotification('Please fill in all passenger details', 'error');
        return;
    }

    // Validate email
    if (!validateEmail(passengerEmail)) {
        updateNotification('Please enter a valid email address', 'error');
        return;
    }

    // Validate phone
    if (!validatePhone(passengerPhone)) {
        updateNotification('Please enter a valid phone number', 'error');
        return;
    }

    // Create booking
    const booking = {
        id: generateBookingId(),
        trainId: currentBookingTrain.id,
        trainName: currentBookingTrain.name,
        trainNumber: currentBookingTrain.number,
        source: currentBookingTrain.source,
        destination: currentBookingTrain.destination,
        departureTime: currentBookingTrain.departureTime,
        arrivalTime: currentBookingTrain.arrivalTime,
        classType: currentBookingClass,
        seats: selectedSeats,
        passengerName: passengerName,
        passengerEmail: passengerEmail,
        passengerPhone: passengerPhone,
        price: currentBookingTrain.price[currentBookingClass] * selectedSeats.length,
        bookingDate: new Date().toLocaleDateString(),
        status: 'Confirmed'
    };

    // Save booking
    allBookings.push(booking);
    localStorage.setItem('trainBookings', JSON.stringify(allBookings));

    // Show confirmation
    updateNotification(`Booking Confirmed! Booking ID: ${booking.id}`, 'success');
    
    // Reset form
    document.getElementById('passengerForm').reset();
    closeModal();

    // Scroll to my bookings
    setTimeout(() => {
        navigateToSection('bookings');
    }, 1000);
}

function generateBookingId() {
    return 'BK' + Date.now().toString().slice(-8);
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePhone(phone) {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
}

// Display My Bookings
function displayMyBookings() {
    const bookingsList = document.getElementById('bookingsList');
    bookingsList.innerHTML = '';

    if (allBookings.length === 0) {
        bookingsList.innerHTML = createEmptyState('No bookings yet', '📋');
        return;
    }

    allBookings.forEach(booking => {
        bookingsList.innerHTML += createBookingCard(booking);
    });

    // Attach cancel listeners
    document.querySelectorAll('.cancel-booking-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const bookingId = this.dataset.bookingId;
            if (confirm('Are you sure you want to cancel this booking?')) {
                cancelBooking(bookingId);
            }
        });
    });
}

function createBookingCard(booking) {
    return `
        <div class="booking-card">
            <div class="booking-status">✓ ${booking.status}</div>
            <div class="booking-header">
                <div>
                    <div class="train-name">${booking.trainName}</div>
                    <div class="booking-id">Booking ID: ${booking.id}</div>
                </div>
                <div class="train-number">${booking.trainNumber}</div>
            </div>

            <div class="booking-details-grid">
                <div class="booking-item">
                    <div class="booking-label">Passenger Name</div>
                    <div class="booking-value">${booking.passengerName}</div>
                </div>
                <div class="booking-item">
                    <div class="booking-label">Class</div>
                    <div class="booking-value">${booking.classType}</div>
                </div>
                <div class="booking-item">
                    <div class="booking-label">Route</div>
                    <div class="booking-value">${booking.source} → ${booking.destination}</div>
                </div>
                <div class="booking-item">
                    <div class="booking-label">Seats</div>
                    <div class="booking-value">${booking.seats.join(', ')}</div>
                </div>
                <div class="booking-item">
                    <div class="booking-label">Departure</div>
                    <div class="booking-value">${booking.departureTime}</div>
                </div>
                <div class="booking-item">
                    <div class="booking-label">Price</div>
                    <div class="booking-value">₹${booking.price}</div>
                </div>
            </div>

            <button class="cancel-booking-btn" data-booking-id="${booking.id}">
                Cancel Booking
            </button>
        </div>
    `;
}

function cancelBooking(bookingId) {
    allBookings = allBookings.filter(booking => booking.id !== bookingId);
    localStorage.setItem('trainBookings', JSON.stringify(allBookings));
    updateNotification('Booking cancelled successfully', 'success');
    displayMyBookings();
}

// Live Train Tracking
function trackTrain() {
    const trainNumber = document.getElementById('trainNumber').value.trim();

    if (!trainNumber) {
        updateNotification('Please enter a train number', 'error');
        return;
    }

    const train = trainsData.find(t => t.number === trainNumber);

    if (!train) {
        updateNotification('Train not found', 'error');
        return;
    }

    displayTrackingInfo(train);
}

function displayTrackingInfo(train) {
    const trackingInfo = document.getElementById('trackingInfo');
    
    const statuses = ['On Time', 'Delayed by 10 minutes', 'Arriving Soon'];
    const currentStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    const delay = currentStatus.includes('Delayed') ? '10m' : '0m';
    const expectedArrival = addMinutesToTime(train.arrivalTime, parseInt(delay));

    trackingInfo.innerHTML = `
        <div class="tracking-header">
            <h3>${train.name} (${train.number})</h3>
            <div class="tracking-status">
                <div class="status-dot"></div>
                <span>${currentStatus}</span>
            </div>
        </div>

        <div class="tracking-map">
            <div class="train-position" id="animatedTrain">🚂</div>
            <p>Currently between ${train.source} and ${train.destination}</p>
            <div style="margin-top: 1rem; display: flex; justify-content: space-around; font-size: 0.95rem;">
                <div>📍 ${train.source}</div>
                <div>↔️ In Transit</div>
                <div>📍 ${train.destination}</div>
            </div>
        </div>

        <div class="tracking-details">
            <div class="tracking-detail">
                <div class="tracking-detail-label">Current Location</div>
                <div class="tracking-detail-value">Kilometer: ${Math.floor(Math.random() * 500) + 100}</div>
            </div>
            <div class="tracking-detail">
                <div class="tracking-detail-label">Current Speed</div>
                <div class="tracking-detail-value">${Math.floor(Math.random() * 80) + 60} km/h</div>
            </div>
            <div class="tracking-detail">
                <div class="tracking-detail-label">Scheduled Arrival</div>
                <div class="tracking-detail-value">${train.arrivalTime}</div>
            </div>
            <div class="tracking-detail">
                <div class="tracking-detail-label">Expected Arrival</div>
                <div class="tracking-detail-value">${expectedArrival}</div>
            </div>
        </div>

        <div style="margin-top: 1.5rem; padding: 1rem; background-color: rgba(255, 255, 255, 0.1); border-radius: 8px;">
            <p style="font-size: 0.9rem; margin-bottom: 0.5rem;">🚊 Next Stops:</p>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap; font-size: 0.85rem;">
                <span>▪ Station A (${addMinutesToTime(train.departureTime, 120)})</span>
                <span>▪ Station B (${addMinutesToTime(train.departureTime, 240)})</span>
                <span>▪ Station C (${addMinutesToTime(train.departureTime, 360)})</span>
            </div>
        </div>
    `;

    // Add animation
    animateTrainPosition();
}

function animateTrainPosition() {
    const trainElement = document.getElementById('animatedTrain');
    if (trainElement) {
        let position = 0;
        setInterval(() => {
            position = (position + 5) % 100;
            trainElement.style.marginLeft = position + '%';
        }, 1000);
    }
}

function addMinutesToTime(time, minutes) {
    const [hours, mins] = time.split(':').map(Number);
    const totalMins = hours * 60 + mins + minutes;
    const newHours = Math.floor((totalMins / 60) % 24);
    const newMins = totalMins % 60;
    return `${String(newHours).padStart(2, '0')}:${String(newMins).padStart(2, '0')}`;
}

// Notification System
function updateNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification show ${type}`;

    setTimeout(() => {
        notification.classList.add('hide');
        setTimeout(() => {
            notification.classList.remove('show', 'hide', type);
        }, 300);
    }, 3000);
}

// Empty State
function createEmptyState(message, icon) {
    return `
        <div style="grid-column: 1 / -1;">
            <div class="empty-state">
                <div class="empty-state-icon">${icon}</div>
                <h3>${message}</h3>
                <p>Start exploring available options</p>
            </div>
        </div>
    `;
}