export const footerLinks: Array<{
  columnName: string;
  links: Array<{
    href: string;
    title: string;
  }>;
}> = [
  {
    columnName: 'Company',
    links: [
      { href: '/', title: 'Home' },
      { href: '/categories', title: 'All Categories' },
      { href: '/all-deals', title: 'All Deals' },
      { href: '/all-deals', title: 'Blog' },
    ],
  },
  {
    columnName: 'Support',
    links: [
      { href: '/terms', title: 'Terms of Service' },
      { href: '/privacy', title: 'Privacy Policy' },
    ],
  },
  {
    columnName: 'Categories',
    links: [
      {
        href: '/categories/productivity',
        title: 'Productivity Deals',
      },
      {
        href: '/categories/boilerplates-startup-saastools',
        title: 'Boilerplates, Startup SaaS/Tools Deals',
      },
      {
        href: '/categories/ai-tools',
        title: 'AI Tool Deals',
      },
      {
        href: '/categories/marketing-tools',
        title: 'Marketing Tool Deals',
      },
      {
        href: '/categories/design-tools',
        title: 'Design Tool Deals',
      },
      {
        href: '/categories/developer-tools',
        title: 'Developer Tool Deals',
      },
      {
        href: '/categories/seo-tools',
        title: 'SEO Tool Deals',
      },
      { href: '/categories/courses', title: 'Course Deals' },
      {
        href: '/categories/health-and-fitness',
        title: 'Health and Fitness Deals',
      },
      {
        href: '/categories/other-ai-tools',
        title: 'Other AI tool Deals',
      },
      {
        href: '/categories/themes-plugins',
        title: 'Themes, Plugin Deals',
      },
      {
        href: '/categories/data-tools',
        title: 'Data Tool Deals',
      },
      { href: '/categories/books', title: 'Book Deals' },
      {
        href: '/categories/code-libraries',
        title: 'Code Library Deals',
      },
      {
        href: '/categories/video-tools',
        title: 'Video Tools Deals',
      },
    ],
  },
];
