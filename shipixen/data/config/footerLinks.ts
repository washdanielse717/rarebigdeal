export const footerLinks: Array<{
  columnName: string;
  links: Array<{
    href: string;
    title: string;
  }>;
}> = [
  {
    columnName: 'Popular Categories',
    links: [
      {
        href: '/categories/design-tools',
        title: 'Design Tools',
      },
      {
        href: '/categories/seo-tools',
        title: 'SEO Tools',
      },
      {
        href: '/categories/health-and-fitness',
        title: 'Health and Fitness',
      },
      {
        href: '/categories/finance',
        title: 'Finance',
      },
      {
        href: '/categories/mailing-lists-newsletters--blogs',
        title: 'Mailing Lists & Newsletters',
      },
      {
        href: '/categories/productized-services',
        title: 'Productized Services',
      },
      {
        href: '/categories/miscellaneous',
        title: 'Miscellaneous',
      },
    ],
  },

  {
    columnName: 'Categories',
    links: [
      {
        href: '/categories/developer-tools',
        title: 'Developer Tools',
      },
      {
        href: '/categories/ai-tools',
        title: 'AI Tools',
      },
      {
        href: '/categories/macos-apps',
        title: 'MacOS Apps',
      },
      {
        href: '/categories/ios-apps',
        title: 'iOS Apps',
      },

      {
        href: '/categories/productivity',
        title: 'Productivity',
      },
      {
        href: '/categories/marketing',
        title: 'Marketing',
      },

      {
        href: '/categories/boilerplates-starters--libraries',
        title: 'Boilerplates & Libraries',
      },
      {
        href: '/categories/learning',
        title: 'Learning',
      },
    ],
  },

  {
    columnName: 'Company',
    links: [
      { href: '/', title: 'Home' },
      { href: '/categories', title: 'All Categories' },
      { href: '/handpicked-deals', title: 'Popular' },
      { href: '/all-deals', title: 'All Deals' },
      {
        href: 'https://github.com/danmindru/rare-big-deal/issues/130',
        title: 'Submit',
      },
    ],
  },
  {
    columnName: 'Support',
    links: [
      {
        href: 'https://github.com/danmindru/rare-big-deal/issues/132',
        title: 'Creating a Bundle',
      },
      {
        href: 'https://github.com/danmindru/rare-big-deal/issues/131',
        title: 'Adding custom metadata',
      },
      { href: '/terms', title: 'Terms of Service' },
      { href: '/privacy', title: 'Privacy Policy' },
    ],
  },
];
