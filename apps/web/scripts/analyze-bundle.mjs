import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const distDir = path.join(cwd, "dist");
const assetsDir = path.join(distDir, "assets");
const statsPath = path.join(distDir, "stats.json");

function listFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .map((name) => path.join(dir, name))
    .filter((fullPath) => fs.statSync(fullPath).isFile());
}

function toKb(bytes) {
  return Number((bytes / 1024).toFixed(2));
}

function flattenModules(input, acc = []) {
  if (!input || typeof input !== "object") return acc;
  if (Array.isArray(input)) {
    input.forEach((value) => flattenModules(value, acc));
    return acc;
  }

  const name = input.name || input.id || input.file || input.label;
  const renderedLength =
    input.renderedLength ??
    input.renderedSize ??
    input.codeSize ??
    input.size ??
    null;

  if (name && typeof renderedLength === "number") {
    acc.push({
      name: String(name),
      renderedLength,
    });
  }

  for (const value of Object.values(input)) {
    flattenModules(value, acc);
  }

  return acc;
}

function normalizeModuleName(id) {
  const nodeModulesKey = "/node_modules/";
  const idx = id.indexOf(nodeModulesKey);
  if (idx >= 0) {
    return id.slice(idx + nodeModulesKey.length);
  }
  return id.replace(`${cwd}/`, "");
}

function fromVisualizerNodeParts(statsJson, initialChunkName) {
  const nodeMetas = statsJson.nodeMetas ?? {};
  const nodeParts = statsJson.nodeParts ?? {};
  const initialScores = new Map();
  const totalJsScores = new Map();

  const jsChunks = new Set(
    Object.keys(statsJson.tree?.children?.reduce((acc, item) => {
      acc[item.name] = true;
      return acc;
    }, {}) ?? {}).filter((name) => name.endsWith(".js")),
  );

  for (const meta of Object.values(nodeMetas)) {
    if (!meta || typeof meta !== "object" || !meta.id || !meta.moduleParts) continue;
    const name = normalizeModuleName(meta.id);
    const moduleParts = meta.moduleParts;

    for (const [chunkName, partUid] of Object.entries(moduleParts)) {
      const part = nodeParts[partUid];
      if (!part) continue;
      const rendered = part.renderedLength ?? 0;
      if (!rendered) continue;

      if (chunkName === initialChunkName) {
        initialScores.set(name, (initialScores.get(name) ?? 0) + rendered);
      }
      if (jsChunks.has(chunkName)) {
        totalJsScores.set(name, (totalJsScores.get(name) ?? 0) + rendered);
      }
    }
  }

  const toTop = (map) =>
    [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([name, size]) => ({ name, renderedKb: toKb(size) }));

  return {
    topInitialChunkContributors: toTop(initialScores),
    topTotalJsContributors: toTop(totalJsScores),
  };
}

function printTable(title, rows, nameKey, valueKey, suffix = "KB") {
  console.log(`\n${title}`);
  if (rows.length === 0) {
    console.log("  (no data)");
    return;
  }
  rows.forEach((row, idx) => {
    console.log(`  ${idx + 1}. ${row[nameKey]} - ${row[valueKey]} ${suffix}`);
  });
}

const assetFiles = listFiles(assetsDir);
const transferredTop10 = assetFiles
  .map((filePath) => ({
    file: path.basename(filePath),
    sizeKb: toKb(fs.statSync(filePath).size),
  }))
  .sort((a, b) => b.sizeKb - a.sizeKb)
  .slice(0, 10);

const initialChunkCandidates = transferredTop10.filter((item) =>
  item.file.endsWith(".js"),
);
const initialEntryChunk = initialChunkCandidates[0] ?? null;

let topContributors = [];
let topInitialChunkContributors = [];
let topTotalJsContributors = [];
if (fs.existsSync(statsPath)) {
  try {
    const statsJson = JSON.parse(fs.readFileSync(statsPath, "utf8"));
    if (statsJson.nodeParts && statsJson.nodeMetas && initialEntryChunk) {
      const top = fromVisualizerNodeParts(statsJson, `assets/${initialEntryChunk.file}`);
      topInitialChunkContributors = top.topInitialChunkContributors;
      topTotalJsContributors = top.topTotalJsContributors;
    } else {
      topContributors = flattenModules(statsJson)
        .sort((a, b) => b.renderedLength - a.renderedLength)
        .slice(0, 10)
        .map((item) => ({ name: item.name, renderedKb: toKb(item.renderedLength) }));
    }
  } catch (error) {
    console.error("Failed to parse dist/stats.json:", error);
  }
}

printTable(
  "Top 10 contributors to initial entry chunk (rendered):",
  topInitialChunkContributors.length > 0 ? topInitialChunkContributors : topContributors,
  "name",
  "renderedKb",
);
printTable(
  "Top 10 contributors to total JS (rendered):",
  topTotalJsContributors,
  "name",
  "renderedKb",
);
printTable(
  "Top 10 transferred assets:",
  transferredTop10,
  "file",
  "sizeKb",
);

const summary = {
  generatedAt: new Date().toISOString(),
  initialEntryChunk,
  topInitialChunkContributors,
  topTotalJsContributors,
  transferredTop10,
};

const summaryPath = path.join(distDir, "bundle-summary.json");
fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
console.log(`\nWrote bundle summary: ${summaryPath}`);
