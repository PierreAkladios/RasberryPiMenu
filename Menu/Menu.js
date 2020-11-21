window.addEventListener("keydown", checkKey, false);

function checkKey(key) {
    if (key.keyCode == "77") {
        // 77 = M
        window.location.href = "../Music/music.html"
        //Gets the user to the music page
    }

    else if (key.keyCode == "69") {
        // 69 = E
        window.location.href = "../Email/email.html"
        //Gets the user to the email page
    }

    else if (key.keyCode == "87") {
        // 87 = W
        window.location.href = "../Meteo/meteo.html"
        //Gets the user to the weather page
    }
    else if (key.keyCode == "86") {
        // 86 = v
        window.location.href = "../Video/video.html"
        //Gets the user to the video page
    }
    else if (key.keyCode == "83") {
        // 83 = S
        window.location.href = "../Reglages/reglages.html"
        //Gets the user to the settings page
    }
    else if (key.keyCode == "73") {
        // 73 = i
        window.location.href = "../Information/information.html"
        //Gets the user to the information page
    }
    

}