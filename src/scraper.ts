import axios from 'axios';
import * as cheerio from 'cheerio';

export async function getTabContents(html: string): Promise<Record<string, string>> {
  const $ = cheerio.load(html);
  const tabs: Record<string, string> = {};
  $('.e-n-tabs-content > div[role="tabpanel"]').each((_, el) => {
    const id = $(el).attr('id') || 'unknown';
    tabs[id] = $.html(el);
  });
  return tabs;
}

export async function getClusters(html: string): Promise<Record<string, string>> {
  const $ = cheerio.load(html);
  const clusters: Record<string, string> = {};
  $('.e-n-tab-list > button').each((_, btn) => {
    const id = $(btn).attr('aria-controls') || 'unknown';
    const clusterName = $(btn).find('span.e-n-tab-title-text').text().trim().replace(/\s+/g, '');
    clusters[id] = clusterName;
  });
  return clusters;
}

export function parseTabContent(html: string) {
  const $ = cheerio.load(html);
  const titleElement = $('h3.elementor-post__title a');
  const title = titleElement.text().trim();
  const readMoreUrl = titleElement.attr('href') ?? null;
  const teaser = $('.elementor-post__excerpt').text().trim() || '';
  return { title, readMoreUrl, teaser };
}

export async function fetchReadMoreContent(url: string) {
  try {
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);
    return $('#content .page-content').html() || '';
  } catch {
    return '';
  }
}