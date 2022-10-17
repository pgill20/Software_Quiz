from unittest import TestCase
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return 'Software Quiz Homepage'

headings = ("Rank", "Name", "Email", "Test", "Score")
data = (
    ("1", "John Daily", "jd@google.com", "A", "22"),
    ("2", "Kevin Daily", "jacobd@google.com", "A", "24"),
    ("3", "Vicky Brown", "brownv@osu.com", "A", "28")
)

@app.route('/ranking')
def table():
    return render_template("table.html", headings=headings, data=data)

app.run(host='0.0.0.0', port=81)
