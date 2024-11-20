const {
  applyCategoryOverrides,
  applyMetaOverrides,
} = require('./apply-overrides');
const { sanitizeName } = require('./sanitize-name');
const { markdownDir } = require('./settings');
const fs = require('fs');
const path = require('path');

async function generateMDXContent(app) {
  const tags = applyCategoryOverrides(app.categories, sanitizeName(app.name));
  const { description, metaDescription, metaTitle, website, deal } =
    applyMetaOverrides(sanitizeName(app.name), app);

  let mdxContent = `---
title: >
  ${app.name?.trim()}
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
  ${description?.trim()}
categories:
${(app.categories || []).map((category) => `  - ${category}`).join('\n')}
subcategories:
${(app.subcategories || [])
  .map((subcategory) => `  - ${subcategory}`)
  .join('\n')}
category: ${app.category}
deal: >
  ${deal?.trim()}
subcategory: ${app.subcategory}
website: ${website}
layout: ProductLayout
`;

  if (metaDescription) {
    mdxContent += `metaDescription: >
  ${metaDescription}
`;
  }

  if (metaTitle) {
    mdxContent += `metaTitle: >
  ${metaTitle}
`;
  }

  mdxContent += `---
${description}

## Rare Deal

${deal}
`;

  if (metaTitle || metaDescription) {
    mdxContent += `
## Product Details
${metaTitle || ''}

${metaDescription || ''}
`;
  }

  const markdownOutputPath = path.join(
    markdownDir,
    `${sanitizeName(app.name)}.mdx`,
  );
  fs.writeFileSync(markdownOutputPath, mdxContent);
}

module.exports = { generateMDXContent };
