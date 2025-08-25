---
layout: ../../layouts/BlogPostLayout.astro
title: 'Website Rebuild'
pubDate: 2025-07-21
description: 'Migrating from Jekyll to Astro'
author: 'Matthew Oyan'
tags: ["webdev", "AI", "astro", "blogging", "learning in public"]
---

# Animation Comparison

## Lottie Version (~100KB)
<script type="module">
	import { DotLottie } from "https://esm.sh/@lottiefiles/dotlottie-web";
</script>

<canvas id="dotLottie-canvas" style="width: 60px; height: 36px; border: 1px solid #666;"></canvas>

<script type="module">
	import { DotLottie } from "https://esm.sh/@lottiefiles/dotlottie-web";

	const canvas = document.querySelector("#dotLottie-canvas");
	const src = "../../../MatthewOyan_MonogramAnimated.json";

	const dotLottie = new DotLottie({
	  canvas,
	  src,
	  loop: true,
	  autoplay: true
	});
</script>

## CSS Version (~1KB)

<style>
.css-monogram {
  width: 60px;
  height: 36px;
  position: relative;
  border: 1px solid #666;
  background: transparent;
}

.css-monogram-element {
  position: absolute;
  background-color: var(--text-primary, #333);
  transform: scale(0);
  animation: monogram-scale 2.68s infinite;
}

/* Theme support */
:global(.dark) .css-monogram-element {
  background-color: var(--text-primary, #fff);
}

/* Individual elements with positioning and timing */
.element-1 { /* top_left */
  width: 36px; height: 6px;
  left: 0px; top: 0px;
  animation-delay: 0s;
}

.element-2 { /* left */
  width: 6px; height: 30px;
  left: 0px; top: 6px;
  animation-delay: 0.47s;
}

.element-3 { /* bottom */
  width: 54px; height: 6px;
  left: 6px; top: 30px;
  animation-delay: 0.55s;
}

.element-4 { /* right */
  width: 6px; height: 30px;
  left: 54px; top: 6px;
  animation-delay: 0.67s;
}

.element-5 { /* top_right */
  width: 18px; height: 6px;
  left: 36px; top: 0px;
  animation-delay: 0.8s;
}

.element-6 { /* center_right */
  width: 6px; height: 18px;
  left: 15px; top: 18px;
  animation-delay: 0.57s;
}

.element-7 { /* center_left */
  width: 6px; height: 18px;
  left: 27px; top: 18px;
  animation-delay: 0.6s;
}

.element-8 { /* center */
  width: 12px; height: 12px;
  left: 42px; top: 12px;
  animation-delay: 0.65s;
}

@keyframes monogram-scale {
  0% { transform: scale(0); }
  18% { transform: scale(1); }
  82% { transform: scale(1); }
  100% { transform: scale(0); }
}
</style>

<div class="css-monogram">
  <div class="css-monogram-element element-1"></div>
  <div class="css-monogram-element element-2"></div>
  <div class="css-monogram-element element-3"></div>
  <div class="css-monogram-element element-4"></div>
  <div class="css-monogram-element element-5"></div>
  <div class="css-monogram-element element-6"></div>
  <div class="css-monogram-element element-7"></div>
  <div class="css-monogram-element element-8"></div>
</div>

**Performance Comparison:**
- **Lottie:** ~100KB library + 12KB JSON = 112KB total
- **CSS:** ~1KB total
- **Load Time:** CSS loads instantly, no network requests
- **Browser Support:** CSS works everywhere, no JavaScript required

Hello
