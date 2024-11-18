const { applyOverrides } = require('./apply-overrides');
const { sanitizeName } = require('./sanitize-name');
const { markdownDir } = require('./settings');
const fs = require('fs');
const path = require('path');

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

module.exports = { generateMDXContent };
