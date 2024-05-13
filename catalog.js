document.getElementById('roomForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let location = document.getElementById('location').value;
    let price = document.getElementById('price').value;
    let image = document.getElementById('image').files[0];

    let formData = new FormData();
    formData.append('name', name);
    formData.append('location', location);
    formData.append('price', price);
    formData.append('image', image);

    try {
        let response = await fetch('http://localhost:3000/api/rooms', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Room added successfully!');
            document.getElementById('roomForm').reset();
        } else {
            alert('Failed to add room.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while adding the room.');
    }
});
