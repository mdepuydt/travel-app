from flask import Flask, request, redirect, url_for, send_from_directory
from flask_cors import CORS, cross_origin
from sys import *
import os
import json
from werkzeug.utils import secure_filename

UPLOAD_FOLDER = '/home/pi/api/images'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

CORS(app, resources={r"/photo/*": {"origins": "*"}})


FOLDER = 'images/'


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/photo", methods=['POST'])
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


@app.route("/photo/<filename>", methods=['GET'])
def getPhoto(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)


if __name__ == '__main__':
    app.run(debug=True)
