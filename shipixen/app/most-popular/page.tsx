'use client';
import React, { useMemo } from 'react';
import { allCoreContent } from '@shipixen/pliny/utils/contentlayer';
import { allBlogs } from 'shipixen-contentlayer/generated';
import { PostItem } from '@/components/blog/home/PostItem';
import Footer from '@/components/shared/Footer';
import Header from '@/components/shared/Header';
import { LandingPrimaryTextCtaSection } from '@/components/landing/cta/LandingPrimaryCta';

export default function CategoryPage() {
  const sortedPosts = useMemo(() => {
    return allCoreContent(
      allBlogs.filter(
        (post) => post.leaderboardPosition && post.leaderboardPosition > 0,
      ),
    ).sort((a, b) => {
      if (a.leaderboardPosition && b.leaderboardPosition) {
        return a.leaderboardPosition - b.leaderboardPosition;
      }

      return 0;
    });
  }, []);

  return (
    <div className="flex flex-col w-full items-center">
      <Header className="mb-0 lg:mb-0" />

      <LandingPrimaryTextCtaSection
        title="Top 20 Popular Deals"
        descriptionComponent={
          <p className="max-w-2xl">
            This is what the community loves the most: top 20 apps with the most
            interest on the platform.
          </p>
        }
        textPosition="center"
        withBackground
        className="relative"
        sparklesClassName="-top-12"
      ></LandingPrimaryTextCtaSection>

      <section className="max-w-2xl 2xl:max-w-6xl w-full mt-12 p-6">
        <div className="flex flex-col w-full items-center justify-between">
          <div className="flex flex-col gap-4 w-full">
            <ul className={'grid gap-4'}>
              {sortedPosts.map((post) => (
                <PostItem key={post.slug} post={post} showImage={true} />
              ))}
            </ul>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
