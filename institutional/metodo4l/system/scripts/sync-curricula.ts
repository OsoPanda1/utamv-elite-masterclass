import fs from "node:fs";
import path from "node:path";
import { prisma } from "@utamv/core-engine/db";

async function main() {
  const root = path.resolve(process.cwd(), "docs");
  const mallaPath = path.join(root, "malla-curricular.md");

  if (!fs.existsSync(mallaPath)) {
    console.warn("No se encontró docs/malla-curricular.md, omitiendo sync.");
    return;
  }

  const raw = fs.readFileSync(mallaPath, "utf-8");
  const headings = raw
    .split("\n")
    .filter((line) => /^#{2,3}\s+/.test(line))
    .map((line) => line.replace(/^#{2,3}\s+/, "").trim());

  console.log(
    `Sync curricular pendiente de implementación detallada. Se detectaron ${headings.length} encabezados en docs/malla-curricular.md.`,
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
