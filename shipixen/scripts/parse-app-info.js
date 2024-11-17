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

function applyOverrides(category, productName) {
  const overrideTags = overrides[productName]?.tags || [];
  const categoryTagsList = categoryTags[category] || [];
  return [...new Set([...overrideTags, ...categoryTagsList])];
}

function sanitizeName(name) {
  return name
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
}

async function downloadImage(url, outputPath) {
  try {
    const response = await axios.get(url, {
      responseType: 'arraybuffer',
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
      validateStatus: (status) => status < 400,
    });

    console.log(`HTTP status code for ${url}: ${response.status}`);

    const contentType = response.headers['content-type'];
    console.log(`Content-Type for ${url}: ${contentType}`);

    if (contentType && contentType.startsWith('image/')) {
      fs.writeFileSync(outputPath, response.data);
      console.log(`Downloaded image from ${url} to ${outputPath}`);
      return true;
    } else {
      console.error(
        `Invalid image type from ${url}. Detected Content-Type: ${contentType}`,
      );
      return false;
    }
  } catch (error) {
    console.error(`Failed to download image from ${url}:`, error.message);
    return false;
  }
}

async function fetchWebsiteData(website) {
  let description = '';
  let title = '';

  try {
    const response = await axios.get(website, {
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });
    const $ = cheerio.load(response.data);

    let faviconUrl =
      $('link[rel="icon"]').attr('href') ||
      $('link[rel="shortcut icon"]').attr('href');
    let ogImageUrl = $('meta[property="og:image"]').attr('content');

    description = $('meta[name="description"]').attr('content');
    title = $('title').text() || $('meta[property="og:title"]').attr('content');

    // Log the extracted title
    console.log(`Extracted title for ${website}:`, title);

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
        const headResponse = await axios.head(url, {
          headers: {
            'User-Agent': 'Mozilla/5.0',
          },
          validateStatus: (status) => status < 400,
        });
        if (headResponse.status === 200) {
          highestResFaviconUrl = url;
          break;
        }
      } catch (error) {
        console.warn(`Favicon URL not found: ${url}`);
      }
    }

    return { ogImageUrl, highestResFaviconUrl, description, title };
  } catch (error) {
    console.error(`Failed to fetch website data:`, error.message);
    return {
      ogImageUrl: null,
      highestResFaviconUrl: null,
      description,
      title,
    };
  }
}

async function fetchAssets(app) {
  const { website, name } = app;
  const productName = sanitizeName(name);
  const appDir = path.join(outputDir, 'product', productName);
  fs.mkdirSync(appDir, { recursive: true });

  const override = overrides[productName];

  if (override) {
    console.log(`Applying overrides for ${productName}`);
    if (override.logo) {
      const logoPath = path.join(appDir, 'logo.png');
      fs.copyFileSync(path.join(__dirname, '..', override.logo), logoPath);
      app.logo = `/static/images/product/${productName}/logo.png`;
      console.log(`Copied override logo for ${productName}`);
    }
    if (override.ogImage) {
      const ogImagePath = path.join(appDir, 'og-image.png');
      fs.copyFileSync(
        path.join(__dirname, '..', override.ogImage),
        ogImagePath,
      );
      app.images = [`/static/images/product/${productName}/og-image.png`];
      console.log(`Copied override ogImage for ${productName}`);
    }
    // Apply other overrides if any
    Object.assign(app, override);
  }

  if (!override || !override.logo || !override.ogImage) {
    try {
      console.log(`Fetching website data for ${productName}`);
      const { ogImageUrl, highestResFaviconUrl, description, title } =
        await fetchWebsiteData(website);

      // Log the fetched title
      console.log(`Fetched title for ${productName}:`, title);

      app.metaDescription = description;
      app.metaTitle = title;

      if (ogImageUrl && !override?.ogImage) {
        const ogImagePath = path.join(appDir, 'og-image.png');
        const isValidImage = await downloadImage(ogImageUrl, ogImagePath);
        if (isValidImage) {
          app.images = [`/static/images/product/${productName}/og-image.png`];
        }
      }

      if (
        highestResFaviconUrl &&
        highestResFaviconUrl.endsWith('.png') &&
        !override?.logo
      ) {
        const logoPath = path.join(appDir, 'logo.png');
        const isValidImage = await downloadImage(
          highestResFaviconUrl,
          logoPath,
        );
        if (isValidImage) {
          app.logo = `/static/images/product/${productName}/logo.png`;
        }
      } else {
        // Check if logo already exists in the directory
        const existingLogoPath = path.join(appDir, 'logo.png');
        if (fs.existsSync(existingLogoPath)) {
          app.logo = `/static/images/product/${productName}/logo.png`;
          console.log(`Using existing logo for ${productName}`);
        }
      }
    } catch (error) {
      console.error(`Failed to fetch assets for ${app.name}:`, error.message);

      // Check if logo already exists in the directory
      const existingLogoPath = path.join(appDir, 'logo.png');
      if (fs.existsSync(existingLogoPath)) {
        app.logo = `/static/images/product/${productName}/logo.png`;
        console.log(`Using existing logo for ${productName}`);
      }
    }
  }
}

async function generateMDXContent(app) {
  const tags = applyOverrides(app.category, sanitizeName(app.name));

  let mdxContent = `---
title: >
  ${app.name}
date: ${new Date().toISOString().split('T')[0]}
tags:
${tags.map((tag) => `  - ${tag}`).join('\n')}
`;

  if (app.images && app.images.length > 0) {
    mdxContent += `images:
  - ${app.images[0]}
`;
  }

  if (app.logo) {
    mdxContent += `logo: ${app.logo}
`;
  }

  mdxContent += `summary: >
  ${app.description}
category: ${app.category}
deal: >
  ${app.deal}
subcategory: ${app.subcategory}
website: ${app.website}
layout: ProductLayout
`;

  if (app.metaDescription) {
    mdxContent += `metaDescription: >
  ${app.metaDescription}
`;
  }

  if (app.metaTitle) {
    mdxContent += `metaTitle: >
  ${app.metaTitle}
`;
  }

  mdxContent += `---
${app.description}

## Rare Deal

${app.deal}
`;

  if (app.metaTitle || app.metaDescription) {
    mdxContent += `## Product Details
${app.metaTitle || ''}

${app.metaDescription || ''}
`;
  }

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
