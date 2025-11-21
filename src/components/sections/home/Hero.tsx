'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
// Assuming '@/lib/utils' provides a 'cn' utility for merging Tailwind classes.
// This is a common pattern in shadcn/ui setups for robust class management.
// If not available in your project, this import can be removed.
import { cn } from '@/lib/utils';

export default function Hero() {
  const navigate = useSmartNavigation();

  return (
    <section
      id="hero"
      className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image for visual impact, optimized with Next.js Image component */}
      <Image
        src="https://images.unsplash.com/photo-1542228235-154162925526?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" // Unsplash image: a sleek car on a scenic road
        alt="Luxury car on a scenic road"
        fill
        priority // Prioritize loading for improved Largest Contentful Paint (LCP)
        className="object-cover object-center"
      />

      {/* Overlay for enhanced text readability and subtle branding, adapting to dark mode */}
      <div className="absolute inset-0 bg-background/60 dark:bg-background/70"></div>

      {/* Main content container, centered and responsive */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Headline with responsive sizing and a subtle fade-in animation */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground animate-fade-in-up animate-duration-1000">
          <span data-editable="heroTitle">Your Journey, Our Wheels.</span>
        </h1>
        {/* Description with responsive sizing and a delayed fade-in animation */}
        <p className="mt-4 text-lg sm:text-xl md:text-2xl text-muted-foreground animate-fade-in-up animate-duration-1000 animate-delay-300">
          <span data-editable="heroDescription">
            Seamless car rental for every adventure. Explore the world with comfort and style.
          </span>
        </p>
        {/* Call-to-action buttons, stacked on mobile, side-by-side on larger screens, with delayed fade-in */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up animate-duration-1000 animate-delay-600">
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-300"
            onClick={() => navigate('/flotte')} // Navigates to the fleet section/page
          >
            <span data-editable="primaryCtaText">View Our Fleet</span>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-input text-foreground hover:bg-accent hover:text-accent-foreground transition-colors duration-300"
            onClick={() => navigate('/contact')} // Navigates to a contact or booking inquiry page
          >
            <span data-editable="secondaryCtaText">Get a Quote</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
