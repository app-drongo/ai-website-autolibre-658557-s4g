'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'; // lucide-react is a base package
import useEmblaCarousel from 'embla-carousel-react';
import { cn } from '@/lib/utils'; // Assuming this utility exists for class merging

// TypeScript Interface for Testimonial Data
interface Testimonial {
  id: string;
  name: string;
  title: string; // e.g., "Business Traveler", "Family Vacationer"
  quote: string;
  rating: number; // 1-5 stars
  avatar: string; // URL to avatar image
}

// Dummy Data for Testimonials (corporate car rental agency context)
const testimonialsData: Testimonial[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    title: 'Business Traveler',
    quote:
      'The premium sedan I rented for my business trip was immaculate and delivered right on time. The booking process was seamless, and the customer service was exceptional. Highly recommend for corporate travel!',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1580489944761-15ad79f32a93?q=80&w=250&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    name: 'Bob Williams',
    title: 'Family Vacationer',
    quote:
      'Our family vacation was made so much easier with the spacious SUV we rented. Plenty of room for luggage and the kids. The car was clean, reliable, and the pick-up/drop-off was a breeze. Fantastic experience!',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3',
    name: 'Charlie Davis',
    title: 'Weekend Explorer',
    quote:
      'Rented a compact car for a weekend getaway. It was fuel-efficient and perfect for navigating city streets and country roads. The pricing was transparent, and there were no hidden fees. Will definitely use again!',
    rating: 4,
    avatar:
      'https://images.unsplash.com/photo-1507003211169-e69fe1c5a92a?q=80&w=250&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '4',
    name: 'Diana Miller',
    title: 'Event Coordinator',
    quote:
      'Needed a luxury vehicle for a client event, and this service delivered beyond expectations. The car was pristine, and the driver was professional. It added a touch of class to our event. Thank you!',
    rating: 5,
    avatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=250&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '5',
    name: 'Eve White',
    title: 'First-time Renter',
    quote:
      'As a first-time car renter, I was a bit nervous, but the staff made the process incredibly easy and explained everything clearly. The car was exactly what I needed, and I felt confident on the road. Great service!',
    rating: 4,
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

export default function Testimonials() {
  // Embla Carousel hook for smooth, touch-friendly carousels
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }); // loop for continuous scrolling, align start for mobile-first

  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  // Carousel navigation functions
  const scrollPrev = useCallback(() => {
    emblaApi && emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi && emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi && emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  // Update state on carousel select event
  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  // Initialize scroll snaps
  const onInit = useCallback((emblaApi: any) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  // Effect hook to attach and clean up Embla Carousel event listeners
  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on('reInit', onInit);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('select', onSelect);
  }, [emblaApi, onInit, onSelect]);

  return (
    <section id="testimonials" className="py-16 md:py-24 bg-background text-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-primary mb-4">
            <span data-editable="testimonials_title">What Our Clients Say</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span data-editable="testimonials_subtitle">
              Hear from our satisfied customers about their experience with our premium car rental
              services.
            </span>
          </p>
        </div>

        {/* Testimonials Carousel Container */}
        <div className="relative">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex -ml-4">
              {' '}
              {/* Negative margin to offset padding on cards */}
              {testimonialsData.map(testimonial => (
                <div
                  key={testimonial.id}
                  className="embla__slide flex-none w-full sm:w-1/2 lg:w-1/3 pl-4"
                >
                  {' '}
                  {/* Responsive widths for slides */}
                  <Card className="h-full flex flex-col bg-card text-card-foreground border-border shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="flex flex-row items-center gap-4 pb-4">
                      <Avatar className="h-12 w-12 border-2 border-primary">
                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                        <AvatarFallback>
                          {testimonial.name
                            .split(' ')
                            .map(n => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg font-semibold">
                          <span data-editable={`testimonial_${testimonial.id}_name`}>
                            {testimonial.name}
                          </span>
                        </CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          <span data-editable={`testimonial_${testimonial.id}_title`}>
                            {testimonial.title}
                          </span>
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow flex flex-col justify-between">
                      <div className="flex items-center mb-3">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'h-5 w-5',
                              i < testimonial.rating
                                ? 'text-primary fill-primary'
                                : 'text-muted-foreground'
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-base leading-relaxed italic">
                        <span data-editable={`testimonial_${testimonial.id}_quote`}>
                          &ldquo;{testimonial.quote}&rdquo;
                        </span>
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Navigation Buttons (hidden on mobile) */}
          <Button
            className="absolute top-1/2 -translate-y-1/2 left-0 -ml-4 z-10 rounded-full h-10 w-10 p-0 bg-primary text-primary-foreground hover:bg-primary/90 hidden md:flex items-center justify-center"
            onClick={scrollPrev}
            disabled={prevBtnDisabled && !emblaApi?.options.loop} // Disable if not looping and at start
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            className="absolute top-1/2 -translate-y-1/2 right-0 -mr-4 z-10 rounded-full h-10 w-10 p-0 bg-primary text-primary-foreground hover:bg-primary/90 hidden md:flex items-center justify-center"
            onClick={scrollNext}
            disabled={nextBtnDisabled && !emblaApi?.options.loop} // Disable if not looping and at end
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

        {/* Carousel Dots for Navigation */}
        <div className="flex justify-center mt-8 gap-2">
          {scrollSnaps.map((_, index) => (
            <Button
              key={index}
              onClick={() => scrollTo(index)}
              className={cn(
                'h-2 w-2 p-0 rounded-full transition-all duration-300',
                selectedIndex === index ? 'bg-primary w-6' : 'bg-muted hover:bg-muted-foreground'
              )}
              aria-label={`Go to testimonial slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
