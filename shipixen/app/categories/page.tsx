import { genPageMetadata } from 'app/seo';
import {
  sortPosts,
  allCoreContent,
  CoreContent,
} from '@shipixen/pliny/utils/contentlayer';
import { allBlogs, Blog } from 'shipixen-contentlayer/generated';
import { useMemo } from 'react';

export const metadata = genPageMetadata({
  title: 'Tags',
  description: 'All tags on the site.',
});

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const sortedPosts = sortPosts(allBlogs);
  const posts = allCoreContent(sortedPosts); // not unique
  const categories = useMemo(
    () =>
      posts.reduce(
        (acc, post) => {
          const { categories: postCategories } = post;
          if (postCategories) {
            postCategories.forEach((category) => {
              if (!acc[category]) {
                acc[category] = [];
              }
              acc[category].push(post);
            });
          }
          return acc;
        },
        {} as Record<string, CoreContent<Blog>[]>,
      ),
    [posts],
  );

  // Categories by number of posts
  const sortedCategories = Object.keys(categories).sort(
    (a, b) => categories[b].length - categories[a].length,
  );

  if (!params.category) {
    return <></>;
  }

  return (
    <h2 className="font-semibold fancy-heading text-xs opacity-50">
      Select a category to view deals.
    </h2>
  );
}
