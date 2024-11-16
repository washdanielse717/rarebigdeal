const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { overrides } = require('../data/config/product-overrides');

const readmePath = '../../README.md';
const outputDir = '../public/static/images';
const markdownDir = '../data/products';

const categoryTags = {
  'Developer Tools': ['Developer', 'Tools', 'macOS'],
  'AI Tools': ['AI', 'Machine Learning', 'Automation'],
  'Other AI tools': ['AI', 'Voice', 'Text to Speech'],
  'Design Tools': ['Design', 'Graphics', 'Marketing'],
  'Code Libraries': ['NextJs', 'React', 'SaaS'],
  Productivity: ['Productivity', 'Efficiency', 'Tools'],
  'Marketing Tools': ['Marketing', 'SEO', 'Promotion'],
  'SEO Tools': ['SEO', 'Optimization', 'Marketing'],
  'Startup SaaS/Tools': ['Startup', 'SaaS', 'Business'],
  'Themes, Plugins': ['Themes', 'Plugins', 'Customization'],
  Books: ['Books', 'Learning', 'Programming'],
  'Health and Fitness': ['Health', 'Fitness', 'Wellness'],
};

function applyOverrides(category) {
  return overrides[category] || categoryTags[category] || [];
}

function sanitizeName(name) {
  return name
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}

async function downloadImage(url, outputPath) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    fs.writeFileSync(outputPath, response.data);
  } catch (error) {
    console.error(`Failed to download image from ${url}:`, error.message);
  }
}

async function fetchWebsiteData(website) {
  try {
    const response = await axios.get(website);
    const $ = cheerio.load(response.data);

    let faviconUrl =
      $('link[rel="icon"]').attr('href') ||
      $('link[rel="shortcut icon"]').attr('href');
    let ogImageUrl = $('meta[property="og:image"]').attr('content');

    // Ensure the URLs are absolute
    if (faviconUrl && !faviconUrl.startsWith('http')) {
      faviconUrl = new URL(faviconUrl, website).href;
    }
    if (ogImageUrl && !ogImageUrl.startsWith('http')) {
      ogImageUrl = new URL(ogImageUrl, website).href;
    }

    // Try to find the highest resolution PNG favicon
    const possibleFaviconUrls = [
      $('link[rel="apple-touch-icon"]').attr('href'),
      $('link[rel="icon"][type="image/png"]').attr('href'),
      '/favicon-32x32.png',
      '/favicon-16x16.png',
      '/apple-touch-icon.png',
      '/favicon.png',
    ]
      .filter(Boolean)
      .map((url) => new URL(url, website).href);

    let highestResFaviconUrl = null;
    for (const url of possibleFaviconUrls) {
      try {
        const response = await axios.head(url);
        if (response.status === 200) {
          highestResFaviconUrl = url;
          break;
        }
      } catch (error) {
        console.warn(`Favicon URL not found: ${url}`);
      }
    }

    return { ogImageUrl, highestResFaviconUrl };
  } catch (error) {
    console.error(`Failed to fetch website data:`, error.message);
    return {};
  }
}

async function fetchAssets(app) {
  const { website, name } = app;
  const productName = sanitizeName(name);
  const appDir = path.join(outputDir, 'product', productName);
  fs.mkdirSync(appDir, { recursive: true });

  const override = overrides[productName];

  if (override) {
    if (override.logo) {
      const logoPath = path.join(appDir, 'logo.png');
      fs.copyFileSync(path.join(__dirname, '..', override.logo), logoPath);
      app.logo = logoPath;
    }
    if (override.ogImage) {
      const ogImagePath = path.join(appDir, 'og-image.png');
      fs.copyFileSync(
        path.join(__dirname, '..', override.ogImage),
        ogImagePath,
      );
      app.images = [ogImagePath];
    }
    return;
  }

  try {
    const response = await axios.get(website);
    const $ = cheerio.load(response.data);

    let faviconUrl =
      $('link[rel="icon"]').attr('href') ||
      $('link[rel="shortcut icon"]').attr('href');
    let ogImageUrl = $('meta[property="og:image"]').attr('content');

    // Ensure the URLs are absolute
    if (faviconUrl && !faviconUrl.startsWith('http')) {
      faviconUrl = new URL(faviconUrl, website).href;
    }
    if (ogImageUrl && !ogImageUrl.startsWith('http')) {
      ogImageUrl = new URL(ogImageUrl, website).href;

      const ogImagePath = path.join(appDir, 'og-image.png');
      await downloadImage(ogImageUrl, ogImagePath);
      app.images = [ogImagePath];
    }

    if (faviconUrl && faviconUrl.endsWith('.png')) {
      const faviconPath = path.join(appDir, 'favicon.png');
      await downloadImage(faviconUrl, faviconPath);
      app.logo = faviconPath;
    }
  } catch (error) {
    console.error(`Failed to fetch assets for ${app.name}:`, error.message);
  }
}

async function generateMDXContent(app) {
  const tags = applyOverrides(app.category);

  let mdxContent = `---
title: >
  ${app.name}
date: ${new Date().toISOString().split('T')[0]}
tags:
${tags.map((tag) => `  - ${tag}`).join('\n')}
`;

  if (app.images && app.images.length > 0) {
    mdxContent += `images:
  - /static/images/product/${sanitizeName(app.name)}/og-image.png
`;
  }

  if (app.logo) {
    mdxContent += `logo: /static/images/product/${sanitizeName(app.name)}/logo.png
`;
  }

  mdxContent += `summary: >
  ${app.description}
category: ${app.category}
deal: ${app.deal}
subcategory: ${app.subcategory}
website: ${app.website}
layout: PostLayout
---

## [${app.name}](${app.website})

${app.name} <br/>
${app.description}

## Rare Deal

${app.deal}
`;

  const markdownOutputPath = path.join(
    markdownDir,
    `${sanitizeName(app.name)}.mdx`,
  );
  fs.writeFileSync(markdownOutputPath, mdxContent);
}

async function parseReadme() {
  const readmeContent = fs.readFileSync(readmePath, 'utf-8');
  const lines = readmeContent.split('\n');

  let currentCategory = '';
  let currentSubcategory = '';
  const apps = [];

  for (const line of lines) {
    if (line.startsWith('## ')) {
      currentCategory = line.replace('## ', '').trim();
    } else if (line.startsWith('### ')) {
      currentSubcategory = line.replace('### ', '').trim();
    } else if (line.startsWith('|')) {
      const parts = line.split('|').map((part) => part.trim());
      if (parts.length >= 5 && parts[2].startsWith('[')) {
        const name = parts[2].match(/\[(.*?)\]/)[1];
        const website = parts[2].match(/\((.*?)\)/)[1];
        const description = parts[3];
        const deal = parts[4];

        apps.push({
          name,
          website,
          description,
          deal,
          category: currentCategory,
          subcategory: currentSubcategory,
        });
      }
    }
  }

  return apps;
}

async function main() {
  const apps = await parseReadme();

  const fetchPromises = apps.map(async (app) => {
    try {
      await fetchAssets(app);
      await generateMDXContent(app);
    } catch (error) {
      console.error(
        `💥 Could not generate markdown for ${app.name}:`,
        error.message,
      );
    }
  });

  await Promise.allSettled(fetchPromises);
}

main();
