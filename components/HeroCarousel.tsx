'use client';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { carouselSlides } from '@/data/siteData';

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);
  const [current, setCurrent] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', () => setCurrent(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  return (
    <div className="relative w-full" style={{ height: '75vh', minHeight: 480 }}>
      <div className="embla h-full" ref={emblaRef}>
        <div className="embla__container h-full">
          {carouselSlides.map((slide) => (
            <div key={slide.id} className="embla__slide relative h-full">
              {/* Background image */}
              <div className="absolute inset-0"
                style={{
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }} />
              {/* Gradient overlays */}
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to right, rgba(8,11,16,0.95) 40%, rgba(8,11,16,0.4) 100%)' }} />
              <div className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(8,11,16,0.9) 0%, transparent 60%)' }} />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="max-w-7xl mx-auto px-6 w-full">
                  <div className="max-w-xl">
                    <span className="tag-pill mb-4 inline-block">{slide.tag}</span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight"
                      style={{ fontFamily: 'Syne, sans-serif' }}>
                      {slide.title}
                    </h2>
                    <p className="text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
                      {slide.subtitle}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prev/Next */}
      <button onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all z-10"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-bright)' }}>
        <ChevronLeft size={18} />
      </button>
      <button onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center transition-all z-10"
        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-bright)' }}>
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {carouselSlides.map((_, i) => (
          <button key={i} onClick={() => emblaApi?.scrollTo(i)}
            className="rounded-full transition-all"
            style={{
              width: i === current ? 24 : 8,
              height: 8,
              background: i === current ? 'var(--accent)' : 'rgba(255,255,255,0.2)',
            }} />
        ))}
      </div>
    </div>
  );
}
