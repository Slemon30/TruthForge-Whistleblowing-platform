from textblob import TextBlob

def analyze_urgency(text):
    try:
        # Perform sentiment analysis using TextBlob
        blob = TextBlob(text)
        sentiment_score = blob.sentiment.polarity  # Polarity score (-1 to 1)
        
        # Determine urgency based on sentiment score and keywords
        if sentiment_score < 0 or 'urgent' in text.lower():
            return text, 'urgent'
        else:
            return text, 'not urgent'
    except Exception as e:
        # Return error message if sentiment analysis fails
        return text, str(e)

# Example usage
if __name__ == "__main__":
    input_text = 'some serious issue'
    text, urgency = analyze_urgency(input_text)
    print("Input Text:", text)
    print("Urgency:", urgency)
