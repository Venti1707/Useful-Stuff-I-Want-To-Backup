javascript:(() => {
    document.querySelectorAll('a').forEach(function(link) {
        link.removeAttribute('href');
        link.style.color = 'black';
        link.style.pointerEvents = 'none';
        link.style.fontStyle = 'normal';
    });
})();