const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const http = require("http");
const cors = require("cors");
const { log } = require("console");
const { PythonShell } = require('python-shell');
const axios = require('axios');

app.use(cors());

const server = http.createServer(app);
app.use(bodyParser.json());

const uri = 'mongodb://127.0.0.1:27017/issues';

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

const messageSchema = new mongoose.Schema({
    room: String,
    author: String,
    message: String,
    time: String
});
const Message = mongoose.model('Message', messageSchema);

const userSchema = new mongoose.Schema({
    username: String,
    password: String
});
const User = mongoose.model('User', userSchema);

const roomSchema = new mongoose.Schema({
    author: String,
    room_id: String,
    issue: String,
    status: String,
    sentimentScore: Number
});
const Room = mongoose.model('Room', roomSchema);


app.get('/test', (req, res) => {
    console.log('Hello from Express.js');
    res.send('Hello from Express.js');
});


app.post('/get_rooms', async (req, res) => {
    try {
        const { username } = req.body;
        const rooms = await Room.find({ author: username }).distinct('room_id');

        // Fetch statuses for each room
        const roomStatusPromises = rooms.map(async (roomId) => {
            try {
                const room = await Room.findOne({ room_id: roomId });
                const status = room ? room.status : 'Unknown';
                return { room: roomId, status };
            } catch (error) {
                console.error('Error fetching room status:', error);
                return { room: roomId, status: 'Unknown' };
            }
        });

        const roomsWithStatus = await Promise.all(roomStatusPromises);

        res.json(roomsWithStatus);
    } catch (err) {
        console.error('Error fetching rooms:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/get_all_rooms', async (req, res) => {
    try {
        const { username } = req.query; // Change req.body to req.query
        const rooms = await Room.find({ status: 'Active' }).distinct('room_id');

        // Fetch statuses and sentiment scores for each room
        const roomStatusPromises = rooms.map(async (roomId) => {
            try {
                const room = await Room.findOne({ room_id: roomId });
                const status = room ? room.status : 'Unknown';
                const sentimentScore = room && room.sentimentScore !== undefined ? room.sentimentScore : -1;

                return { room: roomId, status, sentimentScore };
            } catch (error) {
                console.error('Error fetching room status:', error);
                return { room: roomId, status: 'Unknown', sentimentScore: -1 };
            }
        });

        const roomsWithStatus = await Promise.all(roomStatusPromises);

        // Sort rooms based on sentiment score in decreasing order
        roomsWithStatus.sort((a, b) => b.sentimentScore - a.sentimentScore);

        res.json(roomsWithStatus);
    } catch (err) {
        console.error('Error fetching rooms:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




function generateRoomId() {
    return Math.random().toString(36).substring(2, 8);
}


app.post('/add_issue', async (req, res) => {
    console.log('Request body:', req.body);

    try {
        // Call the sentiment analysis API with the issue text
        const sentimentResponse = await axios.post('http://127.0.0.1:5000/analyze-sentiment', {
            newIssue: req.body.issue
        });
        console.log('jwhklhadlkgbjakjsfbslkgnskjg');
        // Extract sentiment score from the response
        const sentimentScore = sentimentResponse.data.sentiment_score;

        console.log(sentimentScore);

        // Create a new room object with issue details and sentiment score
        const newRoom = new Room({
            room_id: generateRoomId(),
            author: req.body.author,
            issue: req.body.issue,
            status: "Active",
            sentimentScore: sentimentScore // Add sentiment score to the new room
        });

        // Save the new room object to the database
        await newRoom.save();



        res.json({ success: true, message: 'Issue added successfully' });
    } catch (error) {
        console.error('Error adding issue:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


app.post('/get_message', async (req, res) => {
    const { room } = req.body.query;

    try {
        const roomData = await Room.findOne({ room_id: req.body.query });

        if (!roomData) {
            return res.status(404).json({ message: 'Room not found' });
        }

        const issues = roomData.issue;
        res.json(issues);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

app.get("/get_pending", async (req, res) => {
    try {
        const pendingRequests = await Room.find();
        res.json(pendingRequests);
    } catch (error) {
        console.error("Error fetching pending requests:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post('/update_status', async (req, res) => {
    console.log('Request to Chnage');
    const { id, status } = req.body;
    try {
        const updatedIssue = await Room.findByIdAndUpdate(id, { status }, { new: true });
        res.json({ success: true, message: 'Status updated successfully', updatedIssue });
    } catch (error) {
        console.error('Error updating status:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


app.post("/fetch_messages", async (req, res) => {
    console.log('Received : ', req.body);

    const { room } = req.body;
    try {
        const messages = await Message.find({ room });
        console.log(messages);
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: "Internal server error" });
    }
});

const getCurrentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

app.post('/add_message', async (req, res) => {
    const { room, author, message } = req.body;
    const time = getCurrentTime();
    try {
        const newMessage = new Message({ room, author, message, time });
        await newMessage.save();
        res.status(200).send('Message added successfully');
    } catch (error) {
        console.error('Error adding message:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid username or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(400).json({ success: false, message: 'Username already exists' });
        } else {
            const newUser = new User({ username, password });
            await newUser.save();
            res.status(201).json({ success: true, message: 'User signed up successfully' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.post('/add_sentiment_to_database', async (req, res) => {
    const { room, score } = req.body;

    try {
        const roomData = await Room.findOne({ room_id: room });

        if (!roomData) {
            return res.status(404).json({ message: 'Room not found' });
        }

        roomData.sentimentScore = score;
        await roomData.save();

        res.json({ success: true, message: 'Sentiment score added to the room successfully' });
    } catch (err) {
        console.error('Error adding sentiment score:', err);
        res.status(500).json({ message: 'Server Error' });
    }
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


