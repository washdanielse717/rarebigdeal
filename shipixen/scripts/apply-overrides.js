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

function applyCategoryOverrides(categories, productName) {
  const overrideTags = overrides[productName]?.tags || [];
  const categoryTagsList = (categories || []).reduce((acc, category) => {
    const tags = categoryTags[category] || [];
    return acc.concat(tags);
  }, []);
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
    categories: productOverrides.categories || app.categories,
    subcategories: productOverrides.subcategories || app.subcategories,
  };
}

module.exports = { applyCategoryOverrides, applyMetaOverrides };
