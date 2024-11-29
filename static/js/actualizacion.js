//Creamos las variables del DOM
const socket = io();

const chatbox = document.getElementById('chatbox')
const messageInput = document.getElementById('message')
const sendButton = document.getElementById('send')

sendButton.addEventListener('click', sendMessage);


//Funcion del boton enviar  mensaje
function sendMessage(){
    //creamos una variable que almacena y recolecta datos de nuestro prompt
    const message = messageInput.value.trim()
    //Condicion por si no hay texto
    if (message !== '') {
        appendMenssage('You:' + message);
        messageInput.value = '';
        //Simulacion de recepcion de mesaje on IA
        setTimeout(iaBot, 1000)
    }
    
}
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
//Funcion de mostrar mensaje en el chat
function appendMenssage(message){
    const p = document.createElement('p');
    p.textContent = message;
    //Añadimos a nuetro div chatbox
    chatbox.appendChild(p);
    chatbox.scrollTop = chatbox.scrollHeight;
}
