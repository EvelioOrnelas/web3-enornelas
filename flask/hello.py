from flask import request, render_template
from flask_pymongo import PyMongo
import flask, jsonify, json, requests

app = flask.Flask(__name__)

app.config["MONGO_URI"] = "mongodb://localhost:27017/reactdb"
mongo = PyMongo(app)
db = mongo.db

db_operations = db.users




if __name__ == "__main__":
    app.run()