'use client';
import EmblaCarousel from './EmblaCarousel';
import { EmblaOptionsType } from 'embla-carousel';
import macApps from 'data/picks/mac-apps';
import { allBlogs, Blog } from 'shipixen-contentlayer/generated';
import { slug } from 'github-slugger';

import './css/embla.css';
import { CoreContent } from '@shipixen/pliny/utils/contentlayer';

const OPTIONS: EmblaOptionsType = { loop: true };

export const Showcase = () => {
  const apps = macApps.apps
    .map((appName) =>
      allBlogs.find((post) => {
        return slug(post.title) === slug(appName);
      }),
    )
    .filter(Boolean) as CoreContent<Blog>[];

  return (
    <>
      <EmblaCarousel apps={apps} options={OPTIONS} />
    </>
  );
};
