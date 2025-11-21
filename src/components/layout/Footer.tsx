'use client';

import React from 'react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Facebook, Twitter, Instagram, LucideIcon } from 'lucide-react';

// Define interfaces for the footer data structure
interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  platform: string; // e.g., 'facebook', 'twitter', 'instagram'
  href: string;
  icon: LucideIcon; // Directly use LucideIcon type from lucide-react
  ariaLabel: string;
}

export interface FooterData {
  agencyName: string;
  tagline: string;
  company: {
    title: string;
    links: [FooterLink, FooterLink, FooterLink]; // Enforce 3 items
  };
  legal: {
    title: string;
    links: [FooterLink, FooterLink]; // Enforce 2 items
  };
  social: {
    title: string;
    links: [SocialLink, SocialLink, SocialLink]; // Enforce 3 items
  };
  copyrightText: string; // e.g., "&copy; {year} Car Rental Agency. All rights reserved."
}

interface FooterProps {
  data: FooterData;
}

export default function Footer({ data }: FooterProps) {
  const { agencyName, tagline, company, legal, social, copyrightText } = data;

  return (
    <section id="footer" className="bg-card text-card-foreground py-12 md:py-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Agency Info / Branding */}
          <div className="md:col-span-2 lg:col-span-2">
            <Link
              href="/"
              className="text-2xl font-bold text-primary hover:text-primary/90 transition-colors"
              data-editable="agencyName"
            >
              {agencyName}
            </Link>
            <p className="mt-4 text-muted-foreground max-w-sm" data-editable="tagline">
              {tagline}
            </p>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4" data-editable="companyTitle">
              {company.title}
            </h3>
            <ul className="space-y-2">
              {company.links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-card-foreground hover:text-primary transition-colors"
                    data-editable={`companyLink${index + 1}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4" data-editable="legalTitle">
              {legal.title}
            </h3>
            <ul className="space-y-2">
              {legal.links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-card-foreground hover:text-primary transition-colors"
                    data-editable={`legalLink${index + 1}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4" data-editable="socialTitle">
              {social.title}
            </h3>
            <div className="flex space-x-4">
              {social.links.map((link, index) => {
                const IconComponent = link.icon; // Use the icon directly from data
                return (
                  <Link
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                    className="text-card-foreground hover:text-primary transition-colors"
                  >
                    <IconComponent size={24} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-8 bg-border" />

        {/* Copyright */}
        <div className="text-center text-sm text-muted-foreground">
          <p data-editable="copyrightText">
            {copyrightText.replace('{year}', new Date().getFullYear().toString())}
          </p>
        </div>
      </div>
    </section>
  );
}
