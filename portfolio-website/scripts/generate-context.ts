import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const about = readFileSync(resolve(root, "about.md"), "utf-8");
const projects = readFileSync(resolve(root, "projects.md"), "utf-8");

const output = `// Auto-generated — do not edit. Run \`npm run generate:context\` to update.
export const ABOUT_MD = ${JSON.stringify(about)};
export const PROJECTS_MD = ${JSON.stringify(projects)};
`;

writeFileSync(resolve(root, "lib/chat/context.ts"), output, "utf-8");
console.log("Generated lib/chat/context.ts");
