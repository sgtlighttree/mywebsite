document.addEventListener('DOMContentLoaded', function() {
    const galleries = document.querySelectorAll('.horizontal-gallery');

    galleries.forEach(gallery => {
        const scrollAmount = gallery.offsetWidth / 2;

        const leftArrow = gallery.parentElement.querySelector('.scroll-arrow.left');
        const rightArrow = gallery.parentElement.querySelector('.scroll-arrow.right');

        if (leftArrow && rightArrow) {
            leftArrow.addEventListener('click', function() {
                gallery.scrollLeft -= scrollAmount;
                leftArrow.style.animation = 'bumpLeft 300ms';
                setTimeout(() => { leftArrow.style.animation = ''; }, 300);
            });

            rightArrow.addEventListener('click', function() {
                gallery.scrollLeft += scrollAmount;
                rightArrow.style.animation = 'bumpRight 300ms';
                setTimeout(() => { rightArrow.style.animation = ''; }, 300);
            });
        }
    });
});
