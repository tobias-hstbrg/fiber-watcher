import { getTabContents } from "./scraper";
import { loadCache, saveCache } from "./store.ts"
import { sendMail } from "./notifier";

async function main() {
  const current = await getTabContents();
  const previous = loadCache();

  for (const [tabId, content] of Object.entries(current)) {
    if (previous[tabId] !== content) {
      await sendMail(
        `Änderung bei ${tabId}`,
        `Inhalt wurde aktualisiert: <pre>${content.slice(0, 500)}...</pre>`
      );
    }
  }

  saveCache(current);
}

main();