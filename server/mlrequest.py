from flask import Flask, jsonify, request
from flask_cors import CORS
from textblob import TextBlob

app = Flask(__name__)
CORS(app, origins=['http://localhost:3000', 'http://localhost:3001'])

@app.route('/test')
def index():
    return jsonify({'message': 'Hello, CORS is enabled for localhost:3000!'})

@app.route('/analyze-sentiment', methods=['POST'])
def classify_text():
    data = request.get_json()
    
    if 'newIssue' not in data:
        return jsonify({'error': 'Key "newIssue" not found in request data'}), 400

    text = data['newIssue']
    sentiment_score = TextBlob(text).sentiment.polarity * -1
    
    return jsonify({'sentiment_score': sentiment_score})

if __name__ == '__main__':
    app.run(host='localhost', port=5000)
