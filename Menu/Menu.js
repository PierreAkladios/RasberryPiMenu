window.addEventListener("keydown", checkKey, false);

function checkKey(key) {
    if (key.keyCode == "77") {
        // 77 = M
        window.location.href = "../Music/music.html"
    }

    else if (key.keyCode == "69") {
        // 77 = E
        window.location.href = "../Email/email.html"
    }

    else if (key.keyCode == "87") {
        // 77 = W
        window.location.href = "../Meteo/meteo.html"
    }

}