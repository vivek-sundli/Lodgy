document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    let location = document.getElementById('location').value;
    let checkin = document.getElementById('checkin').value;
    let checkout = document.getElementById('checkout').value;

    // Dummy data for demonstration
    let rooms = [
        { name: 'Luxury Suite', location: location, price: '$200/night', image: 'room1.jpg' },
        { name: 'Deluxe Room', location: location, price: '$150/night', image: 'room2.jpg' },
        { name: 'Standard Room', location: location, price: '$100/night', image: 'room3.jpg' }
    ];

    let roomList = document.querySelector('.room-list');
    roomList.innerHTML = '';
    rooms.forEach(room => {
        let roomCard = document.createElement('div');
        roomCard.className = 'room-card';
        roomCard.innerHTML = `
            <img src="${room.image}" alt="${room.name}">
            <h3>${room.name}</h3>
            <p>Location: ${room.location}</p>
            <p>Price: ${room.price}</p>
        `;
        roomList.appendChild(roomCard);
    });
});
async function fetchRooms() {
    try {
        let response = await fetch('http://localhost:3000/api/rooms');
        let rooms = await response.json();
        let roomList = document.querySelector('.room-list');
        roomList.innerHTML = '';

        rooms.forEach(room => {
            let roomCard = document.createElement('div');
            roomCard.className = 'room-card';
            roomCard.innerHTML = `
                <img src="${room.imageUrl}" alt="${room.name}">
                <h3>${room.name}</h3>
                <p>Location: ${room.location}</p>
                <p>Price: $${room.price} per night</p>
            `;
            roomList.appendChild(roomCard);
        });
    } catch (error) {
        console.error('Error fetching rooms:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchRooms);
