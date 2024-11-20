import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { slug as githubSlugger } from 'github-slugger';
import { ExternalLinkIcon } from 'lucide-react';
import {
  CoreContent,
  allCoreContent,
} from '@shipixen/pliny/utils/contentlayer';
import { allBlogs } from 'shipixen-contentlayer/generated';

import type { Blog, Authors } from 'shipixen-contentlayer/generated';
import Link from '@/components/shared/Link';
import Header from '@/components/shared/Header';
import Image from '@/components/shared/Image';
import Tag from '@/components/blog/Tag';
import { siteConfig } from '@/data/config/site.settings';
import ScrollTop from '@/components/shared/ScrollTop';
import { hashStringToColor } from '@/components/shared/util/hash-string-color';
import clsx from 'clsx';
import { PostItem } from '@/components/blog/home/PostItem'; // Import PostItem

const postDateTemplate: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

interface LayoutProps {
  className?: string;
  content: CoreContent<Blog>;
  authorDetails: CoreContent<Authors>[];
  children: ReactNode;
}

export default function PostLayout({
  className,
  content,
  authorDetails,
  children,
}: LayoutProps) {
  const { path, slug, date, title, tags, logo, website, category } = content;
  const firstImage = content.images?.[0];
  const tintColor = hashStringToColor(title);
  const fallbackImage = '/static/images/logo.png';

  const allProducts = allCoreContent(allBlogs);

  const getRecommendedProducts = () => {
    const sameCategoryProducts = allProducts.filter(
      (product) => product.category === category && product.slug !== slug,
    );
    const otherProducts = allProducts.filter(
      (product) => product.category !== category && product.slug !== slug,
    );

    const recommendations = [
      ...sameCategoryProducts.slice(0, 5),
      ...otherProducts.slice(0, 5),
    ];

    return recommendations;
  };

  const recommendedProducts = getRecommendedProducts();

  return (
    <div className="flex flex-col w-full items-center">
      <Header />

      <div
        className={cn(
          'flex p-6 items-center fancy-overlay fancy-overlay--muted',
          className,
        )}
      >
        <ScrollTop />
        <article className="container-narrow">
          <header className="pt-6 -mt-12 lg:-mt-16">
            <div className="space-y-1 text-center">
              <div className="flex flex-col items-center">
                <div className="flex gap-4 w-auto bg-white/80 dark:bg-black/80 relative backdrop-blur-xl rounded-lg py-4 px-6 items-center">
                  {logo ? (
                    <Image
                      aria-hidden="true"
                      className="absolute w-full h-full left-0 top-0 -z-100 opacity-20 dark:opacity-20 saturate-200 dark:saturate-[3] blur-2xl bg-cover"
                      src={logo}
                      alt={title}
                      width={200}
                      height={200}
                    />
                  ) : (
                    <div
                      className="absolute w-full h-full left-0 top-0 -z-100 opacity-20 dark:opacity-20 saturate-200 dark:saturate-[3] blur-2xl bg-cover"
                      style={{
                        backgroundImage: `url(${fallbackImage})`,
                        backgroundColor: tintColor,
                      }}
                    />
                  )}

                  <figure
                    className={clsx(
                      'w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 flex-shrink-0 rounded-lg overflow-hidden bg-white/50 dark:bg-black/50',
                    )}
                  >
                    {logo ? (
                      <Image
                        src={logo}
                        alt="Product Thumbnail"
                        width={200}
                        height={200}
                        className="dark:bg-white/20"
                      />
                    ) : (
                      <div
                        className="w-full h-full"
                        style={{
                          backgroundImage: `url(${fallbackImage})`,
                          backgroundColor: tintColor,
                        }}
                      />
                    )}
                  </figure>
                  <h1 className="text-xl md:text-2xl lg:text-4xl font-light">
                    {title}
                  </h1>
                </div>

                {firstImage && (
                  <Image
                    src={firstImage}
                    alt={title}
                    width={1240}
                    height={640}
                    className="bg-white rounded-t-lg w-full h-auto relative -mt-12 -z-10"
                  />
                )}
              </div>
            </div>
          </header>

          <div className="container-narrow">
            <div className="lg:bg-white dark:lg:bg-slate-900 lg:px-10 lg:py-4 divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 items-center"
                >
                  <h2 className="text-3xl m-0 p-0">{title} website</h2>
                  <ExternalLinkIcon className="w-6 h-6" />
                </a>
                {children}
              </div>
            </div>
          </div>

          <section>
            <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
              {tags && (
                <div className="py-4 xl:py-8">
                  <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Tags
                  </h2>
                  <div className="flex flex-wrap">
                    {tags.map((tag) => (
                      <Tag key={tag} text={tag} />
                    ))}
                  </div>
                  <a
                    href="/tags"
                    className="inline-block mt-2 text-xs capitalize font-medium text-primary-500 hover:text-primary-700 dark:hover:text-primary-400"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    All tags
                    <ExternalLinkIcon className="ml-1 inline-block w-3 h-3" />
                  </a>
                </div>
              )}

              <div className="py-4 xl:py-8">
                <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                  Recommended Products
                </h2>
                <div className="flex flex-wrap">
                  {recommendedProducts.map((product) => (
                    <div key={product.slug} className="w-full p-2">
                      <PostItem post={product} showImage={true} />{' '}
                      {/* Use PostItem */}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4 xl:pt-8">
                <Link
                  href={'/categories/' + githubSlugger(category)}
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label={`More ${category} Deals`}
                >
                  More deals in {category} ✨
                </Link>

                <Link
                  href={siteConfig.allArticlesPath}
                  className="ml-auto text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label={'All Deals'}
                >
                  All Deals &rarr;
                </Link>
              </div>
            </div>
          </section>

          <footer className="mt-8">
            <dl className="pb-10 pt-6 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex flex-wrap gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  {authorDetails.map((author) => (
                    <li
                      className="flex items-center space-x-2"
                      key={author.name}
                    >
                      {author.avatar && (
                        <Image
                          src={author.avatar}
                          width={38}
                          height={38}
                          alt="avatar"
                          className="h-10 w-10 rounded-full"
                        />
                      )}
                      <dl className="whitespace-nowrap text-sm font-medium leading-5">
                        <dt className="sr-only">Name</dt>
                        <dd className="text-gray-900 dark:text-gray-100">
                          {author.name}
                        </dd>
                        <dt className="sr-only">Twitter</dt>
                        <dd>
                          {author.twitter && (
                            <Link
                              href={author.twitter}
                              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            >
                              {author.twitter.replace(
                                'https://twitter.com/',
                                '@',
                              )}
                            </Link>
                          )}
                        </dd>
                      </dl>
                    </li>
                  ))}
                </ul>
              </dd>

              <dt className="text-xs mt-8">Published on</dt>
              <dd className="text-xs font-medium leading-6 text-gray-500 dark:text-gray-400">
                <time dateTime={date}>
                  {new Date(date).toLocaleDateString(
                    siteConfig.locale,
                    postDateTemplate,
                  )}
                </time>
              </dd>
            </dl>
          </footer>
        </article>
      </div>
    </div>
  );
}
