import sqlite3

conn = sqlite3.connect('usuarios.db')
c = conn.cursor()

#Crea la tabla de usuarios si no exite
c.execute('''CREATE TABLE IF NOT EXISTS usuarios
            (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password TEXT )''')

#Guarda los cambios y sierra la conecion
conn.commit()
conn.close()