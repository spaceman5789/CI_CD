const fs = require("node:fs");
const path = require("node:path");

const projectRoot = path.resolve(__dirname, "..");
const targets = ["src", "test", "scripts"].map((dir) =>
  path.join(projectRoot, dir)
);

const issues = [];

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (!entry.name.endsWith(".js")) {
      continue;
    }
    const content = fs.readFileSync(fullPath, "utf8").split(/\r?\n/);
    content.forEach((line, index) => {
      if (/\t/.test(line)) {
        issues.push(`${fullPath}:${index + 1} contains tab`);
      }
      if (/\s+$/.test(line)) {
        issues.push(`${fullPath}:${index + 1} has trailing whitespace`);
      }
    });
  }
}

for (const target of targets) {
  if (fs.existsSync(target)) {
    walk(target);
  }
}

if (issues.length > 0) {
  console.error("lint failed:");
  for (const issue of issues) {
    console.error(issue);
  }
  process.exit(1);
}

console.log("lint ok");
