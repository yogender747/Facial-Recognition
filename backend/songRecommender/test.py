import os
import spotipy
from spotipy.oauth2 import SpotifyOAuth
import pandas as pd
import random

# ✅ Set up relative paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Get current directory of test.py

# ✅ Load Spotify API credentials securely
sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
    client_id=os.getenv("SPOTIFY_CLIENT_ID"),
    client_secret=os.getenv("SPOTIFY_CLIENT_SECRET"),
    redirect_uri=os.getenv("SPOTIFY_REDIRECT_URI", "http://localhost:8000"),
    scope="user-read-playback-state streaming ugc-image-upload playlist-modify-public"
))

# ✅ Load Music Dataset (Updated Path)
data_moods_path = os.path.join(BASE_DIR, "..", "songRecommender", "data", "data_moods.csv")
df = pd.read_csv(data_moods_path)

# ✅ Load Mood from `new.txt`
new_txt_path = os.path.join(BASE_DIR, "..", "emotionDetection", "new.txt")
with open(new_txt_path, "r") as fp:
    mood = fp.read().strip()  # Strip to remove accidental spaces/newlines

# ✅ Fetch Songs Based on Mood
df2 = df.loc[df['mood'] == mood]
df2 = df2.astype({'id': 'string'})

list_of_songs = ["spotify:track:" + str(row[1]['id']) for row in df2.iterrows()]
list_of_songs = random.sample(list_of_songs, min(len(list_of_songs), 15))  # Ensure valid range

print(len(list_of_songs))

# ✅ Create Playlist on Spotify
playlist_name = mood + " Songs"
playlist_description = mood + " Songs"
user_id = sp.me()['id']

new_playlist = sp.user_playlist_create(user=user_id, name=playlist_name, public=True, description=playlist_description)
playlist_id = new_playlist['id']
print(playlist_id)

# ✅ Add Songs to the Playlist
sp.user_playlist_add_tracks(user=user_id, playlist_id=playlist_id, tracks=list_of_songs)

print(f"✅ Created {mood} playlist: {playlist_id}")

# ✅ Save Playlist ID to `new.txt`
with open(new_txt_path, "w") as fp:
    fp.write(playlist_id)

# ✅ Run `test2.py` from the correct location
test2_script_path = os.path.join(BASE_DIR, "test2.py")  # Updated Path
os.system(f'python "{test2_script_path}"')
