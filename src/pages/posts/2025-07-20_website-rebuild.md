---
layout: ../../layouts/BlogPostLayout.astro
title: 'Website Rebuild'
pubDate: 2025-07-21
description: 'Migrating from Jekyll to Astro'
author: 'Matthew Oyan'
tags: ["webdev", "AI", "astro", "blogging", "learning in public"]
---
Hello

<script type="module">
	import { DotLottie } from "https://esm.sh/@lottiefiles/dotlottie-web";
</script>

<canvas id="dotLottie-canvas"></canvas>

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