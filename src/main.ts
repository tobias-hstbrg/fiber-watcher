import { getClusters, getTabContents, parseTabContent, fetchReadMoreContent } from './scraper';
import { sendMail } from './notifier';
import { loadCache, saveCache } from './store';
import axios from 'axios';

async function main() {
  // Fetch the main page HTML to scrape clusters and tab contents
  const url = 'https://www.radevormwald.de/glasfaserausbau-projektfortschritt/'; // put your real URL here
  const response = await axios.get(url);
  const html = response.data;

  // Extract cluster names and tab contents
  const clusters = await getClusters(html);
  const tabs = await getTabContents(html);

  const previousCache = loadCache();

  for (const [tabId, tabHtml] of Object.entries(tabs)) {
    const clusterName = 
    tabId === "e-n-tab-content-2194334341" 
    ? "Übersicht" 
    : clusters[tabId] || "Unbekannter Cluster";
    const { title, readMoreUrl, teaser } = parseTabContent(tabHtml);

    if (!title) continue; // skip if no news item

    if (previousCache[tabId] !== tabHtml) {
      // New or changed content!

      // Optionally fetch full article content if there's a read more link
      let fullContent = '';
      if (readMoreUrl) {
        fullContent = await fetchReadMoreContent(readMoreUrl);
      }

      // Prepare email body with cluster name, teaser, and full content
      const emailBody = `
      <html>
        <body style="font-family: Arial, sans-serif; background: #f9f9f9; margin: 0; padding: 20px;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
            <tr>
              <td style="padding: 20px;">
                <h1 style="font-size: 24px; color: #222222; margin-bottom: 5px;">${title}</h1>
                  <p style="font-size: 14px; color: #888888; font-style: italic; margin-top: 0; margin-bottom: 20px;">Cluster: ${clusterName}</p>
                  <p style="font-size: 16px; color: #333333; line-height: 1.5; margin-bottom: 15px;">${teaser}</p>
                  <p style="font-size: 16px; color: #333333; line-height: 1.5; margin-top: 0;">${fullContent}</p>
              </td>
            </tr>
          </table>
        </body>
      </html>
`;
      //${readMoreUrl ? `<p><a href="${readMoreUrl}">Weiterlesen »</a></p>` : ''}
      await sendMail(`News Update: ${title}`, emailBody);
      console.log(`Sent update email for tab ${tabId} (${clusterName})`);
    }
  }

  saveCache(tabs);
}

main().catch(console.error);
