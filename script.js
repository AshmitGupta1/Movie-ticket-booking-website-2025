// Movie Data
const movies = [
    {
        id: 1,
        title: "The Dark Universe",
        genre: "Action, Sci-Fi",
        duration: "148 min",
        rating: "PG-13",
        price: 12,
        poster: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600'%3E%3Crect width='400' height='600' fill='%23222'/%3E%3Ctext x='50%25' y='40%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='24' fill='%23e50914'%3E🌌%3C/text%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='20' fill='%23fff'%3EThe Dark%3C/text%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='20' fill='%23fff'%3EUniverse%3C/text%3E%3C/svg%3E",
        description: "In a dystopian future, humanity's last hope lies in uncovering the secrets of a dark parallel universe. Join our heroes as they battle through space and time.",
        showtimes: ["10:00 AM", "1:30 PM", "4:45 PM", "7:30 PM", "10:15 PM"]
    },
    {
        id: 2,
        title: "Love in Paris",
        genre: "Romance, Drama",
        duration: "126 min",
        rating: "PG",
        price: 10,
        poster: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600'%3E%3Crect width='400' height='600' fill='%23ff69b4'/%3E%3Ctext x='50%25' y='40%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='48' fill='%23fff'%3E💕%3C/text%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='20' fill='%23fff'%3ELove in%3C/text%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='20' fill='%23fff'%3EParis%3C/text%3E%3C/svg%3E",
        description: "A heartwarming story of two strangers who meet by chance in the beautiful streets of Paris and discover that love can happen when you least expect it.",
        showtimes: ["11:00 AM", "2:00 PM", "5:00 PM", "8:00 PM"]
    },
    {
        id: 3,
        title: "Horror Mansion",
        genre: "Horror, Thriller",
        duration: "112 min",
        rating: "R",
        price: 11,
        poster: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600'%3E%3Crect width='400' height='600' fill='%23000'/%3E%3Ctext x='50%25' y='40%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='48' fill='%23ff0000'%3E👻%3C/text%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='20' fill='%23fff'%3EHorror%3C/text%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='20' fill='%23fff'%3EMansion%3C/text%3E%3C/svg%3E",
        description: "A group of friends spend a weekend in an abandoned mansion, only to discover they're not alone. Terror lurks in every corner of this spine-chilling thriller.",
        showtimes: ["12:00 PM", "3:30 PM", "6:30 PM", "9:30 PM"]
    },
    {
        id: 4,
        title: "Comedy Central",
        genre: "Comedy",
        duration: "105 min",
        rating: "PG-13",
        price: 10,
        poster: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600'%3E%3Crect width='400' height='600' fill='%23ffd700'/%3E%3Ctext x='50%25' y='40%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='48' fill='%23000'%3E😂%3C/text%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='20' fill='%23000'%3EComedy%3C/text%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='20' fill='%23000'%3ECentral%3C/text%3E%3C/svg%3E",
        description: "Get ready for non-stop laughter! This hilarious comedy follows a bumbling detective who accidentally becomes the city's most unlikely hero.",
        showtimes: ["10:30 AM", "1:00 PM", "4:00 PM", "7:00 PM", "9:45 PM"]
    },
    {
        id: 5,
        title: "Ocean Adventure",
        genre: "Adventure, Family",
        duration: "118 min",
        rating: "G",
        price: 9,
        poster: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600'%3E%3Crect width='400' height='600' fill='%2300bfff'/%3E%3Ctext x='50%25' y='40%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='48' fill='%23fff'%3E🌊%3C/text%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='20' fill='%23fff'%3EOcean%3C/text%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='20' fill='%23fff'%3EAdventure%3C/text%3E%3C/svg%3E",
        description: "Dive into an underwater world of wonder! Join a young explorer and her marine friends on an epic quest to save the ocean from pollution.",
        showtimes: ["9:30 AM", "12:30 PM", "3:00 PM", "5:30 PM", "8:00 PM"]
    },
    {
        id: 6,
        title: "Warrior's Quest",
        genre: "Action, Adventure",
        duration: "142 min",
        rating: "PG-13",
        price: 12,
        poster: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='600'%3E%3Crect width='400' height='600' fill='%238b4513'/%3E%3Ctext x='50%25' y='40%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='48' fill='%23fff'%3E⚔️%3C/text%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='20' fill='%23fff'%3EWarrior's%3C/text%3E%3Ctext x='50%25' y='55%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial, sans-serif' font-size='20' fill='%23fff'%3EQuest%3C/text%3E%3C/svg%3E",
        description: "An ancient warrior must rise from the ashes to defend his kingdom from an invading army. Epic battles and breathtaking stunts await in this action-packed adventure.",
        showtimes: ["11:30 AM", "2:30 PM", "5:30 PM", "8:30 PM"]
    }
];

// Global variables
let selectedMovie = null;
let selectedShowtime = null;
let selectedSeats = [];

// Constants
const SEAT_ROWS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const SEATS_PER_ROW = 10;

// Initialize homepage
function initHomePage() {
    if (document.getElementById('moviesGrid')) {
        displayMovies();
        setupModal();
    }
}

// Display movies on homepage
function displayMovies() {
    const moviesGrid = document.getElementById('moviesGrid');
    moviesGrid.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.className = 'movie-card';
        movieCard.onclick = () => openMovieModal(movie);

        movieCard.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            <div class="movie-info-card">
                <h4>${movie.title}</h4>
                <div class="movie-meta-card">
                    <span>${movie.genre}</span>
                    <span>${movie.duration}</span>
                </div>
                <div class="movie-price">$${movie.price}</div>
            </div>
        `;

        moviesGrid.appendChild(movieCard);
    });
}

// Setup modal
function setupModal() {
    const modal = document.getElementById('movieModal');
    const closeBtn = document.getElementsByClassName('close')[0];

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

// Open movie modal
function openMovieModal(movie) {
    const modal = document.getElementById('movieModal');
    
    document.getElementById('modalPoster').src = movie.poster;
    document.getElementById('modalTitle').textContent = movie.title;
    document.getElementById('modalGenre').textContent = movie.genre;
    document.getElementById('modalDuration').textContent = movie.duration;
    document.getElementById('modalRating').textContent = movie.rating;
    document.getElementById('modalDescription').textContent = movie.description;

    const showtimesList = document.getElementById('showtimesList');
    showtimesList.innerHTML = '';

    movie.showtimes.forEach(time => {
        const btn = document.createElement('button');
        btn.className = 'showtime-btn';
        btn.textContent = time;
        btn.onclick = () => selectShowtime(movie, time);
        showtimesList.appendChild(btn);
    });

    modal.style.display = 'block';
}

// Select showtime and navigate to booking page
function selectShowtime(movie, time) {
    selectedMovie = movie;
    selectedShowtime = time;
    
    // Store in sessionStorage for booking page
    sessionStorage.setItem('selectedMovie', JSON.stringify(movie));
    sessionStorage.setItem('selectedShowtime', time);
    
    window.location.href = 'booking.html';
}

// Initialize booking page
function initBookingPage() {
    if (document.getElementById('seatsContainer')) {
        loadBookingInfo();
        generateSeats();
        setupBookingForm();
    }
}

// Load booking information
function loadBookingInfo() {
    const movieData = sessionStorage.getItem('selectedMovie');
    const showtime = sessionStorage.getItem('selectedShowtime');

    if (!movieData || !showtime) {
        alert('No movie selected. Redirecting to homepage...');
        window.location.href = 'index.html';
        return;
    }

    selectedMovie = JSON.parse(movieData);
    selectedShowtime = showtime;

    document.getElementById('selectedMovie').textContent = selectedMovie.title;
    document.getElementById('selectedShowtime').textContent = `Showtime: ${selectedShowtime}`;
    document.getElementById('ticketPrice').textContent = `$${selectedMovie.price}`;
}

// Generate seats
function generateSeats() {
    const seatsContainer = document.getElementById('seatsContainer');

    // Generate random occupied seats (20% of total seats)
    const occupiedSeats = generateRandomOccupiedSeats(SEAT_ROWS.length * SEATS_PER_ROW, 0.2);

    SEAT_ROWS.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';

        const rowLabel = document.createElement('span');
        rowLabel.className = 'row-label';
        rowLabel.textContent = row;
        rowDiv.appendChild(rowLabel);

        for (let i = 1; i <= SEATS_PER_ROW; i++) {
            const seat = document.createElement('div');
            seat.className = 'seat';
            const seatId = `${row}${i}`;
            seat.dataset.seatId = seatId;

            if (occupiedSeats.includes(seatId)) {
                seat.classList.add('occupied');
            } else {
                seat.addEventListener('click', () => toggleSeat(seat, seatId));
            }

            rowDiv.appendChild(seat);
        }

        seatsContainer.appendChild(rowDiv);
    });
}

// Generate random occupied seats
function generateRandomOccupiedSeats(totalSeats, percentage) {
    const occupied = [];
    const numOccupied = Math.floor(totalSeats * percentage);

    while (occupied.length < numOccupied) {
        const row = SEAT_ROWS[Math.floor(Math.random() * SEAT_ROWS.length)];
        const seatNum = Math.floor(Math.random() * SEATS_PER_ROW) + 1;
        const seatId = `${row}${seatNum}`;
        
        if (!occupied.includes(seatId)) {
            occupied.push(seatId);
        }
    }

    return occupied;
}

// Toggle seat selection
function toggleSeat(seatElement, seatId) {
    if (seatElement.classList.contains('occupied')) {
        return;
    }

    if (seatElement.classList.contains('selected')) {
        seatElement.classList.remove('selected');
        selectedSeats = selectedSeats.filter(id => id !== seatId);
    } else {
        seatElement.classList.add('selected');
        selectedSeats.push(seatId);
    }

    updateBookingSummary();
}

// Update booking summary
function updateBookingSummary() {
    const ticketCount = selectedSeats.length;
    const total = ticketCount * selectedMovie.price;

    document.getElementById('selectedSeatsDisplay').textContent = 
        selectedSeats.length > 0 ? selectedSeats.sort().join(', ') : 'None';
    document.getElementById('ticketCount').textContent = ticketCount;
    document.getElementById('totalAmount').textContent = `$${total}`;

    // Enable/disable book button
    const bookButton = document.getElementById('bookButton');
    bookButton.disabled = selectedSeats.length === 0;
}

// Setup booking form
function setupBookingForm() {
    const form = document.getElementById('bookingForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        processBooking();
    });
}

// Process booking
function processBooking() {
    const userName = document.getElementById('userName').value;
    const userEmail = document.getElementById('userEmail').value;
    const userPhone = document.getElementById('userPhone').value;

    if (selectedSeats.length === 0) {
        alert('Please select at least one seat');
        return;
    }

    // Generate a more robust booking ID with random component
    const timestamp = Date.now().toString().substring(7);
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    const bookingId = 'BK' + timestamp + random;
    const total = selectedSeats.length * selectedMovie.price;

    const booking = {
        bookingId: bookingId,
        movie: selectedMovie.title,
        showtime: selectedShowtime,
        seats: selectedSeats.sort().join(', '),
        name: userName,
        email: userEmail,
        phone: userPhone,
        total: total,
        date: new Date().toLocaleDateString()
    };

    // Store booking in sessionStorage
    sessionStorage.setItem('currentBooking', JSON.stringify(booking));

    // Store in localStorage for history
    let bookingHistory = JSON.parse(localStorage.getItem('bookingHistory') || '[]');
    bookingHistory.push(booking);
    localStorage.setItem('bookingHistory', JSON.stringify(bookingHistory));

    // Redirect to confirmation page
    window.location.href = 'confirmation.html';
}

// Initialize confirmation page
function initConfirmationPage() {
    if (document.getElementById('bookingId')) {
        displayConfirmation();
    }
}

// Display confirmation
function displayConfirmation() {
    const bookingData = sessionStorage.getItem('currentBooking');

    if (!bookingData) {
        alert('No booking found. Redirecting to homepage...');
        window.location.href = 'index.html';
        return;
    }

    const booking = JSON.parse(bookingData);

    document.getElementById('bookingId').textContent = booking.bookingId;
    document.getElementById('confirmMovie').textContent = booking.movie;
    document.getElementById('confirmShowtime').textContent = `${booking.date} at ${booking.showtime}`;
    document.getElementById('confirmSeats').textContent = booking.seats;
    document.getElementById('confirmName').textContent = booking.name;
    document.getElementById('confirmEmail').textContent = booking.email;
    document.getElementById('confirmPhone').textContent = booking.phone;
    document.getElementById('confirmTotal').textContent = `$${booking.total}`;
}

// Initialize appropriate page
document.addEventListener('DOMContentLoaded', () => {
    // Check which page we're on
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) {
        initHomePage();
    } else if (window.location.pathname.includes('booking.html')) {
        initBookingPage();
    } else if (window.location.pathname.includes('confirmation.html')) {
        initConfirmationPage();
    }
});
