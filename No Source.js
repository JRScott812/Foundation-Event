document.addEventListener("DOMContentLoaded", function () {
    const defaultImageSrc = 'Assets/Foundation/Foundation Image Not Found.svg';
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        if (!img.getAttribute('src') || img.getAttribute('src').trim() === '') {
            img.setAttribute('src', defaultImageSrc);
        }
    });
});