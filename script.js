console.log("Welcome to Spotify");
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    { songName: "Pal Pal dil ke pas", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Mere samne wali khidki mein", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "O mere dil ke chain", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Bheegi bheegi ratoon mein", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Zindagi ek safar he", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Bade aache lagte he", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "Ek ajnabbi hasena se", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "Aap ki akhon me kuch", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "Meri bheegi bheegi si", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" },
    { songName: "Tere bina zindagi se koi", filePath: "songs/10.mp3", coverPath: "covers/10.jpg" },
]

songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


function aboutPage() {
    const songContainer = document.getElementById('songContainer');
    const buttonContainer = document.getElementById('buttonContainer');
    const about = document.getElementById('about');

    songContainer.style.display='none';
    buttonContainer.style.display='none';
    about.style.display = 'block';
}



function homePage() {
    const songContainer = document.getElementById('songContainer');
    const buttonContainer = document.getElementById('buttonContainer');
    const about = document.getElementById('about');

    songContainer.style.display='block';
    buttonContainer.style.display='block';
    about.style.display = 'none';
    window.location.reload();
}

const audioInput = document.getElementById('audioInput');

audioInput.addEventListener('change', function (event) {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
        const objectURL = URL.createObjectURL(selectedFile);
        audioElement.src = objectURL;
        masterSongName.innerText = selectedFile.name;
        audioElement.currentTime = 0;
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        }
    }
});


function playNext() {
    if (songIndex >= 9) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}

function playPrevious() {
    if (songIndex <= 0) {
        songIndex = 0
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
}

function play_pause() {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
}

document.addEventListener('keydown', function (event) {
    if (event.keyCode === 32) {
        event.preventDefault();
        play_pause();
    } else if (event.keyCode === 37) {
        playPrevious()
    } else if (event.keyCode === 39) {
        playNext();
    }

});


masterPlay.addEventListener('click', () => {
    play_pause();
})

audioElement.addEventListener('timeupdate', () => {

    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', () => {
    playNext();
})

document.getElementById('previous').addEventListener('click', () => {
    playPrevious();
})