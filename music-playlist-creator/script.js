
document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("playlist-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalCreator = document.getElementById("modal-creator");
    const modalDetails = document.getElementById("modal-details");
    const modalArt = document.getElementById("modal-image");
    const closeBtn = document.querySelector(".close-button");
    const playlistCardContainer = document.querySelector(".playlist-card-container");
    

    // Close modal on X click
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Close modal when clicking outside modal content
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

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
        const tile = createPlaylistTile(pl);
        playlistCardContainer.appendChild(tile);
    };

    function createPlaylistTile(pl) {

        const card = document.createElement("div");
        card.className = "playlist-card";
        card.innerHTML = `
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
            
            pl.song.forEach(song => {
                const songContainer = document.createElement("div");
                songContainer.classList.add("modal-song");

                const songImage = document.createElement("img");
                songImage.src = song.song_art;
                songImage.alt = song.song_name;
                songImage.classList.add("song-image");

                const songInfo = document.createElement("p");
                songInfo.textContent = `${song.song_name} - ${song.song_artist} (${song.song_duration})`;

                modalDetails.appendChild(songContainer);
                songContainer.appendChild(songImage);
                modalDetails.appendChild(songInfo);
            });

            modal.style.display = "block";
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