import os
from flask import Flask, render_template, send_from_directory, redirect, url_for, request
from flask_socketio import SocketIO, emit
import sqlite3

app = Flask(__name__)
#Ruta para los templates
#template_dir = os.path.abspath('app/templates')

#funcion para conectarse a la base de datos
def connect_db():
    return sqlite3.connect('usuarios.db')

#Función para crear la tabla de usuarios si no existe
def create_table():
    conn = connect_db()
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS usuarios
                (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT)''')
    conn.commit()
    conn.close()

# Llamar a la función create_table al iniciar la aplicación
create_table()

#Inicialisador del programa
app.config['SECRET_KEY'] = 'your_secret_key'
socketio = SocketIO(app)

#Establecimiento de las rutas
@app.route('/')
def mainPage():
    return render_template('home.html')

@app.route('/chat')
def chat():
    return render_template('chat.html') 


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        passwoerd = request.form['password']
        conect = connect_db()
        c = conect.cursor()
        c.execute('SELECT * FROM usuarios WHERE username=? AND password=?', (username, passwoerd))
        user = c.fetchone()
        conect.close()
        
        if user:
            return redirect(url_for('chat'))
        else:
            return redirect(url_for('login'))
        
    return render_template('login.html')

@app.route('/register', methods=['GET', 'POST'])
def register():
    #codigo para reguistrar usuarios
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        conn = connect_db()
        c = conn.cursor()
        
        try:
            c.execute('INSERT INTO usuarios (username, password) VALUES (?, ?)', (username, password))
            conn.commit()
            conn.close()
            return redirect(url_for('login'))
        except sqlite3.IntegrityError:
            conn.close()
            return 'El usuario ya existe'
        
    return render_template('register.html')

@app.route('/redirect_chat')
def redirect_chat():
    return redirect(url_for('chat'))


#Funcion para gargar los archivos css, js 
@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

#funcion del evento de mensaje definido por los cliente
@socketio.on('message')
def handle_message(message):
    print('Message: ' + message)
    emit('message', message, broadcast=True)
    

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0')