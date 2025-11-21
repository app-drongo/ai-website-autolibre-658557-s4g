'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, BellRing } from 'lucide-react'; // Using BellRing for a relevant icon
import { cn } from '@/lib/utils'; // Assuming cn utility from shadcn/ui for conditional classes

export default function Announcementbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  // Function to handle closing the announcement bar
  const handleClose = () => {
    setIsClosing(true);
    // Allow time for the collapse animation to complete before unmounting
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false); // Reset closing state
    }, 300); // Matches the transition duration
  };

  // Do not render the component if it's not visible and not in the process of closing
  if (!isVisible && !isClosing) {
    return null;
  }

  return (
    <section
      id="announcement-bar"
      className={cn(
        'sticky top-0 z-50 w-full bg-primary text-primary-foreground py-2 px-4 text-center text-sm md:text-base flex items-center justify-center gap-2 transition-all duration-300 ease-in-out overflow-hidden',
        isClosing ? 'max-h-0 opacity-0 py-0' : 'max-h-screen opacity-100' // Smooth collapse/expand animation
      )}
      role="region" // Semantic role for an important section
      aria-label="Site-wide announcement"
      aria-live="polite" // Announce changes to screen readers politely
      aria-atomic="true" // Announce the entire region content if it changes
    >
      <BellRing className="h-4 w-4 flex-shrink-0" />
      <p className="flex-grow font-medium">
        <span data-editable="message">
          📢 Exciting News! Explore our new fleet of luxury cars. Book now for 15% off your first
          rental!
        </span>
      </p>
      <Button
        variant="ghost"
        size="sm"
        onClick={handleClose}
        // Ensure proper color pairing for the ghost button on a primary background
        className="text-primary-foreground hover:bg-primary/80 h-auto p-1 rounded-md"
        aria-label="Close announcement"
      >
        <X className="h-4 w-4" />
      </Button>
    </section>
  );
}
