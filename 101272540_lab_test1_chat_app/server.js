const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRoutes = require("./routes/userRoute")
const cors = require('cors');

const app = express();
const server = http.createServer(app); 
const io = socketIO(server); 
const PORT = process.env.PORT || 3000;

// Mongoose

const DB_CONNECTION_STRING = "mongodb+srv://dbrootadmin:dbpassword@cluster0.o0ag19w.mongodb.net/comp3133_labtest1?retryWrites=true&w=majority"
mongoose.connect(DB_CONNECTION_STRING,{
    useNewUrlParser: true,
    useUnifiedTopology: true  
})

// Middleware
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static(__dirname)); 

// Routes
app.use("/user", userRoutes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + 'index.html');
});


// Socket.io event handling
io.on('connection', (socket) => {
    console.log(`${socket.id} connected`);

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);
    });

    socket.on('chat_message', (msg) => {
        io.emit('chat_message', msg);
    });

    socket.on('join_group', (room) => {
        console.log(`User ${socket.id} joined room ${room}`)
        socket.join(room);
    })
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}/`);
});
