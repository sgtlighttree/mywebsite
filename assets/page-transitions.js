document.addEventListener('DOMContentLoaded', () => {
  // Set a brief timeout to ensure class application isn't rushed
        setTimeout(() => {
    document.body.classList.add('is-visible'); // Show the page
  }, 50); // 50ms to ensure it properly handles immediate display

  // Setup link navigation fading
  document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', event => {
      if (link.hostname === window.location.hostname && link.href) {
        event.preventDefault();

        // Add fade-out class to initiate fading out animation
        document.body.classList.remove('is-visible');
        document.body.classList.add('fade-out');

        // Redirect after the fade-out animation
        setTimeout(() => {
          window.location.href = link.href;
        }, 500); // This transition time should match your CSS
      }
    });
  });
});
