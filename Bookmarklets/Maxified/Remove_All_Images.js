alert("Removed all images");
for (var i = document.images.length; (i-- > 0); true) {
    document.images[i].parentNode.removeChild(document.images[i]);
}