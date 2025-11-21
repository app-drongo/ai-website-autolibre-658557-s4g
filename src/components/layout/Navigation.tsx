'use client';

import React, { useState, useEffect } from 'react';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { MenuIcon } from 'lucide-react'; // lucide-react is a base package

// Assuming a utility for conditional class merging exists in shadcn/ui projects
// This typically combines clsx and tailwind-merge, which are base packages.
import { cn } from '@/lib/utils';

/**
 * Defines the structure for a navigation link.
 */
interface NavLink {
  label: string;
  href: string;
}

/**
 * Array of navigation links as required by the prompt.
 */
const navLinks: NavLink[] = [
  { label: 'Accueil', href: '#hero' },
  { label: 'Notre Flotte', href: '#car-fleet' },
  { label: 'Contact', href: '#contact' },
  { label: 'Testimonials', href: '#testimonials' },
];

/**
 * Main navigation component for the website.
 * Provides a responsive header with desktop links and a mobile sidebar menu.
 */
export default function Navigation() {
  const navigate = useSmartNavigation();
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  // Effect to detect scroll position and apply styling changes
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    // Clean up event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array ensures this runs once on mount

  /**
   * Handles navigation link clicks, using useSmartNavigation for smooth scrolling
   * and closing the mobile sheet if it's open.
   * @param href The target URL or hash for navigation.
   */
  const handleNavLinkClick = (href: string) => {
    navigate(href);
    setIsSheetOpen(false); // Close mobile menu on link click
  };

  return (
    <section
      id="navigation"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300',
        'bg-background text-foreground shadow-sm', // Default state: main background, subtle shadow
        isScrolled && 'bg-card/90 backdrop-blur-sm shadow-md' // Scrolled state: slightly opaque card background, more prominent shadow
      )}
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo / Brand Name */}
        <div className="flex items-center">
          <a
            href="#hero"
            onClick={() => handleNavLinkClick('#hero')}
            className="text-lg font-bold text-primary hover:text-primary/90 transition-colors"
            aria-label="Go to homepage"
          >
            <span data-editable="brandName">Car Agency</span>
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map(link => (
            <Button
              key={link.href}
              variant="link" // shadcn/ui Button styled as a link
              className="text-foreground hover:text-primary transition-colors px-0" // Semantic colors, hover effect
              onClick={() => handleNavLinkClick(link.href)}
            >
              <span data-editable={`navLink_${link.label.toLowerCase().replace(/\s/g, '')}`}>
                {link.label}
              </span>
            </Button>
          ))}
        </div>

        {/* Mobile Navigation (Hamburger Menu) */}
        <div className="md:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span> {/* Accessible label */}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[250px] sm:w-[300px] bg-card text-card-foreground"
            >
              <div className="flex flex-col space-y-4 py-6">
                {/* Mobile Brand Name */}
                <a
                  href="#hero"
                  onClick={() => handleNavLinkClick('#hero')}
                  className="text-xl font-bold text-primary hover:text-primary/90 transition-colors px-4"
                  aria-label="Go to homepage"
                >
                  <span data-editable="brandNameMobile">Car Agency</span>
                </a>
                <Separator className="bg-border" /> {/* Visual separator */}
                {/* Mobile Navigation Links */}
                {navLinks.map(link => (
                  <Button
                    key={link.href}
                    variant="ghost" // Ghost variant for block-level links in mobile menu
                    className="justify-start text-card-foreground hover:bg-muted hover:text-primary transition-colors px-4" // Semantic colors, hover effect
                    onClick={() => handleNavLinkClick(link.href)}
                  >
                    <span
                      data-editable={`navLinkMobile_${link.label.toLowerCase().replace(/\s/g, '')}`}
                    >
                      {link.label}
                    </span>
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </section>
  );
}
