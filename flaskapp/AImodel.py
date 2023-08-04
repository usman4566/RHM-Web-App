from flask import Flask, jsonify
from pymongo import MongoClient
import tensorflow as tf


# Load the AI model
model = tf.keras.models.load_model('my_model.h5')

# Connect to the MongoDB database
client = MongoClient('mongodb://localhost:27017/')
db = client['my_db']
collection = db['my_collection']

def predict():
    # Fetch data from the MongoDB collection
    data = collection.find_one()

    # Prepare the input for the AI model
    acc_x = data['accx']
    acc_y = data['accy']
    acc_z = data['accz']
    input_data = [[acc_x, acc_y, acc_z]]

    # Run the input through the AI model
    prediction = model.predict(input_data)

    # Return the prediction as a JSON response
    response = {'prediction': prediction[0][0]}
    return jsonify(response)
