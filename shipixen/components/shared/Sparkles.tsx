// Sparkles.tsx
'use client';
import React from 'react';
import './Sparkles.css';
import { cn } from '@/lib/utils';

type SparklesProps = {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

const sizeMap = {
  sm: {
    container: 120,
    inner: 110, // Reduced from 90
  },
  md: {
    container: 180,
    inner: 170, // Reduced from 140
  },
  lg: {
    container: 240,
    inner: 220, // Reduced from 190
  },
};

export const Sparkles = ({ className, size = 'md' }: SparklesProps) => {
  const blobSize = sizeMap[size];

  return (
    <div className={cn('blob-container', className)}>
      <div
        className="blob light:from-purple-400 light:via-purple-500 light:to-purple-600 dark:from-purple-700 dark:via-purple-800 dark:to-purple-900"
        style={{
          width: blobSize.container,
          height: blobSize.container,
        }}
      >
        <div
          className="inner-blob light:from-teal-300 light:via-purple-300 light:to-purple-400 dark:from-teal-600 dark:via-purple-600 dark:to-purple-700"
          style={{
            width: blobSize.inner,
            height: blobSize.inner,
          }}
        />
      </div>
    </div>
  );
};
