/**
 * Generate OG image (1200×630) using Puppeteer.
 * Run: node scripts/og-image.mjs
 */
import puppeteer from "puppeteer";
import { writeFileSync } from "fs";
import { resolve } from "path";

const WIDTH = 1200;
const HEIGHT = 630;

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    width: ${WIDTH}px;
    height: ${HEIGHT}px;
    background: #0a0e1a;
    font-family: 'Inter', sans-serif;
    color: #e8e6e3;
    display: flex;
    overflow: hidden;
    position: relative;
  }

  /* Subtle grid pattern */
  body::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(56, 189, 248, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(56, 189, 248, 0.03) 1px, transparent 1px);
    background-size: 40px 40px;
  }

  /* Cyan accent glow */
  .glow {
    position: absolute;
    width: 300px;
    height: 300px;
    background: radial-gradient(circle, rgba(56, 189, 248, 0.08) 0%, transparent 70%);
    top: -50px;
    right: 200px;
    border-radius: 50%;
  }

  .content {
    position: relative;
    z-index: 1;
    padding: 72px 80px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 1;
  }

  .name {
    font-size: 52px;
    font-weight: 800;
    letter-spacing: -1px;
    line-height: 1.1;
    margin-bottom: 8px;
  }

  .role {
    font-size: 22px;
    font-weight: 600;
    color: #38bdf8;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 32px;
  }

  .tagline {
    font-size: 22px;
    font-weight: 400;
    color: #94a3b8;
    line-height: 1.5;
    margin-bottom: 40px;
    max-width: 600px;
  }

  .tech-stack {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .tech-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 14px;
    font-weight: 500;
    color: #38bdf8;
    background: rgba(56, 189, 248, 0.08);
    border: 1px solid rgba(56, 189, 248, 0.15);
    padding: 6px 14px;
    border-radius: 6px;
  }

  /* Decorative pipeline nodes on the right */
  .pipeline {
    position: absolute;
    right: 60px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 24px;
    opacity: 0.12;
  }

  .node {
    width: 14px;
    height: 14px;
    border: 2px solid #38bdf8;
    border-radius: 3px;
    position: relative;
  }

  .node.circle { border-radius: 50%; }
  .node.diamond {
    width: 14px;
    height: 14px;
    transform: rotate(45deg);
    border-radius: 2px;
  }

  .edge {
    width: 2px;
    height: 20px;
    background: #38bdf8;
    margin-left: 6px;
  }

  .domain {
    position: absolute;
    bottom: 40px;
    right: 80px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 15px;
    color: #64748b;
    z-index: 1;
  }
</style>
</head>
<body>
  <div class="glow"></div>

  <div class="content">
    <div class="name">Nguyen Minh Duy</div>
    <div class="role">Data Engineer</div>
    <div class="tagline">Building reliable data platforms<br>from ingestion to analytics.</div>
    <div class="tech-stack">
      <span class="tech-tag">Spark</span>
      <span class="tech-tag">Kafka</span>
      <span class="tech-tag">Iceberg</span>
      <span class="tech-tag">Airflow</span>
      <span class="tech-tag">dbt</span>
      <span class="tech-tag">DuckDB</span>
    </div>
  </div>

  <div class="pipeline">
    <div class="node circle"></div>
    <div class="edge"></div>
    <div class="node"></div>
    <div class="edge"></div>
    <div class="node diamond"></div>
    <div class="edge"></div>
    <div class="node circle"></div>
    <div class="edge"></div>
    <div class="node"></div>
  </div>

  <div class="domain">minhduy.dev</div>
</body>
</html>`;

async function main() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: WIDTH, height: HEIGHT });
  await page.setContent(html, { waitUntil: "networkidle0" });

  const buffer = await page.screenshot({ type: "png" });
  const outPath = resolve("public/og.png");
  writeFileSync(outPath, buffer);
  console.log(`Wrote ${outPath} (${buffer.length} bytes)`);

  await browser.close();
}

main();
