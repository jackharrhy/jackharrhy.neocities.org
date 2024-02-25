import type { APIRoute } from "astro";
import fs from "fs";

import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export const get: APIRoute = async function get({ site }) {
  if (!site) throw new Error("no site");

  const tealogs = await getCollection("tealog");

  const items = tealogs.map(({ slug, data: { date } }) => {
    const teaGifPath = `./public/assets/tea-log/${slug}/tea.gif`;
    const teaGifSize = fs.statSync(teaGifPath).size;

    const teaGifUrl = `${
      import.meta.env.BASE_URL
    }assets/tea-log/${slug}/tea.gif`;

    return {
      title: slug,
      pubDate: date,
      link: `${import.meta.env.BASE_URL}tea-log/${slug}/`,
      enclosure: {
        type: "image/gif",
        url: teaGifUrl,
        length: teaGifSize,
      },
    };
  });

  return rss({
    title: "jackharrhy.neocities.org - tea-log",
    description: "tea is being consumed, and logged",
    site: site.toString(),
    items,
  });
};
