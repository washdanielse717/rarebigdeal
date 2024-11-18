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

function applyOverrides(category, productName) {
  const overrideTags = overrides[productName]?.tags || [];
  const categoryTagsList = categoryTags[category] || [];
  return [...new Set([...overrideTags, ...categoryTagsList])];
}

module.exports = { applyOverrides };
