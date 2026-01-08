# Movie Ticket Booking Website 🎬

A modern, responsive movie ticket booking website built with HTML, CSS, and JavaScript.

## Features

- **Movie Listings**: Browse through available movies with posters, descriptions, and showtimes
- **Interactive Seat Selection**: Choose your preferred seats with a visual seat map
- **Real-time Price Calculation**: See the total cost update as you select seats
- **Booking Management**: Enter your details and complete the booking process
- **Confirmation Page**: Get a digital ticket with booking details and a unique booking ID
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Local Storage**: Booking history is saved in your browser

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- Session Storage & Local Storage

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/AshmitGupta1/Movie-ticket-booking-website-2025.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Movie-ticket-booking-website-2025
   ```

3. Open `index.html` in your web browser or use a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   
   # Using Node.js http-server
   npx http-server
   ```

4. Visit `http://localhost:8000` in your browser

## How to Use

1. **Browse Movies**: View available movies on the homepage
2. **Select Movie**: Click on a movie card to see details and showtimes
3. **Choose Showtime**: Select your preferred showtime
4. **Select Seats**: Pick your seats from the interactive seat map
5. **Enter Details**: Fill in your name, email, and phone number
6. **Book Tickets**: Click the "Book Tickets" button to confirm
7. **Get Confirmation**: View your e-ticket with booking details

## Project Structure

```
Movie-ticket-booking-website-2025/
│
├── index.html          # Homepage with movie listings
├── booking.html        # Seat selection and booking page
├── confirmation.html   # Booking confirmation page
├── styles.css          # All styling and responsive design
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## Features in Detail

### Movie Listings
- 6 sample movies with different genres
- Movie posters, titles, genres, duration, and pricing
- Hover effects for better user experience

### Seat Selection
- 8 rows (A-H) with 10 seats each
- Visual representation of available, selected, and occupied seats
- Random seat occupation for realistic simulation
- Click to select/deselect seats

### Booking Process
- Form validation for user details
- Real-time summary of selected seats and total price
- Booking ID generation
- Session and local storage for data persistence

### Responsive Design
- Mobile-friendly layout
- Adapts to different screen sizes
- Print-friendly confirmation page

## Future Enhancements

- Backend integration with database
- Payment gateway integration
- User authentication and profiles
- Email confirmation
- Movie search and filtering
- Reviews and ratings
- Admin panel for movie management

## College Project

This is a college project demonstrating web development skills using HTML, CSS, and JavaScript.

## License

This project is open source and available for educational purposes.
