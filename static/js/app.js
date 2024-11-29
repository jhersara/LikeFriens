// app.js
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');

function enviarMensaje() {
    const mensaje = messageInput.value;
    if (mensaje.trim() !== '') {
        agregarMensaje(mensaje);
        // Aquí puedes enviar el mensaje al servidor o a otros usuarios
        messageInput.value = '';
    }
}

function agregarMensaje(mensaje) {
    const nuevoMensaje = document.createElement('div');
    nuevoMensaje.textContent = mensaje;
    chatBox.appendChild(nuevoMensaje);
    chatBox.scrollTop = chatBox.scrollHeight;
}

//Funcion para mostrar popus
document.addEventListener('DOMContentLoaded', function(){
    //Obtener el formulario y el mensaje de error
    var form = document.getElementById('loginForm')
})
