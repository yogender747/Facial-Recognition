from flask import Flask, render_template, request, jsonify, session, redirect, url_for
import cv2
import numpy as np
import os
from keras.models import load_model
from keras.preprocessing.image import img_to_array
import pandas as pd
import random
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from datetime import datetime
from dotenv import load_dotenv  # Load environment variables from `.env`
import logging

# ✅ Disable GPU for TensorFlow (Prevents CUDA errors)
os.environ["CUDA_VISIBLE_DEVICES"] = "-1"

# ✅ Load environment variables
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "supersecretkey")  # Secure secret key

BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Get current directory

# ✅ Setup Logging
logging.basicConfig(level=logging.INFO)

# ✅ Load Face Detector & Model
face_cascade = cv2.CascadeClassifier(os.path.join(BASE_DIR, "haarcascade_frontalface_default.xml"))

# ✅ Load Emotion Detection Model
MODEL_PATH = os.path.join(BASE_DIR, "model.h5")
if not os.path.exists(MODEL_PATH):
    raise FileNotFoundError("❌ ERROR: model.h5 is missing!")
classifier = load_model(MODEL_PATH)

# ✅ Emotion Labels
emotion_labels = ['Angry', 'Disgust', 'Fear', 'Happy', 'Neutral', 'Sad', 'Surprise']

# ✅ Load Music Dataset
data_moods_path = os.path.join(BASE_DIR, "..", "songRecommender", "data", "data_moods.csv")
if not os.path.exists(data_moods_path):
    raise FileNotFoundError("❌ ERROR: data_moods.csv is missing!")

df1 = pd.read_csv(data_moods_path)

# ✅ Spotify Authentication (Token Caching)
SPOTIFY_CACHE_PATH = os.path.join(BASE_DIR, ".spotify_cache")

sp_oauth = SpotifyOAuth(
    client_id=os.getenv("SPOTIFY_CLIENT_ID"),
    client_secret=os.getenv("SPOTIFY_CLIENT_SECRET"),
    redirect_uri=os.getenv("SPOTIFY_REDIRECT_URI", "https://facial-recognition-production-9e31.up.railway.app/callback"),
    scope="user-read-playback-state user-library-read playlist-read-private playlist-read-collaborative playlist-modify-public",
    cache_path=SPOTIFY_CACHE_PATH
)

def get_spotify_client():
    """ Retrieves a valid Spotify client by checking and refreshing token. """
    token_info = sp_oauth.get_cached_token()

    if not token_info:
        auth_url = sp_oauth.get_authorize_url()
        print(f"🚨 No Spotify token found. Authenticate here: {auth_url}")
        return None  # Prevents crashing if no token is available

    if sp_oauth.is_token_expired(token_info):
        print("🔄 Spotify token expired. Refreshing token...")
        token_info = sp_oauth.refresh_access_token(token_info["refresh_token"])
        with open(SPOTIFY_CACHE_PATH, "w") as cache_file:
            cache_file.write(str(token_info))  # ✅ Save refreshed token

    return spotipy.Spotify(auth=token_info["access_token"])

@app.route('/')
def index():
    return render_template('camera.html')

@app.route('/playlist.html')
def playlist():
    return render_template('playlist.html')

# ✅ Spotify Authentication Callback
@app.route("/callback")
def spotify_callback():
    code = request.args.get("code")
    if not code:
        return jsonify({"error": "Authorization failed"}), 400

    token_info = sp_oauth.get_access_token(code)
    session["token_info"] = token_info
    print("✅ Spotify Authentication Successful!")
    return redirect("/")

# ✅ Face Detection & Emotion Prediction
@app.route('/detect', methods=['POST'])
def detect():
    file = request.files.get('image')

    if file is None:
        return jsonify({"error": "No image received"}), 400

    npimg = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    if img is None:
        return jsonify({"error": "Error decoding image"}), 400

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    if len(faces) == 0:
        return jsonify({"error": "No face detected"}), 400

    emotions_detected = []
    for (x, y, w, h) in faces:
        roi_gray = gray[y:y + h, x:x + w]
        roi_gray = cv2.resize(roi_gray, (48, 48))

        roi = roi_gray.astype("float") / 255.0
        roi = img_to_array(roi)
        roi = np.expand_dims(roi, axis=0)

        prediction = classifier.predict(roi)[0]
        label = emotion_labels[np.argmax(prediction)]
        emotions_detected.append(label)

    detected_emotion = max(set(emotions_detected), key=emotions_detected.count)

    # ✅ Map Emotions to Playlists
    mood_mapping = {
        "Angry": "Energetic",
        "Surprise": "Energetic",
        "Fear": "Calm",
        "Neutral": "Calm",
        "Happy": "Happy",
        "Sad": "Sad"
    }
    mood = mood_mapping.get(detected_emotion, "Calm")

    # ✅ Fetch Songs Based on Mood
    df2 = df1[df1['mood'] == mood]
    if df2.empty:
        return jsonify({"error": "No songs found for this mood"}), 400

    df2 = df2.astype({'id': 'string'})
    list_of_songs = ["spotify:track:" + str(row[1]['id']) for row in df2.iterrows()]
    list_of_songs = random.sample(list_of_songs, min(len(list_of_songs), 15))

    # ✅ Create Playlist on Spotify
    sp = get_spotify_client()
    if sp is None:
        return jsonify({"error": "Spotify authentication required"}), 400

    try:
        user_id = sp.me()['id']
        new_playlist = sp.user_playlist_create(user=user_id, name=f"{mood} Songs", public=True)
        playlist_id = new_playlist['id']
        sp.user_playlist_add_tracks(user=user_id, playlist_id=playlist_id, tracks=list_of_songs)

        print(f"✅ Created Playlist: {mood} Songs - {playlist_id}")

        return jsonify({"emotion": detected_emotion, "redirect": f"/playlist.html?playlist={playlist_id}"})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv("PORT", 5000)), debug=True)
