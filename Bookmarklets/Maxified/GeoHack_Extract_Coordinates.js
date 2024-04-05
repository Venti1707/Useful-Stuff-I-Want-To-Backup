javascript: (() => {
    if (window.location.href.includes("https://geohack.toolforge.org/geohack.php?pagename=")) {
        alert("Click anywhere in the page to copy the coordinates");
        document.addEventListener("click", function () {
            var latitudeElement = document.querySelector(".latitude");
            var longitudeElement = document.querySelector(".longitude");
            if (latitudeElement && longitudeElement) {
                var latitude = latitudeElement.textContent;
                var longitude = longitudeElement.textContent;
                var lineBreak = "\n";
                var toCopy = latitude + ", " + longitude + lineBreak;
                navigator.clipboard.writeText(toCopy).then(() => {
                    alert("Coordinates copied successfully");
                    window.location.reload();
                }).catch(err => {
                    alert("Could not copy text: ", err);
                })
            } else {
                alert("Latitude, longitude element(s) not found.");
            }
        })
    } else {
        alert("Not on a GeoHack page");
    }
})();