javascript: (() => {
    var url = window.location.href;
    if (url.includes("https://music.youtube.com/playlist?list=PL") || url.includes("browse/VL")) {
        if (url.includes("https://music.youtube.com/playlist?list=PL")) {
            var urlPL = url;
            alert("Click anywhere in the page to copy the title, performer(s) & URL");
            document.addEventListener("click", function () {
                var performersElement = document.querySelector("yt-formatted-string.description.style-scope.ytmusic-description-shelf-renderer");
                var titleElement = document.querySelector("yt-formatted-string.title.style-scope.ytmusic-responsive-header-renderer");
                if (performersElement || titleElement) {
                    var performers = performersElement.textContent.replace(/\n/g, " | ");
                    var title = titleElement.textContent;
                    var url = url;
                    navigator.clipboard.writeText(title + " (" + performers + ")\n" + urlPL + "\n\n")
                        .then(() => {
                            alert("Performer(s), title & URL copied successfully");
                            window.location.reload();
                        })
                        .catch(err => {
                            alert("Could not copy performer(s), title & URL: " + err);
                        });
                } else {
                    alert("Performer(s), title & URL and/or title not found.");
                }
            });
        } else if (url.includes("browse/VL")) {
            var urlVL = url.replace("browse/VL", "playlist?list=")
            alert("Click anywhere in the page to copy the title, performer(s) & URL");
            document.addEventListener("click", function () {
                var performersElement = document.querySelector("yt-formatted-string.description.style-scope.ytmusic-description-shelf-renderer");
                var titleElement = document.querySelector("yt-formatted-string.title.style-scope.ytmusic-responsive-header-renderer");
                if (performersElement || titleElement) {
                    var performers = performersElement.textContent.replace(/\n/g, " | ");
                    var title = titleElement.textContent;
                    var url = url;
                    navigator.clipboard.writeText(title + " (" + performers + ")\n" + urlVL + "\n\n")
                        .then(() => {
                            alert("Performer(s), title & URL copied successfully");
                            window.location.reload();
                        })
                        .catch(err => {
                            alert("Could not copy performer(s), title & URL: " + err);
                        });
                } else {
                    alert("Performer(s), title & URL and/or title not found.");
                }
            });
        }

    } else if (url.includes("https://music.youtube.com/playlist?list=OL")) {
        alert("In a YouTube Music album, not a playlist");
    } else {
        alert("Not in a YouTube Music playlist");
    }
})();