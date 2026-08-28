const audio = document.getElementById("audio");
const musicFile = document.getElementById("musicFile");

const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");
const prevButton = document.getElementById("prev");

const songTitle = document.getElementById("songTitle");
const progressBar = document.getElementById("progressBar");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

const volume = document.getElementById("volume");

let songs = [];
let currentSong = 0;

// Select music
musicFile.addEventListener("change", function () {
    songs = Array.from(this.files);

    if (songs.length > 0) {
        currentSong = 0;
        loadSong(currentSong);
    }
});

// Load song
function loadSong(index) {
    const song = songs[index];

    audio.src = URL.createObjectURL(song);
    songTitle.textContent = song.name;

    audio.load();
}

// Play / pause
playButton.addEventListener("click", function () {

    if (!audio.src) {
        return;
    }

    if (audio.paused) {
        audio.play();
        playButton.textContent = "⏸";
    } else {
        audio.pause();
        playButton.textContent = "▶";
    }

});

// Next song
nextButton.addEventListener("click", function () {

    if (songs.length === 0) return;

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    audio.play();
    playButton.textContent = "⏸";

});

// Previous song
prevButton.addEventListener("click", function () {

    if (songs.length === 0) return;

    currentSong--;

    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    audio.play();
    playButton.textContent = "⏸";

});

// Automatically play next song
audio.addEventListener("ended", function () {

    currentSong++;

    if (currentSong >= songs.length) {
        currentSong = 0;
    }

    loadSong(currentSong);
    audio.play();

});

// Progress bar
audio.addEventListener("timeupdate", function () {

    if (audio.duration) {
        progressBar.value =
            (audio.currentTime / audio.duration) * 100;
    }

    currentTime.textContent =
        formatTime(audio.currentTime);

    duration.textContent =
        formatTime(audio.duration);

});

// Seek through song
progressBar.addEventListener("input", function () {

    if (audio.duration) {
        audio.currentTime =
            (progressBar.value / 100) * audio.duration;
    }

});

// Volume
volume.addEventListener("input", function () {
    audio.volume = volume.value;
});

// Time format
function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return minutes + ":" +
        (secs < 10 ? "0" : "") + secs;
}