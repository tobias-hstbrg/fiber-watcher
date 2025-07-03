import fs from "fs";
const storePath = "./data/cache.json";

export function loadCache(): Record<string, string> {
  if (!fs.existsSync(storePath)) return {};
  return JSON.parse(fs.readFileSync(storePath, "utf-8"));
}

export function saveCache(data: Record<string, string>) {
  fs.writeFileSync(storePath, JSON.stringify(data, null, 2), "utf-8");
}
