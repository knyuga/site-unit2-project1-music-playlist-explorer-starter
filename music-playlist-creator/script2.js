document.addEventListener("DOMContentLoaded", () => {
    const featurePlaylistContainer = document.querySelector(".large-feature");
    const featureSongContainer = document.querySelector(".featured-playlist-songs");

    let songList = [];

    fetch("data/data.json")
        .then((response) => {
        if (!response.ok) {
            throw new Error("Network error: " + response.status);
        }
        return response.json();
        })
        .then((data) => {
            const playlistIndex = chooseIndex(data);
            createFeatures(data[playlistIndex]);
        })
        .catch((err) => {
        console.error("Failed to load featured playlist:", err);
        });

        // 2) Create each Feature Page
        function createFeatures(featurePL){

            // Playlist Info
            featurePlaylistContainer.innerHTML = "";
            featureSongContainer.innerHTML ="";

            const card1 = document.createElement("div");
            featurePlaylistContainer.innerHTML = `
                <img src="${featurePL.playlist_art}" alt="${featurePL.playlist_name}">
                <h3>${featurePL.playlist_name}</h3>
            `;

            // Song Info
            featurePL.song.forEach(song => {
                const songContainer = document.createElement("div"); // this holds all the songs and i put this into my songList array
                songContainer.classList.add("pl-song");

                const songImage = document.createElement("img");
                songImage.src = song.song_art;
                songImage.alt = song.song_name;
                songImage.classList.add("pl-song-image");

                const songInfo = document.createElement("div");
                songInfo.classList.add("pl-song-info");

                const songTitle = document.createElement("div");
                songTitle.classList.add("pl-song-title");
                songTitle.textContent = song.song_name;

                const songArtist = document.createElement("div");
                songArtist.classList.add("pl-song-artist");
                songArtist.textContent = song.song_artist;

                songInfo.appendChild(songTitle);
                songInfo.appendChild(songArtist);

                const songDuration = document.createElement("div");
                songDuration.classList.add("pl-song-duration");
                songDuration.textContent = song.song_duration;

                songContainer.appendChild(songImage);
                songContainer.appendChild(songInfo);
                songContainer.appendChild(songDuration);

                // songList.push(featureSongContainer); // adds the toy to the toy box
                featureSongContainer.appendChild(songContainer); // puts the toy on the shelf so people can see it

            }); 
        }

        // 3) Choosing the Featured Playlist
        function chooseIndex (data){
            let length = data.length;
            return Math.floor(Math.random() * length);
        }

});
