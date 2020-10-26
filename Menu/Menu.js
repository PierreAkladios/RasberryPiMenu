window.addEventListener("keydown", checkKey, false);

function checkKey(key) {
    if (key.keyCode == "77") {
        // 77 = M
        window.location.href = "../Music/music.html"
    }

    else if (key.keyCode == "69") {
        // 69 = E
        window.location.href = "../Email/email.html"
    }

    else if (key.keyCode == "87") {
        // 87 = W
        window.location.href = "../Meteo/meteo.html"
    }
    else if (key.keyCode == "86") {
        // 86 = v
        window.location.href = "../Video/video.html"
    }
    else if (key.keyCode == "83") {
        // 83 = S
        window.location.href = "../Reglages/reglages.html"
    }
    else if (key.keyCode == "73") {
        // 73 = i
        window.location.href = "../Information/information.html"
    }
    

}