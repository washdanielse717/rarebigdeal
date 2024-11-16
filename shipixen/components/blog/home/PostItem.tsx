'use client';
import React, { useState } from 'react';
import clsx from 'clsx';
import { CoreContent } from '@shipixen/pliny/utils/contentlayer';
import { Blog } from 'shipixen-contentlayer/generated';
import { formatDate } from '@shipixen/pliny/utils/formatDate';
import { siteConfig } from '@/data/config/site.settings';
import Link from '@/components/shared/Link';
import Tag from '@/components/blog/Tag';
import Image from '@/components/shared/Image';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { InteractiveStatCard } from '@/components/shared/InteractiveStatCard';
import { StatCardButtonHoverComponent } from '@/components/shared/StatCardButtonHoverComponent';
import { cn } from '@/lib/utils';
import ReactMarkdown from 'react-markdown';

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
    <InteractiveStatCard
      href={slug}
      disabled={false}
      hoverComponent={
        <StatCardButtonHoverComponent
          subtitle={
            `${summary?.slice(0, 60)}${
              summary?.length && summary?.length > 60 ? '...' : ''
            }` || 'Read more'
          }
        />
      }
      bgBlurStrength="none"
      shadowStrength="none"
      className={clsx(
        'group !py-1 !border-none !bg-white-100/80 dark:!bg-black/50 !min-h-0',
      )}
    >
      <div className="w-full px-3 py-1">
        {logo || images[0] ? (
          <Image
            aria-hidden="true"
            className="absolute w-full h-full left-0 top-0 -z-100 opacity-20 dark:opacity-20 saturate-200 dark:saturate-[3] blur-2xl bg-cover"
            src={logo || images[0]}
            alt={title}
            width={200}
            height={200}
          />
        ) : null}

        <section className={clsx('w-full flex items-center gap-2')}>
          <div className="absolute top-0 left-1 h-4 flex items-center justify-center opacity-30">
            <span className="text-[8px]">1</span>
          </div>

          <div className="flex gap-2 items-center truncate">
            <figure
              className={clsx(
                'w-8 h-8 flex-shrink-0 rounded-lg overflow-hidden bg-white/50 dark:bg-black/50 border-1 border-solid border-white dark:border-black',
              )}
            >
              {logo || images[0] ? (
                <Image
                  src={logo || images[0]}
                  alt="Product Thumbnail"
                  width={200}
                  height={200}
                />
              ) : null}
            </figure>

            <div className="w-full h-full flex flex-col justify-between gap-1 dark:text-slate-300 truncate">
              <p className="text-xs sm:text-sm truncate">{title}</p>

              {/* {index === 0 ? (
                    <Typography className="mb-4 truncate">
                      {post.tagline}
                    </Typography>
                  ) : null} */}
            </div>
          </div>

          <div className="flex-shrink-0 ml-auto flex gap-2 tabular-nums">
            <span
              className={cn(
                'flex-col flex gap-1 items-center text-xs p-2 min-w-[40px]',
              )}
            >
              <ReactMarkdown className="text-gray-900 dark:text-gray-100">
                {deal}
              </ReactMarkdown>
            </span>
          </div>
        </section>
      </div>
    </InteractiveStatCard>
  );
}
