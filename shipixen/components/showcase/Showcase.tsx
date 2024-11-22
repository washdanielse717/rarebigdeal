'use client';
import EmblaCarousel from './EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import { allBlogs, Blog } from 'shipixen-contentlayer/generated';
import { slug } from 'github-slugger';

import './css/embla.css';
import { CoreContent } from '@shipixen/pliny/utils/contentlayer';

const OPTIONS: EmblaOptionsType = { loop: true };

export const Showcase = ({
  className,
  bundle,
}: {
  className?: string;
  bundle: {
    name: string;
    description: string;
    apps: string[];
  };
}) => {
  const apps = bundle.apps
    .map((appName) =>
      allBlogs.find((post) => {
        return slug(post.title) === slug(appName);
      }),
    )
    .filter(Boolean) as CoreContent<Blog>[];

  return (
    <div className="flex flex-col max-w-4xl 2xl:max-w-7xl w-full">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">{bundle.name}</h2>
        <p className="text-lg mb-8">{bundle.description}</p>
      </div>

      <EmblaCarousel apps={apps} options={OPTIONS} />
    </div>
  );
};
