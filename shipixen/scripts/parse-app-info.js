const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
const { overrides } = require('../data/config/product-overrides');
const { generateMDXContent } = require('./generate-mdx-content');
const { parseReadme } = require('./parse-readme');
const { sanitizeName } = require('./sanitize-name');
const { outputDir } = require('./settings');
const sharp = require('sharp');

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
      // Get .ico too
      $('link[rel="icon"]').attr('href'),
      $('link[rel="shortcut icon"]').attr('href'),
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

        if (
          headResponse.status === 200 &&
          headResponse.headers['content-type'].startsWith('image/')
        ) {
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
      console.log(`Copied override logo for ${productName} ${app.logo}`);
    }
    if (override.ogImage) {
      const ogImagePath = path.join(appDir, 'og-image.png');
      fs.copyFileSync(
        path.join(__dirname, '..', override.ogImage),
        ogImagePath,
      );
      app.images = [`/static/images/product/${productName}/og-image.png`];
      console.log(`Copied override ogImage for ${productName} ${app.images}`);
    }
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
        (highestResFaviconUrl.endsWith('.png') ||
          highestResFaviconUrl.endsWith('.ico')) &&
        !override?.logo
      ) {
        const logoPath = path.join(appDir, 'logo.png');
        const isValidImage = await downloadImage(
          highestResFaviconUrl,
          logoPath,
        );

        if (isValidImage) {
          if (highestResFaviconUrl.endsWith('.ico')) {
            const icoPath = path.join(appDir, 'logo.png');
            await fs.promises.rename(logoPath, icoPath); // Rename the downloaded file to .ico

            await sharp(icoPath).png().toFile(logoPath); // Convert .ico to .png

            await fs.promises.unlink(icoPath); // Remove the .ico file
          }

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
