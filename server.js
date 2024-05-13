const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/lodgy', { useNewUrlParser: true, useUnifiedTopology: true });

const roomSchema = new mongoose.Schema({
    name: String,
    location: String,
    price: Number,
    imageUrl: String
});

const Room = mongoose.model('Room', roomSchema);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/api/rooms', upload.single('image'), async (req, res) => {
    try {
        const room = new Room({
            name: req.body.name,
            location: req.body.location,
            price: req.body.price,
            imageUrl: `/uploads/${req.file.filename}`
        });

        await room.save();
        res.status(200).send('Room added successfully');
    } catch (error) {
        res.status(500).send('Error adding room');
    }
});

app.use('/uploads', express.static('uploads'));

app.get('/api/rooms', async (req, res) => {
    try {
        const rooms = await Room.find();
        res.json(rooms);
    } catch (error) {
        res.status(500).send('Error fetching rooms');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
