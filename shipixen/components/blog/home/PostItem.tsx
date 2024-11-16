'use client';
import { useState } from 'react';
import Link from '@/components/shared/Link';
import Tag from '@/components/blog/Tag';
import { siteConfig } from '@/data/config/site.settings';
import { formatDate } from '@shipixen/pliny/utils/formatDate';
import { allBlogs, Blog } from 'shipixen-contentlayer/generated';
import Image from '@/components/shared/Image';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { CoreContent } from '@shipixen/pliny/utils/contentlayer';

export function PostItem({
  post,
  showImage,
}: {
  post: CoreContent<Blog>;
  showImage: boolean;
}) {
  const {
    path,
    slug,
    date,
    title,
    summary,
    tags,
    images,
    logo,
    deal,
    website,
  } = post;
  const firstImage = images?.[0];
  const [showDescription, setShowDescription] = useState(false);

  return (
    <li
      key={slug}
      className="flex flex-col md:bg-white dark:md:bg-black rounded-md overflow-hidden relative md:shadow-sm md:hover:shadow-xl dark:md:hover:bg-slate-800 transition-all"
    >
      {showImage && firstImage ? (
        <div className="hidden lg:flex relative w-52 shrink-0 h-auto">
          <Image
            src={firstImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 80vw, 100vw"
          />
        </div>
      ) : (
        ''
      )}

      {firstImage && (
        <div className="absolute left-0 top-0">
          <Image
            src={firstImage}
            alt={title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 80vw, 100vw"
          />
        </div>
      )}

      <article className="flex flex-col gap-2 py-5 md:p-8">
        <Link
          href={`/${path}`}
          className="text-gray-900 dark:text-gray-100 absolute left-0 top-0 w-full h-full"
        >
          <span className="sr-only">Read more about {title}</span>
        </Link>

        <div className="space-y-3">
          <div>
            <h2 className="text-3xl leading-8 tracking-tight">{title}</h2>

            <dl>
              <dt className="sr-only">Published on</dt>
              <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                <time dateTime={date}>
                  {formatDate(date, siteConfig.locale)}
                </time>
              </dd>
            </dl>
          </div>
          <div className="text-lg font-semibold text-red-500">{deal}</div>
        </div>

        <div className="flex flex-wrap relative">
          {tags?.map((tag) => <Tag key={tag} text={tag} />)}
        </div>

        {logo && (
          <div className="mt-2">
            <Image
              src={logo}
              alt={`${title} logo`}
              width={50}
              height={50}
              className="object-contain"
            />
          </div>
        )}

        {website && (
          <div className="mt-2">
            <Link
              href={website}
              className="text-blue-500 hover:underline flex items-center"
            >
              Visit Website <ExternalLink className="ml-1" />
            </Link>
          </div>
        )}

        <button
          onClick={() => setShowDescription(!showDescription)}
          className="mt-2 text-blue-500 hover:underline flex items-center"
        >
          {showDescription ? 'Hide Description' : 'Show Description'}
          {showDescription ? (
            <ChevronUp className="ml-1" />
          ) : (
            <ChevronDown className="ml-1" />
          )}
        </button>

        {showDescription && (
          <div className="mt-2 text-gray-700 dark:text-gray-300">{summary}</div>
        )}
      </article>
    </li>
  );
}
