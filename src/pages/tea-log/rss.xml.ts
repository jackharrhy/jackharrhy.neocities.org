import type { APIRoute } from "astro";

import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

const toDate = (date: string) => {
  const [day, month, year] = date.split("-").map((n) => parseInt(n, 10));
  return new Date(year, month - 1, day);
};

export const get: APIRoute = async function get({ site }) {
  if (!site) throw new Error("no site");

  const tealogs = await getCollection("tealog");

  const items = tealogs.map(({ slug }) => ({
    title: slug,
    pubDate: toDate(slug),
    link: `${import.meta.env.BASE_URL}tea-log/${slug}/`,
  }));

  return rss({
    title: "jackharrhy.neocities.org - tea-log",
    description: "tea is being consumed, and logged",
    site: site.toString(),
    items,
    stylesheet: "/rss/tealog.xsl",
  });
};
