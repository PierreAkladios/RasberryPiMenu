let track_index = 0;
let isPlaying = false;
let play_button = document.querySelector(".Play");
let pause_button = document.querySelector(".Pause");
let next_button = document.querySelector(".Next");
let previous_button = document.querySelector(".Previous")


//Element audio pour le player
let curr_track = document.createElement("audio");

let liste_lec = [
    {
        path: "musicTest/waltz.mp3"
    },
    {
        path:"musicTest/Eiffel 65 - Blue (Da Ba Dee) [Gabry Ponte Ice Pop Mix] (Original Video with subtitles).mp3"
    },
];

function loadTrack(track_index) {
    //Load new song
    curr_track.src = liste_lec[track_index].path;
    curr_track.load();
    curr_track.addEventListener("ended", Next);
}

function Play() {
    curr_track.play();
    isPlaying = true;
}

function Pause() {
    curr_track.pause();
    isPlaying = false;
}

function Next() {
    if(track_index < liste_lec.length -1)
        track_index += 1;
    else track_index = 0;
    loadTrack(track_index);
    Play();
}

function Previous() {
    if (track_index > 0)
        track_index -= 1;
    else track_index = liste_lec.length;

    loadTrack(track_index);
    Play();
}

loadTrack(track_index);

window.addEventListener("keydown", checkKey, false);

function checkKey(key) {
    if (key.keyCode == "66") {
        window.location.href = "../Menu/Menu.html"
    }

    else if (key.keyCode == "80"){
        // 80 = P
        Play()
    
    }

    else if (key.keyCode == "83") {
        // 83 = S
        Pause()
    }

    else if(key.keyCode == "78") {
        // 78 = N
        Next()
    }

    else if (key.keyCode == "76") {
        // 76 = L
        Previous()
    }
    
}
