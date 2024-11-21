import React, { useEffect, useRef, useState, useCallback } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useAutoplay } from './EmblaCarouselAutoplay';
import { useAutoplayProgress } from './EmblaCarouselAutoplayProgress';
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from './EmblaCarouselArrowButtons';
import Link from 'next/link';
import { CoreContent } from '@shipixen/pliny/utils/contentlayer';
import { Blog } from 'shipixen-contentlayer/generated';
import Image from 'next/image';

type PropType = {
  apps: CoreContent<Blog>[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = ({ apps, options }) => {
  const progressNode = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: false, delay: 5000 }),
  ]);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { autoplayIsPlaying, toggleAutoplay, onAutoplayButtonClick } =
    useAutoplay(emblaApi);

  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode);

  const [currentIndex, setCurrentIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setCurrentIndex(index);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    onSelect(); // Initial call to set the state
  }, [emblaApi, onSelect]);

  useEffect(() => {
    toggleAutoplay();
  }, [toggleAutoplay]);

  // Calculate next app index with looping
  const nextIndex = (currentIndex + 1) % apps.length;
  const nextApp = apps[nextIndex];

  const onPrev = () => {
    onAutoplayButtonClick(onPrevButtonClick);
    toggleAutoplay();
  };

  const onNext = () => {
    onAutoplayButtonClick(onNextButtonClick);
    toggleAutoplay();
  };

  return (
    <div className="embla flex flex-col">
      <div className="overflow-hidden relative" ref={emblaRef}>
        <div className="embla__container">
          {apps.map((app, index) => (
            <div className="embla__slide flex" key={index}>
              <Link href={`/products/${app.slug}`}>
                <Image
                  width={1200}
                  height={1200}
                  src={app.images[0]}
                  alt={app.title}
                  className="w-auto h-auto"
                />
                {/* <Image
                  width={200}
                  height={200}
                  src={app.logo as string}
                  alt={app.title}
                  className="absolute top-0"
                />
                <h3 className="absolute top-0">{app.title}</h3>
                <div className="absolute top-0">{app.deal}</div>


                  <div className="absolute top-0">{app.summary}</div>
                */}
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-shrink-0 gap-2">
          <PrevButton onClick={onPrev} disabled={prevBtnDisabled} />
          <NextButton onClick={onNext} disabled={nextBtnDisabled} />
        </div>

        <div
          className={`embla__progress relative overflow-hidden flex gap-2`.concat(
            showAutoplayProgress ? '' : ' embla__progress--hidden',
          )}
        >
          <Image
            width={200}
            height={200}
            src={nextApp.logo as string}
            alt={nextApp.title}
            className="w-12 h-12"
          />
          {nextApp.title}

          <div
            className="embla__progress__bar absolute top-0 left-0 w-full h-full backdrop-grayscale z-10"
            ref={progressNode}
          />
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
