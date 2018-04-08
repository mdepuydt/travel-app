from flask import Flask, request, redirect, url_for, send_from_directory, make_response
from flask_cors import CORS, cross_origin
from sys import *
import os
import sqlite3
import json
import json
from datetime import tzinfo, timedelta, datetime
from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash

# UPLOAD_FOLDER = '/home/pi/api/images'
UPLOAD_FOLDER = '/Users/marionDepuydt/Documents/repo/Angular2/travel/api/images'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CORS(app, resources={r"/api/*": {"origins": "*"}})

# Load default config and override config from an environment variable
app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'articles.db'),
    SECRET_KEY='development key',
    USERNAME='admin',
    PASSWORD='default'
))
# app.config.from_envvar('FLASKR_SETTINGS', silent=True)


FOLDER = 'images/'

CURSOR = None
CONNECTOR = None


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


def connect_db():
    """Connects to the specific database."""
    global CONNECTOR
    CONNECTOR = sqlite3.connect(app.config['DATABASE'])
    c = CONNECTOR.cursor()
    c.row_factory = sqlite3.Row
    return c


def get_db():
    """Opens a new database connection if there is none yet for the
    current application context.
    """
    global CURSOR
    if CURSOR is None:
        CURSOR = connect_db()
    return CURSOR


def get_conn():
    global CONNECTOR
    if CONNECTOR is not None:
        return CONNECTOR
    else:
        print("Error connector is null")
        return None


def formatErrorMessage(data, error_msg):
    print(error_msg)
    data["error"] = error_msg
    return make_response(json.dumps(data), 404)


@app.route('/api/user/<username>/<password>', methods=['GET'])
def show_user(username, password):
    db = get_db()
    print(username)
    user = db.execute('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]).fetchall()
    print(user)
    response = make_response(json.dumps([dict(ix) for ix in user]), 200)
    response.headers['Content-type'] = 'application/json'
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@app.route('/api/articles', methods=['GET'])
def show_articles():
    db = get_db()
    print('Starting GET articles')
    number = request.args.get('limit', default=5, type=int)
    offset = request.args.get('offset', default=0, type=int)
    articles = db.execute('SELECT * FROM articles ORDER BY creationDate DESC LIMIT ? OFFSET ?',
                          [number, offset]).fetchall()
    response = make_response(json.dumps([dict(ix) for ix in articles]), 200)
    response.headers['Content-type'] = 'application/json'
    response.headers['Access-Control-Allow-Origin'] = '*'
    print('Ending GET articles')
    return response


@app.route('/api/article', methods=['POST', 'OPTIONS'])
def post_article():
    if request.method == 'POST':
        print(request.data)
        data = json.loads(request.data)
        # Check mandatory field title is there
        if 'title' not in data:
            # resp.headers.extend(headers or {})
            return formatErrorMessage(data, 'Error: missing mandatory title')

        # Check is date is already present and well formatted
        if 'creationDate' not in data:
            print('date is not included, current time will be set')
            print(datetime.now().strftime('%Y-%m-%dT%H:%M:%S.%fZ'))
            data['creationDate'] = datetime.now().strftime('%Y-%m-%dT%H:%M:%S.%fZ')
        else:
            try:
                datetime.strptime(data['creationDate'], '%Y-%m-%dT%H:%M:%S.%fZ')
            except ValueError:
                # resp.headers.extend(headers or {})
                return formatErrorMessage(data, "Incorrect data format, should be YYYY-MM-DDThh:mm:ss.%fZ")

        # Set default value for optional field
        opt_field = ['photoName', 'latitude', 'longitude', 'content']
        for field in opt_field:
            if field not in data:
                data[field] = None
        # TODO add try catch
        # Insert in db
        db = get_db()
        db.execute('INSERT INTO articles (title, creationDate, content, photoName, latitude, longitude)'
               ' VALUES (?, ?, ?, ?, ?, ?)',
               [data['title'], data['creationDate'], data['content'],
                data['photoName'], data['latitude'], data['longitude']])
        # TODO commit()
        conn = get_conn()
        conn.commit()
        data['success'] = 'Inserted successfully into articles'
        response = make_response(json.dumps(data), 200)
        response.headers['Content-type'] = 'application/json'
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
    if request.method == 'OPTIONS':
        data = 'You can post'
        response = make_response(json.dumps(data), 200)
        response.headers['Content-type'] = 'application/json'
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Headers'] = 'content-type'
        print('Options')
        return response


@app.route('/api/article/<article_id>', methods=['DELETE', 'OPTIONS', 'PUT', 'GET'])
def delete_article(article_id):
  if request.method == 'DELETE':
    db = get_db()
    print('Starting DELETE article ' + article_id)
    db.execute('DELETE FROM articles WHERE id = ?', [article_id]).fetchall()
    conn = get_conn()
    conn.commit()
    response = make_response(json.dumps({'success': 'article deleted'}), 200)
    response.headers['Content-type'] = 'application/json'
    response.headers['Access-Control-Allow-Origin'] = '*'
    print('Ending DELETE article')
    return response
  if request.method == 'OPTIONS':
    data = 'You can DELETE or EDIT an article'
    response = make_response(json.dumps(data), 200)
    response.headers['Content-type'] = 'application/json'
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
    response.headers['Access-Control-Allow-Methods'] = 'PUT, POST, GET, DELETE, OPTIONS'
    print('Options')
    return response
  if request.method == 'PUT':
    print(request.data)
    data = json.loads(request.data)
    # Check mandatory field title is there
    if 'title' not in data:
      # resp.headers.extend(headers or {})
      return formatErrorMessage(data, 'Error: missing mandatory title')

    # Check is date is already present and well formatted
    if 'creationDate' not in data:
      print('date is not included, current time will be set')
      print(datetime.now().strftime('%Y-%m-%dT%H:%M:%S.%fZ'))
      data['creationDate'] = datetime.now().strftime('%Y-%m-%dT%H:%M:%S.%fZ')
    else:
      try:
        datetime.strptime(data['creationDate'], '%Y-%m-%dT%H:%M:%S.%fZ')
      except ValueError:
        # resp.headers.extend(headers or {})
        return formatErrorMessage(data, "Incorrect data format, should be YYYY-MM-DDThh:mm:ss.%fZ")

    # Set default value for optional field
    opt_field = ['photoName', 'latitude', 'longitude', 'content']
    for field in opt_field:
      if field not in data:
        data[field] = None
    # TODO add try catch
    # Insert in db
    db = get_db()
    db.execute('UPDATE articles SET title=?, creationDate=?, content=?, photoName=?, latitude=?, longitude=?'
               ' WHERE id=?',
               [data['title'], data['creationDate'], data['content'],
                data['photoName'], data['latitude'], data['longitude'], article_id])
    conn = get_conn()
    conn.commit()
    data['success'] = 'Updated successfully'
    response = make_response(json.dumps(data), 200)
    response.headers['Content-type'] = 'application/json'
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response
  if request.method == 'GET':
    db = get_db()
    print('Starting GET article')
    articles = db.execute('SELECT * FROM articles WHERE id=?', [article_id]).fetchall()
    json_data = [dict(ix) for ix in articles]
    response = make_response(json.dumps(json_data[0]), 200)
    response.headers['Content-type'] = 'application/json'
    response.headers['Access-Control-Allow-Origin'] = '*'
    print('Ending GET article')
    return response


@app.teardown_appcontext
def close_db(error):
    """Closes the database again at the end of the request."""
    global CURSOR
    if CURSOR is not None:
        CURSOR.close()
        CURSOR = None


@app.route("/api/photos", methods=['POST', 'OPTIONS'])
def postPhoto():
    if request.method == 'POST':
        # check if the post request has the file part
        print request.files
        if 'file' not in request.files:
            # if not request.data:
            print 'No file part'
            return redirect(request.url)
        file = request.files['file']
        # file = request.data
        # if user does not select file, browser also
        # submit a empty part without filename
        if file.filename == '':
            print 'No selected file'
            return redirect(request.url)
        if file and allowed_file(file.filename):
            print file.filename
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return filename
        return redirect(request.url)
    if request.method == 'OPTIONS':
        data = 'You can post'
        response = make_response(json.dumps(data), 200)
        response.headers['Content-type'] = '*'
        response.headers['Access-Control-Allow-Origin'] = '*'
        response.headers['Access-Control-Allow-Methods'] = '*'
        response.headers['Access-Control-Allow-Headers'] = 'content-type'
        print('Options')
        return response


@app.route("/api/photo/<filename>", methods=['GET'])
def getPhoto(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


if __name__ == '__main__':
    app.run(debug=True)
