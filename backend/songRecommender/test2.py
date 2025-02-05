import os

# ✅ Set up the base directory dynamically
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Get the directory where this script is located

# ✅ Define Paths for `new.html` and `new.txt`
new_html_path = os.path.join(BASE_DIR, "..", "emotionDetection", "new.html")
new_txt_path = os.path.join(BASE_DIR, "..", "emotionDetection", "new.txt")
video_path = os.path.join(BASE_DIR, "..", "..", "frontend", "public", "videos", "background.mp4")

# ✅ Read Playlist ID from `new.txt`
with open(new_txt_path, "r") as f2:
    playlist_id = f2.read().strip()

# ✅ Write Updated `new.html`
with open(new_html_path, "w") as fp:
    fp.write(f'''<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Spotify Playlist</title>
    <style>
      /* General Styles */
      body {{
        font-family: Arial, sans-serif;
        margin: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        overflow: hidden;
        background: black;
      }}

      /* Background Video */
      .video-background {{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index: -1;
      }}

      /* Container to center the iframe */
      .iframe-container {{
        position: relative;
        width: 75%;
        height: 75%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(255, 255, 255, 0.3);
        backdrop-filter: blur(10px);
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.6);
      }}

      iframe {{
        width: 100%;
        height: 100%;
        border-radius: 12px;
        border: none;
      }}
    </style>
  </head>
  <body>
    <!-- Background Video -->
    <video class="video-background" autoplay loop muted>
      <source src="{video_path}" type="video/mp4">
      Your browser does not support the video tag.
    </video>

    <div class="iframe-container">
      <iframe src="https://open.spotify.com/embed/playlist/{playlist_id}?utm_source=generator" 
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture" loading="lazy">
      </iframe>
    </div>
  </body>
</html>''')

# ✅ Open `new.html` (Works on Windows & Linux)
os.system(f'start {new_html_path}' if os.name == 'nt' else f'xdg-open {new_html_path}')
