---
layout: ../../layouts/MarkdownPostLayout.astro
title: 'An Easy DIY File Server with copyparty and Tailscale'
pubDate: 2025-07-30
description: 'I have never been this nerd sniped before.'
author: 'Matthew Oyan'
tags: ["homelab", "AI", "servers"]
---

YouTube served me [this video](https://www.youtube.com/watch?v=15_-hgsX2V0) about copyparty, a supposedly easy to deploy file server.

It really was.

All I have to do is run `start-copyparty.bat` from my Desktop folder, which has this code:

```batch
@echo off
cd /d M:\
START "Copyparty Server" /B "c:\program files\python312\pythonw.exe" "M:\copyparty-sfx.py" -c "M:\settings.conf" -lo "M:\copyparty-errors.log":w > nul 2>&1
```

Or, from anywhere else, I made a Task Scheduler Event that I can also call on demand: 

```batch
schtasks /run /tn "Start Copyparty Server"
```

And to verify, I can run `tasklist | findstr /i "pythonw.exe"` and it should look like this:

```
matth@MATTHEW M:\>tasklist | findstr /i "pythonw.exe"       
pythonw.exe                   2576 Console                    1     63,480 K
```










