import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";
import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: 'https://maxtrier.dk',
  integrations: [mdx(), sitemap(), tailwind(), compress()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: false
    }
  }
});