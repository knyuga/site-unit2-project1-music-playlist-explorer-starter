document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("playlist-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalCreator = document.getElementById("modal-creator");
    const modalDetails = document.getElementById("modal-details"); // holds the song list
    const modalShuffle = document.getElementById("modal-shuffle");
    const modalArt = document.getElementById("modal-image"); 
    const playlistCardContainer = document.querySelector(".playlist-card-container");
    
    let songList = []; // reset songList for each new playlist

    // Close modal when clicking outside modal content
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    if (modalShuffle){
        modalShuffle.addEventListener("click", (e) => {
            if (songList.length > 0) {
                songList = randomizeSongOrder(songList);
            }
        });
    }

    function randomizeSongOrder(songs) {
        modalDetails.innerHTML = "";
        const shuffled = [];
        let saveSongs = songs.slice(); // makes an actual copy, before it was a reference
        while(saveSongs.length > 0) {
            const randomIndex = Math.floor(Math.random() * saveSongs.length);
            modalDetails.appendChild(saveSongs[randomIndex]);
            shuffled.push(saveSongs[randomIndex]);
            saveSongs.splice(randomIndex, 1); // pops at the index specfied and removes it from the array
        }

        return shuffled;
    }

    // 1) Load playlists via fetch().then() chaining
    fetch("data/data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network error: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
        data.forEach(addPlaylistTile);
    })
    .catch((err) => {
      console.error("Failed to load playlists:", err);
    });

    // 2) Create each playlist card
    const addPlaylistTile = (pl) => {
        console.log("trying to add playlist tile")
        const tile = createPlaylistTile(pl);
        playlistCardContainer.appendChild(tile);
    };

    function createPlaylistTile(pl) {

        const card = document.createElement("div");
        card.className = "playlist-card";
        card.innerHTML = `
            <button id="delete-button" class="delete-button">🗑️</button>
            <img src="${pl.playlist_art}" alt="${pl.playlist_name}">
            <h3>${pl.playlist_name}</h3>
            <p>by: ${pl.playlist_author}</p>
            <button class="likebutton">&#x2665;</button>
            <span class="like-count">${pl.likes}</span>
            <ul class="song"></ul>
        `;

        // Example: Add click event to all cards
        card.addEventListener("click", () => {
            modalTitle.textContent = pl.playlist_name;
            modalCreator.textContent = `Creator: ${pl.playlist_author}`;
            modalDetails.innerHTML = "";
            modalArt.src = pl.playlist_art;
            modalArt.alt = `${pl.playlist_name}'s Image`;
            songList = [];

            pl.song.forEach(song => {
                const songContainer = document.createElement("div"); // this holds all the songs and i put this into my songList array
                songContainer.classList.add("modal-song");

                const songImage = document.createElement("img");
                songImage.src = song.song_art;
                songImage.alt = song.song_name;
                songImage.classList.add("song-image");

                const songInfo = document.createElement("div");
                songInfo.classList.add("song-info");

                const songTitle = document.createElement("div");
                songTitle.classList.add("song-title");
                songTitle.textContent = song.song_name;

                const songArtist = document.createElement("div");
                songArtist.classList.add("song-artist");
                songArtist.textContent = song.song_artist;

                songInfo.appendChild(songTitle);
                songInfo.appendChild(songArtist);

                const songDuration = document.createElement("div");
                songDuration.classList.add("song-duration");
                songDuration.textContent = song.song_duration;

                songContainer.appendChild(songImage);
                songContainer.appendChild(songInfo);
                songContainer.appendChild(songDuration);

                songList.push(songContainer); // adds the toy to the toy box
                modalDetails.appendChild(songContainer); // puts the toy on the shelf so people can see it
            });
            modal.style.display = "block";
        });

        const deleting = card.querySelector('.delete-button');
        deleting.addEventListener('click', (e) => {
            e.stopPropagation();
            card.remove();
        });

        const heart = card.querySelector('.likebutton');
        const count = card.querySelector('.like-count');
        heart.addEventListener('click', (e) => {
            e.stopPropagation(); 

            let n = parseInt(count.textContent, 10);
            if (heart.classList.contains('liked')) {
                heart.classList.remove('liked');
                count.textContent = n - 1;
            } else {
                heart.classList.add('liked');
                count.textContent = n + 1;
            }
        });

        return card;
      
    }

});