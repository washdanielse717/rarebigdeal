const { overrides } = require('../data/config/product-overrides');

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

function applyCategoryOverrides(category, productName) {
  const overrideTags = overrides[productName]?.tags || [];
  const categoryTagsList = categoryTags[category] || [];
  return [...new Set([...overrideTags, ...categoryTagsList])];
}

function applyMetaOverrides(productName, app) {
  const productOverrides = overrides[productName] || {};

  return {
    description: productOverrides.description || app.description,
    metaDescription: productOverrides.metaDescription || app.metaDescription,
    metaTitle: productOverrides.metaTitle || app.metaTitle,
    website: productOverrides.website || app.website,
    deal: productOverrides.deal || app.deal,
    category: productOverrides.category || app.category,
    subcategory: productOverrides.subcategory || app.subcategory,
    tags: productOverrides.tags || app.tags,
  };
}

module.exports = { applyCategoryOverrides, applyMetaOverrides };
