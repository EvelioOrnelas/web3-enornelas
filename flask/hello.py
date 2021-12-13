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




if __name__ == "__main__":
    app.run()