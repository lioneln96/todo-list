from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
db = SQLAlchemy(app)


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    status = db.Column(db.String(20))


@app.route('/')
def index():
    todo_tasks = Task.query.filter_by(status='To Do').all()
    in_progress_tasks = Task.query.filter_by(status='In Progress').all()
    done_tasks = Task.query.filter_by(status='Done').all()
    return render_template('index.html', todo_tasks=todo_tasks, in_progress_tasks=in_progress_tasks, done_tasks=done_tasks)


@app.route('/add_task', methods=['POST'])
def add_task():
    title = request.form['title']
    status = request.form['status']
    new_task = Task(title=title, status=status)
    db.session.add(new_task)
    db.session.commit()
    return jsonify({'message': 'Task added successfully'})


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

