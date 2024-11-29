//Codigo de la vercion 2 
const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');

//Funcion al dar enviar
form.addEventListener('submit', function(e){
    e.preventDefault();
    if (input.value) {
        socket.emit('message', input.value);
        input.value = '';
    }
})

//Funcion del secket que envia el mensaje
socket.on('message', function(msg){
    var item = document.createElement('li')
    item.textContent = msg;
    document.getElementById('messages').appendChild(item)
})