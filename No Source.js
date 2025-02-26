document.addEventListener("DOMContentLoaded", function () {
    const defaultImageSrc = 'Assets/Foundation/Foundation Image Not Found.svg';
    const images = document.querySelectorAll('img');

    images.forEach(img => {
        // Set default image if src is empty or missing
        if (!img.getAttribute('src') || img.getAttribute('src').trim() === '') {
            img.setAttribute('src', defaultImageSrc);
        }

        // Add error event listener to handle broken image links
        img.addEventListener('error', function () {
            img.setAttribute('src', defaultImageSrc);
        });
    });
});