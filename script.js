const songs = [
    { title: "Takut", artist: "Idgitaf", src: "Takut.mp3", cover: "takut.png" },
    { title: "Nina", artist: "Feast", src: "Nina.mp3", cover: "nina.png" },
     { title: "Mangu", artist: "Fourtwnty, Charita Utami", src: "Mangu.mp3", cover: "Mangu.jpg" },
    { title: "sedia aku sebelum hujan", artist: "idgitaf", src: "sedia aku sebelum hujan.mp3", cover: "sedia aku sebelum hujan.jpg" },
    { title: "Lihat Kebunku(Taman Bunga)", artist: "aku jeje", src: "Lihat Kebunku (Taman Bunga).mp3", cover: "Lihat kebunku(taman bunga).jpeg" },
    { title: "everything u are", artist: "Hindia", src: "everything u are.mp3", cover: "everything u are.jpg" },
    { title: "cincin", artist: "Hindia", src: "cincin.mp3", cover: "cincin.jpg" },
    { title: "SENCY", artist: "dia, Tenxi", src: "SENCY.mp3", cover: "SENCY.jpg" },
    { title: "sorai", artist: "Nadin Amizah", src: "sorai.mp3", cover: "sorai.jpg" },
    { title: "TABOLA BALE", artist: "Silet Open Up, Jacson Seran, Juan Reza, Diva Aurel", src: "TABOLA BALE.mp3", cover: "TABOLA BALE.jpg" },
    { title: "Tarot", artist: ".Feast", src: "Tarot.mp3", cover: "Tarot.jpg" },
    { title: "Malam Tak Berjudul", artist: "Monica Christiana", src: "Malam Tak Berjudul.mp3", cover: "Malam Tak Berjudul.jpg" },
    { title: "betty", artist: "Hindia, white chorus", src: "betty.mp3", cover: "betty.jpg" },
    { title: "kids", artist: "Hindia", src: "kids.mp3", cover: "kids.jpg" },
    { title: "Penyangkalan", artist: "For Revenge", src: "Penyangkalan.mp3", cover: "Penyangkalan.jpg" },
    { title: "bergema sampai selamanya", artist: "Nadhif Basalamah", src: "bergema sampai selamanya.mp3", cover: "bergema sampai selamanya.jpg" },
    { title: "Calon Mantu Idaman (feat. Ncum)", artist: "Rombongan Bodonk Koplo", src: "Calon Mantu Idaman (feat. Ncum).mp3", cover: "Calon Mantu Idaman (feat. Ncum).jpg" },
    { title: "Di Ujung Jalan", artist: "SAMSONS", src: "Di Ujung jalan.mp3", cover: "Di Ujung jalan.jpg" },
    { title: "Tuhan Sebut Sia-Sia", artist: "Amigdala", src: "Tuhan Sebut Sia-Sia.mp3", cover: "Tuhan Sebut Sia-Sia.jpg" },
    { title: "Kembali Pulang", artist: "Suara Kayu", src: "kembali pulang.mp3", cover: "kembali pulang.jpg" }
];

const playlist = document.getElementById("playlist");
const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const progress = document.getElementById("progress");
const current = document.getElementById("current");
const duration = document.getElementById("duration");
const playBtn = document.querySelector(".play");
const volume = document.getElementById("volume");

let index = 0;
let playing = false;
let repeat = false;

/* RENDER PLAYLIST */
songs.forEach((song, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img src="${song.cover}">
        <strong>${song.title}</strong><br>
        <span>${song.artist}</span>
    `;
    card.onclick = () => playSong(i);
    playlist.appendChild(card);
});

function playSong(i) {
    index = i;
    audio.src = songs[i].src;
    title.textContent = songs[i].title;
    artist.textContent = songs[i].artist;
    cover.src = songs[i].cover;
    audio.play();
    playing = true;
    playBtn.textContent = "⏸";
}

function togglePlay() {
    if (!audio.src) return;
    if (playing) {
        audio.pause();
        playBtn.textContent = "▶";
    } else {
        audio.play();
        playBtn.textContent = "⏸";
    }
    playing = !playing;
}

function nextSong() {
    index = (index + 1) % songs.length;
    playSong(index);
}

function prevSong() {
    index = (index - 1 + songs.length) % songs.length;
    playSong(index);
}

function shuffleSong() {
    index = Math.floor(Math.random() * songs.length);
    playSong(index);
}

function repeatSong() {
    repeat = !repeat;
    audio.loop = repeat;
    alert(repeat ? "Repeat ON" : "Repeat OFF");
}

/* PROGRESS */
audio.addEventListener("timeupdate", () => {
    progress.value = (audio.currentTime / audio.duration) * 100;
    current.textContent = format(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
    duration.textContent = format(audio.duration);
});

progress.addEventListener("input", () => {
    audio.currentTime = (progress.value / 100) * audio.duration;
});

volume.addEventListener("input", () => {
    audio.volume = volume.value;
});

function format(t) {
    const m = Math.floor(t / 60);
    const s = Math.floor(t % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

function render(list) {
    playlist.innerHTML = "";
    list.forEach((song, index) => {
        const liked = favorites.includes(song.title);
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <span class="like" onclick="toggleLike('${song.title}')">${liked ? "❤️" : "🤍"}</span>
            <img src="${song.cover}">
            <strong>${song.title}</strong><br>
            <span>${song.artist}</span>
        `;
        card.onclick = () => playSong(index);
        playlist.appendChild(card);
    });
}