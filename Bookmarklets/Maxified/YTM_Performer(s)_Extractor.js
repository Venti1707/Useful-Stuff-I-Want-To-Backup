javascript: (() => {
    if (window.location.href.includes("https://music.youtube.com/playlist?list=PL") || window.location.href.includes("browse/VL")) {
        alert("Click anywhere in the page to copy the title, performer(s) & URL");
        document.addEventListener("click", function () {
            var performersElement = document.querySelector("yt-formatted-string.description.style-scope.ytmusic-description-shelf-renderer");
            if (performersElement) {
                var performers = performersElement.textContent.replace(/\n/g, " | ");
                navigator.clipboard.writeText(performers)
                    .then(() => {
                        alert("Performer(s) copied successfully");
                        window.location.reload();
                    })
                    .catch(err => {
                        alert("Could not copy performer(s): " + err);
                    });
            } else {
                alert("Performer(s) not found.");
            }
        });
    } else if (window.location.href.includes("https://music.youtube.com/playlist?list=OL")) {
        alert("In a YouTube Music album, not a playlist");
    } else {
        alert("Not in a YouTube Music playlist");
    }
})();