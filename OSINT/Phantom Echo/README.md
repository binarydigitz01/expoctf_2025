
# Phantom Echo: An OSINT CTF Challenge

Welcome to **Phantom Echo**, an immersive OSINT challenge designed for cyber sleuths.  
Track down usernames, decode messages, and uncover secrets hidden in plain sight.

## Stage Overview

1. **Discord Entry**
   - In a Discord group, a pinned message reads:
     > "I told them not to trust `E3v3rgreen1999`. The files are still safe—unless she’s already found the mirror server. #MirrorMaze"

2. **Username Recon**
   - Search for `E3v3rgreen1999` across platforms (GitHub, Reddit).
   - On Reddit or GitHub, find an image post containing a **handwritten note** (see `assets/stage2.png`).

3. **Image Analysis**
   - Reverse image search reveals a **Medium blog**: *Reflections in the Maze*.
   - Running steganography tools on the image reveals:
     ```
     Search the codebase. Look in the mirror/dir. The truth hides in plain text.
     ```
   - Image metadata:
     - **Location**: 34.0522° N, 118.2437° W (Los Angeles)
     - **Author**: agent-mirror@protonmail.com
     - **Watermark**: github.com/agent-mirror

4. **GitHub Discovery**
   - Visit GitHub profile: [https://github.com/agent-mirror](https://github.com/agent-mirror)
   - Repo: `phantom-echo`
   - Navigate to `/mirror/index.html`

5. **Final Challenge**
   - The HTML contains a Base64 encoded JSON:
     ```json
     {
       "finalFile": "https://agent-mirror.github.io/phantom-echo/assets/agent.zip",
       "passphrase": "silentwave"
     }
     ```
   - Download and unlock the ZIP using the password `silentwave`.
   - Inside: `final_message.txt`

## Your Mission

Find every clue, decode every layer, and report back to `#phantom-echo` with your findings.

Good luck, sentinel. 🛰️
