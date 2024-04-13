javascript: (() => {
    if (window.location.href.includes("https://geohack.toolforge.org/geohack.php")) {
        alert("Click anywhere in the page to copy the coordinates & location");
        document.addEventListener("click", function () {
            var locationElement = document.getElementById("firstHeading");
            var latitudeElement = document.querySelector(".latitude");
            var longitudeElement = document.querySelector(".longitude");
            if (latitudeElement && longitudeElement && locationElement) {
                var location = locationElement.textContent.split("GeoHack - ")[1];
                var latitude = latitudeElement.textContent;
                var longitude = longitudeElement.textContent;
                var lineBreak = "\n";
                var toCopy = latitude + ", " + longitude + ", " + location + lineBreak;
                navigator.clipboard.writeText(toCopy).then(() => {
                    alert("Coordinates & location copied successfully");
                    window.location.reload();
                }).catch(err => {
                    alert("Could not copy text: ", err);
                })
            } else {
                alert("Location, latitude, longitude element(s) not found.");
            }
        })
    } else {
        alert("Not on a GeoHack page");
    }
})();