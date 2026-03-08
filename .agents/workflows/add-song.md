---
description: Add a new song from Spotify to the Now Playing playlist
---
# Add Song Workflow

This workflow automates the process of adding a new track to the `playlist.json` file. 
When the user triggers this workflow and provides a Spotify track link, you should execute the following steps:

1. **Extract Metadata:** Use a python script to fetch the Spotify URL using `urllib.request` and parse the raw HTML. 
   - Note: Spotify's public HTML structure can be complex. You can usually extract the `<title>` tag for the artist and track name (format: "Track Name - song and lyrics by Artist | Spotify").
   - Extract the `title` and `artist`.
   - **New Requirement:** Try to extract the `album` from the meta tags (e.g., `<meta property="og:description" content="... on the album...">` or by prompting the user if web scraping fails to find an album). 
   - Store the provided Spotify `url` directly.

2. **Update JSON:** Use a python script to read `playlist.json`, prepare the new track object, and prepend it to the `tracks` array so it appears at the top (index 0).
   - The required structure is: `{ "artist": "Extracted Artist", "title": "Extracted Title", "album": "Album Name", "url": "https://open.spotify.com/..." }`

3. **Confirm:** Notify the user that the song has been added successfully and tell them to check the local server at `http://localhost:8080/now-playing.html`.

**Tip for Step 1 (Python snippet):**
```python
import urllib.request
import re

url = "SPOTIFY_URL_HERE"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    title_match = re.search(r'<title>(.*?)</title>', html)
    
    # Try to grab the Album from the og:description tag which often mentions it
    og_msg = re.search(r'<meta property=\"og:description\" content=\"(.*?)\"', html)
    album = ""
    if og_msg:
        og_content = og_msg.group(1)
        # Expected format: Artist · Album · Song · Year
        # We want the second item.
        parts = og_content.split(' · ')
        if len(parts) > 1:
            album = parts[1].strip()
    
    if title_match:
        full_title = title_match.group(1)
        # Parse "Track - song and lyrics by Artist | Spotify"
        parts = full_title.split(' - song and lyrics by ')
        if len(parts) == 2:
            track = parts[0].strip()
            artist = parts[1].split(' | ')[0].strip()
            print(f"TRACK={track}\nARTIST={artist}\nALBUM={album}")
except Exception as e:
    print(f"Error: {e}")
```
