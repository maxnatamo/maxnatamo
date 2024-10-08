---
title: 💾 Backup savegames from your Nintendo DS Lite
description: Saving precious memories from bit-rot and reliving them in emulators.
publishDate: 'Jul 02 2022'
category: tech
tags:
  - dumping
  - emulation
  - nostalgia
---

## Preface

<!-- vale proselint.Very = NO -->
<!-- vale Microsoft.Adverbs = NO -->

I spent countless hours on my Nintendo DS. It wasn't just my first handheld, but my very first console. I had received it as a birthday present when I turned 10 years old, along with *LEGO Indiana Jones: The Original Adventures.* That thing was magical. Many hundreds of hours spent on it, wearing the touchscreen-protector down, mashing the buttons. Many good memories.

<!-- vale Microsoft.Adverbs = YES -->
<!-- vale proselint.Very = YES -->

Recently, while moving, I found my old Nintendo DS Lite. Still worn, screen hinge not working, etc. But, all my save-files still there. It felt amazing to play through the old saves again, many years later. I decided that I wanted to backup my precious saves onto my server, so they were safe forever and so I could play them whenever I wanted in an emulator.

## Flashcarts

If you've ever tried modding a console, you might already know the complexity behind it. There's either tons of different methods or tons of different products, using the same method.

On the Nintendo DSi, you can exploit the camera, Flipnote Studio and more. On the 3DS, you can flash custom firmware. On the DS Lite, however? The only way to do anything, is using flashcarts (sometimes written as flashkarts).

Flashcarts allow you to attach an SD-card into your DS and load custom applications. Many flashcarts have been created over the years, but few are still created. Most of the stock you see now are either old stock or clones. They can also be more expensive. Even more so, in Europe. In my case, I bought a cheap clone from eBay.

![](/nds/_flashcart.webp "")

I won't bother linking the specific one I bought, as it doesn't actually matter. Anything that looks slightly like this, is most likely the same thing, but from a different seller.

## Setup

After receiving your flashcart-clone, you to format your SD-card. Any SD-card can be used, but it needs to be formatted with FAT32. Many people have problems with larger SD-cards, so try limiting the partition to 1 or 2 gigabytes. Otherwise, the default settings should be fine.

Next, you're gonna need a kernel. Most kernels are made for specific flashcarts and won't work with other carts. Some kernels were intentionally malicious and would contain a time-bomb, that would brick the cart. There's a lot of conflicting information about who it affects, if they're still active, etc. **If you want to be completely sure, set your DS' internal clock back to 2009.**

I found my kernel on a Reddit post, that I have since lost. It contained a patched kernel, that would work for multiple clone carts. [You can find it here](/nds/flashcart_kernel.zip).

Optionally, here are the checksums:
- **SHA1**: `905fd7ff26e287fcebe0519156ac97320ba333e0`
- **MD5**: `073df476f172ff3ff2c9c64715351acf`

After downloading it, unzip the contents to the root of the SD-card, so it looks like this:

![](/nds/_sdroot1.webp "")

After copying the files over, you should be able to plug your SD-card into your flashcart and insert it into your DS. The game will show up as *SpongeBob's Atlantis Squarepants THQ.* After opening it, you should see something like this:

![](/nds/_kernel.webp "")

However, this isn't useful in itself, as there's no applications or tools.

## Wood Dumper

For dumping your save-games, and optionally your game ROMs, I recommend Wood Dumper. It's a small custom ROM that you copy to the SD-card and run. It will connect to Nintendo WFC and open a local FTP server, where the ROM and save file will be stored.

There are a couple of problems, however.

There are no way to connect to Nintendo WFC in the DS' own interface. Only WFC-enabled games allow you to setup WFC. These aren't rare, however. Mario Kart DS, most Pokemon games and many more allow you to do this. [You can find a full list here](https://en.wikipedia.org/wiki/List_of_Nintendo_DS_Wi-Fi_Connection_games).

However, that's not all. You need to have either an open or WEP-secured WiFi network. If you don't know, WEP is an old WiFi security standard and it's obsolete because of it's poor security. So, you need to change your WiFi settings to either change your security settings to WEP or have no password at all. While an open network might be easier, many phones automatically connect to open networks, so your neighbours might get onto your network. It might be possible to create a local hotspot with a phone or similar, but I haven't tried this.

This last one is a simple workaround. To confirm connectivity to the internet, the DS will ping a Nintendo service. This service is long gone, however and will throw an error. [You can follow the guide here](https://wii.guide/wiimmfi#instructions-4), but in short, you need to change your primary DNS to this IP: `164.132.44.106`

After connecting to WFC, you can download Wood Dumper onto your SD-card. [Here is the original thread](https://digiex.net/threads/wood-dumper-dump-nintendo-ds-roms-and-save-games-over-wi-fi-with-an-nintendo-ds.14729/), but I'll go through it here, anyway.

If the original download is gone, [you can also download it here](/nds/wooddumper_r89.zip).

After downloading, optionally compare the checksums:
* **SHA1:** `2cdc854d36f492a3450e2f90ede4952d83e594a4`
* **MD5:** `4c6d7be77575ba111dfb2bd7f3ff4194`

After that, unpack the `.nds`-files onto your SD-card. It doesn't matter where you put them, they will show up. If you don't need to dump GameBoy games, you don't need the Slot-2 ROM.

After inserting your SD-card back into your DS, you should be able to see the ROMs in the interface.

![](/nds/_wooddumper.webp "")

After opening it, you'll be prompted to plug in a target cartridge. Don't worry, the ROM has been copied to RAM and will still work after you take out the flashcart.

![](/nds/_targetcard.webp "")

Simply remove it and put in your game cartridge. After that, press A. The DS will connect to your WiFi and give you an IP-address on the top-screen. Connect to it with an FTP-client like [FileZilla](https://filezilla-project.org/). There is no username, password, SSL, or anything. The port will default to 21.

If it doesn't work or the dumper throws an error like `Failed to read`, try blowing on the cartridge or reinsert it a couple of times. The dumper will sometimes crash, when putting in a new card. It's fine, simply reboot it and try again.

You should see the game ROM and your save-file in the directory listing:

![](/nds/_directory.webp "")

You can then download the save, ROM or both. Do note, the ROMs are pretty big and will take a long time. The connection can also be a little unstable at times. If it doesn't work the first time, try again.

After downloading the files, you should rename them, to save your future-self the trouble of identifying them.

## Emulation and final thoughts

<!-- vale Microsoft.Adverbs = NO -->

You can actually stop here. You have your savegame, and/or game ROM. But, you might want to play in an emulator. There are tons of emulators for the DS and/or GBA, but the ones I use are DeSmuME and mGBA. Both emulators can load from `.sav`-files. DeSmuME does save them separately as `.dsv`-files, however.

<!-- vale Microsoft.Adverbs = YES -->

And that's it! You've preserved your childhood memories and you can now play them whenever you want, without your DS.

I'd like to end this by saying that there are ethical and moral questions to consider, when doing this. Is it okay to copy ROMs? Even though I bought them? Maybe it isn't even legal where you live. I won't try to answer those questions. Personally, I think it's morally okay to preserve saves and games that you own. That's obviously not legal advice, though. Check your jurisdiction.