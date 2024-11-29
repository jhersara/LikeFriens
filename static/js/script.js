// Código JavaScript adaptado para funcionar con la estructura HTML original
const socket = io();
const chatbox = document.getElementById('chatbox');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send');

// Agregamos un evento al botón de enviar
sendButton.addEventListener('click', sendMessage);

// Función para enviar mensajes
function sendMessage() {
    // Recolectamos el mensaje del input
    const message = messageInput.value.trim();
    
    // Verificamos si el mensaje no está vacío
    if (message !== '') {
        // Enviamos el mensaje a través de Socket.IO
        socket.emit('message', message);
        messageInput.value = '';
    }
}

// Función para mostrar mensajes en el chatbox
function appendMessage(message) {
    const p = document.createElement('p');
    p.textContent = message;
    chatbox.appendChild(p);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Agregamos un event listener al socket para recibir mensajes
socket.on('message', function(msg) {
    // Llamamos a la función para mostrar el mensaje recibido en el chatbox
    appendMessage(msg);
})

//Funcion de la iabot vhat
function iaBot( ){
    const messages = [
        'Hola!',
        'Como estas tu?',
        'Que te gusta aser.?',
        'Hello!',
        'How are you?',
        'What are your hobbies?',
        'Nice weather today, isn\'t it?',
        'Do you have any pets?',
        'What do you like to do in your free time?'
    ];

    //Codigo para que sea aleatorio las pregutas
    const randomSenSms = messages[Math.floor(Math.random() * messages.length)];
    appendMenssage('IABot: ' + randomSenSms);
}

