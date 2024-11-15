const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const sharp = require('sharp'); // Image processing library

const readmePath = '../../README.md';
const outputDir = 'shipixen/public/static/images';

const categoryTags = {
  'Developer Tools': ['Developer', 'Tools', 'macOS'],
  'AI Tools': ['AI', 'Machine Learning', 'Automation'],
  'Other AI tools': ['AI', 'Voice', 'Text to Speech'],
  'Design Tools': ['Design', 'Graphics', 'Marketing'],
  'Code Libraries': ['NextJs', 'React', 'SaaS'],
  'Productivity': ['Productivity', 'Efficiency', 'Tools'],
  'Marketing Tools': ['Marketing', 'SEO', 'Promotion'],
  'SEO Tools': ['SEO', 'Optimization', 'Marketing'],
  'Startup SaaS/Tools': ['Startup', 'SaaS', 'Business'],
  'Themes, Plugins': ['Themes', 'Plugins', 'Customization'],
  'Books': ['Books', 'Learning', 'Programming'],
  'Health and Fitness': ['Health', 'Fitness', 'Wellness']
};

async function downloadImage(url, outputPath) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    fs.writeFileSync(outputPath, response.data);
  } catch (error) {
    console.error(`Failed to download image from ${url}:`, error.message);
  }
}

async function extractAppInfo() {
  const readmeContent = fs.readFileSync(readmePath, 'utf-8');
  const lines = readmeContent.split('\n');
  const apps = [];

  let currentCategory = '';
  let currentSubcategory = '';

  for (const line of lines) {
    if (line.startsWith('## ')) {
      currentCategory = line.replace('## ', '').trim();
    } else if (line.startsWith('### ')) {
      currentSubcategory = line.replace('### ', '').trim();
    } else if (line.startsWith('| ⭐ ')) {
      const parts = line.split('|').map(part => part.trim());
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

  return apps;
}

async function fetchAssets(app) {
  const { website, name } = app;
  const productName = name.replace(/\s+/g, '-').toLowerCase();
  const appDir = path.join(outputDir, 'product', productName);
  fs.mkdirSync(appDir, { recursive: true });

  try {
    const response = await axios.get(website);
    const $ = cheerio.load(response.data);

    const faviconUrl = $('link[rel="icon"]').attr('href') || $('link[rel="shortcut icon"]').attr('href');
    const ogImageUrl = $('meta[property="og:image"]').attr('content');

    if (faviconUrl) {
      const faviconPath = path.join(appDir, 'logo.png');
      const faviconExt = path.extname(faviconUrl).toLowerCase();

      if (faviconExt === '.ico') {
        try {
          const icoBuffer = await axios.get(new URL(faviconUrl, website).href, { responseType: 'arraybuffer' });
          const pngBuffer = await sharp(icoBuffer.data).png().toBuffer();
          fs.writeFileSync(faviconPath, pngBuffer);
        } catch (error) {
          console.warn(`Unsupported image format for favicon at ${faviconUrl}:`, error.message);
        }
      } else {
        await downloadImage(new URL(faviconUrl, website).href, faviconPath);
      }
      app.logo = faviconPath;
    }

    if (ogImageUrl) {
      const ogImagePath = path.join(appDir, 'og-image.png');
      await downloadImage(new URL(ogImageUrl, website).href, ogImagePath);
      app.images = [ogImagePath];
    }
  } catch (error) {
    console.error(`Failed to fetch assets for ${name}:`, error.message);
  }
}

async function generateMarkdown(apps) {
  const markdownDir = path.join(__dirname, 'markdown');
  fs.mkdirSync(markdownDir, { recursive: true });

  for (const app of apps) {
    try {
      console.log(`👉 Generating markdown for ${app.name}`);
      const tagsList = (categoryTags[app.category] || []).map(tag => `  - '${tag}'`).join('\n');
      const productName = app.name.replace(/\s+/g, '-').toLowerCase();
      const imagePath = `/static/images/product/${productName}`;

      const markdownContent = `---
title: '${app.name}'
date: '${new Date().toISOString().split('T')[0]}'
tags:
${tagsList}
images:
  - '${app.images ? `${imagePath}/og-image.png` : ''}'
logo: '${app.logo ? `${imagePath}/logo.png` : ''}'
summary: '${app.description}'
category: '${app.category}'
deal: '${app.deal}'
subcategory: '${app.subcategory}'
website: '${app.website}'
layout: PostLayout
---

## [${app.name}](${app.website})

${app.name} <br/>
${app.description}

## Rare Deal

${app.deal}
`;

      const markdownOutputPath = path.join(markdownDir, `${productName}.mdx`);
      fs.writeFileSync(markdownOutputPath, markdownContent);
    } catch (error) {
      console.error(`💥 Could not generate markdown for ${app.name}:`, error.message);
    }
  }
}

async function main() {
  const apps = await extractAppInfo();

  for (const app of apps) {
    await fetchAssets(app);
  }

  await generateMarkdown(apps);
}

main().catch(error => {
  console.error('Error:', error.message);
});
