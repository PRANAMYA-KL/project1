from flask import Flask, render_template, request, redirect, url_for
from werkzeug.utils import secure_filename
import os
import json

app = Flask(__name__)

WISHES_FILE = "wishes.json"
UPLOAD_FOLDER = "static/uploads"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Load existing wishes from file
def load_wishes():
    if os.path.exists(WISHES_FILE):
        with open(WISHES_FILE, 'r', encoding='utf-8') as f:
            try:
                return json.load(f)
            except json.JSONDecodeError:
                return []
    return []

# Save current wishes to file
def save_wishes(wishes):
    with open(WISHES_FILE, 'w', encoding='utf-8') as f:
        json.dump(wishes, f, indent=4, ensure_ascii=False)

@app.route('/', methods=['GET', 'POST'])
def index():
    wishes = load_wishes()

    if request.method == 'POST':
        name = request.form.get('name')
        place = request.form.get('place')
        school = request.form.get('school')
        batch = request.form.get('batch')
        message = request.form.get('message')
        photo = request.files.get('photo')

        photo_path = None
        if photo and photo.filename:
            filename = secure_filename(photo.filename)
            photo.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            photo_path = url_for('static', filename=f'uploads/{filename}')

        wishes.append({
            'name': name,
            'place': place,
            'school': school,
            'batch': batch,
            'message': message,
            'photo': photo_path
        })

        save_wishes(wishes)

        return redirect(url_for('index'))

    admin = request.args.get('admin') == '1'
    return render_template('index.html', wishes=wishes, admin=admin)

@app.route('/delete/<int:wish_id>', methods=['POST'])
def delete_wish(wish_id):
    wishes = load_wishes()

    if 0 <= wish_id < len(wishes):
        del wishes[wish_id]
        save_wishes(wishes)

    if request.args.get("admin") == "1":
        return redirect(url_for('index', admin=1))
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
