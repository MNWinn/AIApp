import os
from flask import Flask, request, jsonify
import weaviate
from weaviate import AuthApiKey
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


auth = weaviate.auth.AuthApiKey(api_key="kDT5EeVY1YIDEKgq0tFTNkxEtAuN0Q7wOog5")  # Replace with your Weaviate API key if necessary

client = weaviate.Client(
    url="https://chatbot-2pp5ple3.weaviate.network",
    auth_client_secret=auth,
)

# Store data endpoint
@app.route('/store', methods=['POST'])
def store_data():
    data = request.get_json()
    client.data_object.create(data, "Data")  # Replace "Data" with the name of your class in Weaviate schema
    return jsonify({"message": "Data stored successfully"})

# Search data endpoint
@app.route('/search', methods=['GET'])
def search_data():
    query = request.args.get('q')
    result = client.query.get("Data", search=query)  # Replace "Data" with the name of your class in Weaviate schema
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
