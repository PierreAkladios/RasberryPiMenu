document.getElementById("shorts").innerHTML = "SHORTCUTS : 'B' = BACK ; 'P' = PLAY ; 'N' = NEXT ; 'L' = PREVIOUS"
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
        path: "musicTest/1 Arabic Umm Kulthum.mp3"
    },
    {
        path: "musicTest/1 Umm Kulthum.mp3"
    },
    {
        path: "musicTest/10 Umm Kulthum.mp3"
    },
    {
        path: "musicTest/11 Umm Kulthum.mp3"
    },
    {
        path: "musicTest/12 Umm Kulthum.mp3"
    },
    {
        path: "musicTest/13 Umm Kulthum.mp3"
    },
    {
        path: "musicTest/14 Umm Kulthum.mp3"
    },
    {
        path: "musicTest/15 Umm Kulthum.mp3"
    },
    {
        path: "musicTest/16 Umm Kulthum.mp3"
    },
    {
        path: "musicTest/17 Umm Kulthum.mp3"
    },
    {
        path: "musicTest/18 Umm Kulthum.mp3"
    },
    {
        path: "musicTest/19 Umm Kulthum.mp3"
    },
    {
        path: "musicTest/2 Umm Kulthum.mp3"
    },
    {
        path: "musicTest/20 Umm Kulthum.mp3"
    },
    {
        path: "musicTest/21 Umm Kulthum.mp3"
    },
    {
        path: "musicTest/22 Umm Kulthum.mp3"
    },
    {
        path: "musicTest/4 Umm Kulthum.mp3"
    },
    {
        path: "musicTest/3 Umm Kulthum.mp3"
    },
    {
        path: "musicTest/5 Umm Kulthum.mp3"
    },
    {
        path: "musicTest/6 Umm Kulthum.mp3"
    },
    {
        path: "musicTest/7 Umm Kulthum.mp3"
    },
    {
        path: "musicTest/8 Umm Kulthum.mp3"
    },
    {
        path: "musicTest/9 Umm Kulthum.mp3"
    },
    {
        path: "musicTest/Aadeet hayati.mp3"
    },
    {
        path: "musicTest/Aadeet hayati.mp3"
    },
    {
        path: "musicTest/Aghar Mn Nasmet.mp3"
    },
    {
        path: "musicTest/akhadt.mp3"
    },
    {
        path: "musicTest/Al-azoul Faye We Raye.mp3"
    },
    {
        path: "musicTest/Ala aini elhagr.mp3"
    },
    {
        path: "musicTest/Ala Balad El Mahbob.mp3"
    },
    {
        path: "musicTest/Alf Lila W Lila.mp3"
    },
    {
        path: "musicTest/Amal Hayati.mp3"
    },
    {
        path: "musicTest/Amal Hayaty.mp3"
    },
    {
        path: "musicTest/Amal Maher.mp3"
    },
    {
        path: "musicTest/Amana Ayouh Al Quamar.mp3"
    },
    {
        path: "musicTest/An El Oushaq.mp3"
    },
    {
        path: "musicTest/Arab Idol.mp3"
    },
    {
        path: "musicTest/Arouh Lmein.mp3"
    },
    {
        path: "musicTest/Asoon Karamaty.mp3"
    },
    {
        path: "musicTest/Ayoha El Raaeh.mp3"
    },
    {
        path: "musicTest/ayyoha elraeh.mp3"
    },
    {
        path: "musicTest/Bi ridhak ya khaliki.mp3"
    },
    {
        path: "musicTest/Bi Ridhak Ya.mp3"
    },
    {
        path: "musicTest/Daleely Ehtar.mp3"
    },
    {
        path: "musicTest/Dalila.mp3"
    },
    {
        path: "musicTest/Efrah Ya Qalby.mp3"
    },
    {
        path: "musicTest/Ein el ochaq saalouni.mp3"
    },
    {
        path: "musicTest/El Chekke Yehyi.mp3"
    },
    {
        path: "musicTest/Enta Omry.mp3"
    },
    {
        path: "musicTest/Fakarouny.mp3"
    },
    {
        path: "musicTest/TheVoice.mp3"
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
    document.getElementById("shorts").innerHTML = "SHORTCUTS : 'B' = BACK ; 'P' = PAUSE ; 'N' = NEXT ; 'L' = PREVIOUS";
}

function Pause() {
    curr_track.pause();
    isPlaying = false;
    document.getElementById("shorts").innerHTML = "SHORTCUTS : 'B' = BACK ; 'P' = PLAY ; 'N' = NEXT ; 'L' = PREVIOUS";
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
        //retour a Menu 66 = B
        window.location.href = "../Menu/Menu.html"
    }

    else if (key.keyCode == "80"){
        // 80 = P
        if (isPlaying == true){
            Pause()
        }
        else {
            Play()

        }
    
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
