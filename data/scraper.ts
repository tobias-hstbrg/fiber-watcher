import axios from 'axios';
import * as cheerio from 'cheerio';

export async function getTabContents(): Promise<Record<string, string>> {
    const url = "https://www.radevormwald.de/glasfaserausbau-projektfortschritt/";
    const res = await axios.get(url);
    const $ = cheerio.load(res.data);

    const tabs: Record<string, string> = {};

  $(".e-n-tabs-content > div[role='tabpanel']").each((_, el) => {
    const tabId = $(el).attr("id") ?? "unknown";
    const content = $(el).text().trim();
    tabs[tabId] = content;
  });

  return tabs;
}