from flask import request, render_template
from flask_pymongo import PyMongo
import flask, jsonify, json, requests

app = flask.Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/reactdb"
mongo = PyMongo(app)
db = mongo.db

db_operations = db.users

#All the routings in our app will be mentioned here.
@app.route('/')
def test():
    return render_template('index.html')

@app.route('/getUsers')
def get():
    documents = db_operations.find()
    response = []
    for document in documents:
        document['_id'] = str(document['_id'])
        response.append(document)
    return json.dumps(response)

@app.route("/addUser", methods=['POST'])
def insert_document():
    username = request.form['username']
    password = request.form['password']
    result = db_operations.insert_one({'username': username, 'password': password})
    return ('Successfully added user to Database!')

@app.route('/changeUser', methods=['POST'])
def update():
    currentusername = request.form['currentusername']
    newusername = request.form['newusername']
    result = db_operations.find_one_and_update({'username': currentusername}, {'$set': {'username': newusername}})
    if not result:
        return 'Could not find user!'
    else:
        return 'Successfully updated user.'

@app.route('/deleteUser', methods=['POST'])
def delete():
    username = request.form['username']
    # filt = {'Name' : 'xyz'}
    result = db_operations.find_one_and_delete({'username': username})
    if not result:
        return 'Could not find or delete user!'
    else:
        return 'Successfully deleted user.'


if __name__ == "__main__":
    app.run()