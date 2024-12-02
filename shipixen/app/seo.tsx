import { Metadata } from 'next';
import { siteConfig } from '@/data/config/site.settings';

interface PageSEOProps {
  title: string;
  description?: string;
  image?: string;
  canonical?: string;
  deal?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export function genPageMetadata({
  title,
  description,
  image,
  canonical,
  metaTitle,
  deal,
  ...rest
}: PageSEOProps): Metadata {
  const seoTitle = deal
    ? `${title} | ${deal}`
    : `${title} | ${siteConfig.title}`;

  const seoDescription = description
    ? `${description}. ${rest.tile} Deals, Black Friday, Cyber Monday, Lifetime Deals, and more.`
    : siteConfig.description;

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title,
      description: description || siteConfig.description,
      url: './',
      siteName: siteConfig.title,
      images: image ? [image] : [siteConfig.socialBanner],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: `${title} | ${siteConfig.title}`,
      card: 'summary_large_image',
      images: image ? [image] : [siteConfig.socialBanner],
    },
    ...(canonical
      ? {
          alternates: {
            canonical,
          },
        }
      : {}),
    ...rest,
  };
}
