"use strict";

const socket = io();

// Socket.io event handling
socket.on('chat_message', function(data){
    console.log(`${socket.id}: ${data}`);
    displayMessage(`Chat: ${data}`);
});

const joinRoomButton = document.getElementById("enter-room-btn"); // Get the enter room button
joinRoomButton.addEventListener("click", () => {
    const room = document.getElementById("room-message").value; // Get the room input value
    socket.emit("join_group", room); // Emit join_group event with room value
});

function displayMessage(message){
    const div = document.createElement('div');
    div.textContent = message;
    document.querySelector('.container-chat-window').appendChild(div); // Append message to chat window
}

function sendMessage() {
    const txtmessage = document.getElementById('input-message');
    socket.emit('chat_message', txtmessage.value);
    txtmessage.value = ""; // Clear input field after sending message
}

