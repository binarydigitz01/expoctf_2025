from flask import Flask, render_template, request, session, redirect, url_for
import sqlite3
import os

app = Flask(__name__)
app.secret_key = 'mai-san best girl'

def init_db():
    """Initialize the SQLite database with a dummy user."""
    conn = sqlite3.connect('ctf_database.db')
    cursor = conn.cursor()

    # Drop existing table to start fresh each time
    cursor.execute('DROP TABLE IF EXISTS users')
    
    cursor.execute('''
        CREATE TABLE users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    
    # Add one dummy user so the table isn't empty
    cursor.execute(
        'INSERT INTO users (username, password) VALUES (?, ?)',
        ('mai-san-is-best-girl-no-one-can-tell-me-other-wise', 'my-cat-is-bald-not-my-fault')
    )
    
    conn.commit()
    conn.close()
    print("Database initialized with dummy user!")

init_db()

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login():
    """Intentionally vulnerable login (SQLi challenge)."""
    username = request.form['username']
    password = request.form['password']

    # Key change: password comes first in the query
    query = f"SELECT * FROM users WHERE password = '{password}' AND username = '{username}'"
    print(f"Executing query: {query}")

    try:
        conn = sqlite3.connect('ctf_database.db')
        cursor = conn.cursor()
        cursor.execute(query)
        user = cursor.fetchone()
        conn.close()

        if user:
            session.clear()
            session['user_id'] = user[0]
            session['username'] = user[1]
            return redirect(url_for('dashboard'))
        else:
            return render_template('login.html', error='Invalid credentials')

    except sqlite3.Error as e:
        return render_template('login.html', error=f'Database error: {str(e)}')

@app.route('/dashboard')
def dashboard():
    """Locked-down dashboard. Only accessible if logged in."""
    if not session.get('user_id'):
        return redirect(url_for('index'))

    flag = "expoctf{SQL_1NJ3CT10N_N3WBI3}mist"
    return render_template('dashboard.html', flag=flag)

@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
