'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { cn } from '@/lib/utils'; // Assuming 'cn' utility is available for merging Tailwind classes

// Define props interface for the CTA component
interface CtaProps {
  /**
   * The main title/headline for the call to action.
   * @default "Ready to hit the road?"
   */
  title?: string;
  /**
   * A descriptive paragraph explaining the call to action.
   * @default "Explore our fleet and find the perfect car for your next adventure. Book now and experience seamless travel."
   */
  description?: string;
  /**
   * The text displayed on the call to action button.
   * @default "Book Your Car Now"
   */
  buttonText?: string;
  /**
   * The URL path the button navigates to.
   * @default "/flotte"
   */
  buttonHref?: string;
  /**
   * Optional additional CSS classes to apply to the root section.
   */
  className?: string;
}

/**
 * A prominent Call-to-Action (CTA) component designed for a car rental agency.
 * It features a compelling headline, a brief description, and a clear action button.
 *
 * This component adheres to the corporate aesthetic, uses semantic colors,
 * is fully responsive, and integrates with shadcn/ui and useSmartNavigation.
 */
export default function Cta({
  title = 'Ready to hit the road?',
  description = 'Explore our fleet and find the perfect car for your next adventure. Book now and experience seamless travel.',
  buttonText = 'Book Your Car Now',
  buttonHref = '/flotte', // Default to the fleet page for a car rental agency
  className,
}: CtaProps) {
  const navigate = useSmartNavigation();

  return (
    <section
      id="cta"
      className={cn(
        'bg-primary text-primary-foreground', // Core semantic colors for the section
        'py-16 md:py-24 lg:py-32', // Responsive vertical padding for ample breathing room
        'flex flex-col items-center justify-center text-center', // Center content horizontally and vertically
        'px-4 sm:px-6 lg:px-8', // Responsive horizontal padding
        className // Allow external classes to be merged
      )}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {' '}
        {/* Constrain content width for readability */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
          <span data-editable="ctaTitle">{title}</span>
        </h2>
        <p className="text-lg sm:text-xl text-primary-foreground/90">
          {' '}
          {/* Slightly muted text for description */}
          <span data-editable="ctaDescription">{description}</span>
        </p>
        <Button
          onClick={() => navigate(buttonHref)}
          className="mt-8 px-8 py-6 text-lg sm:text-xl font-semibold rounded-lg shadow-lg
                     bg-accent text-accent-foreground hover:bg-accent/90
                     transition-colors duration-300 ease-in-out" // Prominent button styling with hover effect
        >
          <span data-editable="ctaButtonText">{buttonText}</span>
        </Button>
      </div>
    </section>
  );
}
