'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import Link from '@/components/shared/Link';
import { siteConfig } from '@/data/config/site.settings';
import NewsletterForm from '@shipixen/pliny/ui/NewsletterForm';
import {
  sortPosts,
  allCoreContent,
  CoreContent,
} from '@shipixen/pliny/utils/contentlayer';
import { allBlogs, Blog } from 'shipixen-contentlayer/generated';
import { PostItem } from '@/components/blog/home/PostItem';
import CopyToClipboardButton from '@/components/shared/CopyToClipboardButton';

const MAX_DISPLAY = 1000;

export default function HomeList({
  numberOfPosts = MAX_DISPLAY,
  showImage = true,
}: {
  numberOfPosts?: number;
  showImage?: boolean;
}) {
  const pathname = usePathname();
  const [selectedSubcategories, setSelectedSubcategories] = useState<
    Record<string, string[]>
  >({});
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [scrolledToCategory, setScrolledToCategory] = useState<boolean>(false);

  useEffect(() => {
    if (!scrolledToCategory) {
      const hashParams = new URLSearchParams(
        window.location.hash.replace('#', ''),
      );
      const category = hashParams.get('category');
      const subcategories = Object.fromEntries(
        Array.from(hashParams.entries()).filter(([key]) => key !== 'category'),
      );

      if (category) {
        setCurrentCategory(category);
        setSelectedSubcategories((prevSelected) => ({
          ...prevSelected,
          ...Object.keys(subcategories).reduce(
            (acc, key) => {
              acc[key] = JSON.parse(subcategories[key]);
              return acc;
            },
            {} as Record<string, string[]>,
          ),
        }));

        const element = document.getElementById(category);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }

        setScrolledToCategory(true);
      }
    }
  }, [scrolledToCategory]);

  const sortedPosts = sortPosts(allBlogs);
  const posts = allCoreContent(sortedPosts);

  const categories = posts.reduce(
    (acc, post) => {
      const { category } = post;
      if (category) {
        if (!acc[category]) {
          acc[category] = [];
        }
        acc[category].push(post);
      }
      return acc;
    },
    {} as Record<string, CoreContent<Blog>[]>,
  );

  const sortedCategories = Object.keys(categories).sort();

  const toggleSubcategory = (category: string, subcategory: string) => {
    setSelectedSubcategories((prevSelected) => {
      const newSelected = { ...prevSelected };

      if (!newSelected[category]) {
        newSelected[category] = [];
      }
      if (newSelected[category].includes(subcategory)) {
        newSelected[category] = newSelected[category].filter(
          (item) => item !== subcategory,
        );
      } else {
        newSelected[category].push(subcategory);
      }

      const query = new URLSearchParams(window.location.hash.replace('#', ''));
      query.set('category', category);
      Object.keys(newSelected).forEach((cat) => {
        if (newSelected[cat].length > 0) {
          query.set(cat, JSON.stringify(newSelected[cat]));
        } else {
          query.delete(cat);
        }
      });
      window.history.replaceState(null, '', `${pathname}#${query.toString()}`);

      return newSelected;
    });
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.hash.replace('#', ''));
    if (currentCategory) {
      query.set('category', currentCategory);
      Object.keys(selectedSubcategories).forEach((cat) => {
        if (selectedSubcategories[cat].length > 0) {
          query.set(cat, JSON.stringify(selectedSubcategories[cat]));
        } else {
          query.delete(cat);
        }
      });
      window.history.replaceState(null, '', `${pathname}#${query.toString()}`);
    }
  }, [selectedSubcategories, currentCategory, pathname]);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setCurrentCategory(entry.target.id);
        }
      });
    },
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    });

    sortedCategories.forEach((category) => {
      const element = document.getElementById(category);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [sortedCategories, handleIntersection]);

  return (
    <>
      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-semibold leading-tight md:leading-tight max-w-xs sm:max-w-none md:text-4xl">
          Latest deals
        </h2>

        {sortedCategories.map((category) => (
          <CategorySection
            key={category}
            category={category}
            posts={categories[category]}
            selectedSubcategories={selectedSubcategories[category] || []}
            handleSubcategoryFilter={toggleSubcategory}
            numberOfPosts={numberOfPosts}
            showImage={showImage}
          />
        ))}

        {posts.length > MAX_DISPLAY && (
          <div className="mt-12 flex text-base font-medium leading-6">
            <Link
              href={siteConfig.allArticlesPath}
              className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
              aria-label="See all deals"
            >
              See all deals &rarr;
            </Link>
          </div>
        )}

        {siteConfig.newsletter?.provider && (
          <div className="flex items-center justify-center pt-4">
            <NewsletterForm />
          </div>
        )}
      </div>
    </>
  );
}

function CategorySection({
  category,
  posts,
  selectedSubcategories,
  handleSubcategoryFilter,
  numberOfPosts,
  showImage,
}: {
  category: string;
  posts: CoreContent<Blog>[];
  selectedSubcategories: string[];
  handleSubcategoryFilter: (category: string, subcategory: string) => void;
  numberOfPosts: number;
  showImage: boolean;
}) {
  const handleCategoryClick = () => {
    const query = new URLSearchParams(window.location.hash.replace('#', ''));
    query.set('category', category);
    window.history.replaceState(
      null,
      '',
      `${window.location.pathname}#${query.toString()}`,
    );
  };

  const sortedPosts = posts.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="mb-8" id={category}>
      <div className="flex items-center mb-4 relative">
        <CopyToClipboardButton
          textToCopy={`${window.location.origin}${window.location.pathname}#category=${category}`}
          label={category}
          ariaLabel={`Set category to ${category}`}
        />
      </div>
      <SubcategoryFilter
        category={category}
        posts={sortedPosts}
        selectedSubcategories={selectedSubcategories}
        handleSubcategoryFilter={handleSubcategoryFilter}
      />
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sortedPosts
          .filter(
            (post) =>
              !selectedSubcategories.length ||
              (post.subcategory &&
                selectedSubcategories.includes(post.subcategory)),
          )
          .slice(0, numberOfPosts)
          .map((post) => (
            <PostItem key={post.slug} post={post} showImage={showImage} />
          ))}
      </ul>
    </div>
  );
}

function SubcategoryFilter({
  category,
  posts,
  selectedSubcategories,
  handleSubcategoryFilter,
}: {
  category: string;
  posts: CoreContent<Blog>[];
  selectedSubcategories: string[];
  handleSubcategoryFilter: (category: string, subcategory: string) => void;
}) {
  const subcategories = Array.from(
    new Set(posts.map((post) => post.subcategory).filter(Boolean)),
  ).sort();

  return (
    <div className="flex flex-wrap gap-2 mb-4 overflow-x-auto">
      {subcategories.map((subcategory) => (
        <button
          key={subcategory}
          onClick={() => handleSubcategoryFilter(category, subcategory!)}
          className={`px-4 py-2 rounded transition-colors ${
            selectedSubcategories.includes(subcategory!)
              ? 'bg-primary-500 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {subcategory}
        </button>
      ))}
    </div>
  );
}
