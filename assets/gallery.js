document.addEventListener('DOMContentLoaded', () => {
  const galleries = document.querySelectorAll('.horizontal-gallery');

  galleries.forEach(gallery => {
    
    const leftArrow = gallery.previousElementSibling;
    const rightArrow = gallery.nextElementSibling;

    const updateArrows = () => {
      leftArrow.style.display = gallery.scrollLeft > 0 ? 'block' : 'none';
      rightArrow.style.display = gallery.scrollLeft < gallery.scrollWidth - gallery.clientWidth ? 'block' : 'none';
    };
    
    // Call updateArrows once on load
    updateArrows();

    gallery.addEventListener('scroll', updateArrows);


        const scrollAmount = gallery.querySelector('.gallery-media-box').offsetWidth + 20; // Add margin

        leftArrow.addEventListener('click', () => {
            gallery.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth' // Smooth scrolling
            });
        });

        rightArrow.addEventListener('click', () => {
            gallery.scrollBy({
                left: scrollAmount,
                behavior: 'smooth' // Smooth scrolling
            });
        });

    // Prevent selection within gallery
    gallery.addEventListener('selectstart', e => e.preventDefault());

    const getResponsiveMaxHeight = () => {
        const isMobile = window.innerWidth <= 768; // Adjust breakpoint as needed.  768 is a commonly used breakpoint for tablets.
        return isMobile ? 250 : 350; // Adjust these values as needed for mobile and desktop.
      };
  
      let maxHeight = getResponsiveMaxHeight();
  
      const resizeMedia = (element) => {
        const containerWidth = element.parentElement.offsetWidth;
        const naturalWidth = element.videoWidth || element.naturalWidth;
        const naturalHeight = element.videoHeight || element.naturalHeight;
        const aspectRatio = naturalWidth / naturalHeight;
        const scaledWidth = maxHeight * aspectRatio;
  
        const finalWidth = Math.min(scaledWidth, containerWidth);
        const finalHeight = finalWidth / aspectRatio;
  
        element.style.width = `${finalWidth}px`;
        element.style.height = `${finalHeight}px`;
      };
  
      gallery.querySelectorAll('.gallery-media-box video, .gallery-media-box img').forEach(resizeMedia);
  
      // Resize on window resize and orientation change
      window.addEventListener('resize', () => {
        maxHeight = getResponsiveMaxHeight(); // Update maxHeight on resize
        gallery.querySelectorAll('.gallery-media-box video, .gallery-media-box img').forEach(resizeMedia);
      });
  
      window.addEventListener('orientationchange', () => {
        maxHeight = getResponsiveMaxHeight(); // Update maxHeight on orientation change
        gallery.querySelectorAll('.gallery-media-box video, .gallery-media-box img').forEach(resizeMedia);
      });
  
        // Handle margins more robustly
        const mediaBoxes = gallery.querySelectorAll('.gallery-media-box');
        mediaBoxes.forEach((box, index) => {
            box.style.marginRight = index < mediaBoxes.length - 1 ? '20px' : '0px'; //More concise
        });
  
    });
  });
