---
layout: page
title: Contact
permalink: /contact/
---

<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
<link rel="stylesheet" href="{{ '/assets/main.css' | relative_url }}">
<link rel="stylesheet" href="{{ '/assets/custom_styles.css' | relative_url }}">

<div class="contact-info">
  <p>
      <span class="material-symbols-outlined"> mail </span>
      <a href="mailto:matthew.oyan@protonmail.com">matthew.oyan@protonmail.com</a>
  </p>

  <p>
      <span class="material-symbols-outlined">call</span>
      (Philippines/SMART)&nbsp;&nbsp;<a href="tel:+639472290659">+63 947 229 0659</a>
  </p>
</div>

<div class="contact-form">
  <h2>Get In Touch</h2>
  <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" action="{{ '/success/' | relative_url }}">
    <input type="hidden" name="form-name" value="contact" />
    <!-- Create a combined subject field that Netlify will use -->
    <input type="hidden" id="form-subject" name="subject">
    <p class="hidden">
        <label>Don't fill this out if you're human: <input name="bot-field" /></label>
    </p>
    <div class="form-group">
      <label for="name">Name</label>
      <input type="text" name="name" id="name" required>
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" required>
    </div>
    <div class="form-group">
      <label for="topic">Subject</label>
      <input type="text" name="topic" id="topic" required onchange="updateSubject()">
    </div>
    <div class="form-group">
      <label for="message">Message</label>
      <textarea name="message" id="message" rows="5" required></textarea>
    </div>
    <button type="submit">Send</button>
  </form>
</div>

<script>
function updateSubject() {
  const name = document.getElementById('name').value || '(unnamed)';
  const topic = document.getElementById('topic').value || 'Website Contact';
  document.getElementById('form-subject').value = `[${topic}] - Message from ${name}`;
}

// Update when name changes too
document.getElementById('name').addEventListener('change', updateSubject);
// Update on form submission
document.querySelector('form[name="contact"]').addEventListener('submit', updateSubject);
</script>