---
description: Add a new song from Spotify to the Now Playing playlist
---
# Add Song Workflow

This workflow automates the process of adding new tracks to the `playlist.json` file. 
When the user triggers this workflow and provides one or multiple Spotify track links or song names, you should execute the following steps:

1. **Get Metadata:** For each track or URL, use your web search or URL reading tools to determine the track's Title, Artist, and Album.
2. **Update Playlist:** Format the new track(s) as JSON objects and use your file editing tools (like `multi_replace_file_content` or `replace_file_content`) to insert them at the top of the `tracks` array in `playlist.json`. Set `addedAt` to the current time in ISO 8601 format with timezone (e.g. `2026-03-09T08:00:00+01:00`).
3. **Confirm:** Notify the user that the song(s) have been added successfully and let them know they can preview it locally at `http://localhost:8080/now-playing.html`.
