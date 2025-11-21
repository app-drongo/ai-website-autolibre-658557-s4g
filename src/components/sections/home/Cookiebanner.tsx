'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useSmartNavigation } from '@/hooks/useSmartNavigation';

// Define a type for the cookie consent status
type CookieConsentStatus = 'accepted' | 'declined' | null;

export default function Cookiebanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [consentStatus, setConsentStatus] = useState<CookieConsentStatus>(null);
  const navigate = useSmartNavigation();

  const COOKIE_CONSENT_KEY = 'cookie_consent_status';

  /**
   * Sets the cookie consent status in localStorage and updates component state.
   * @param status The consent status ('accepted', 'declined', or null for no decision).
   */
  const setConsent = useCallback((status: CookieConsentStatus) => {
    if (typeof window !== 'undefined') {
      // Store 'accepted', 'declined', or an empty string if status is null
      localStorage.setItem(COOKIE_CONSENT_KEY, status || '');
      setConsentStatus(status);
      setShowBanner(false); // Hide banner after user makes a choice
    }
  }, []);

  /**
   * Effect hook to check for existing cookie consent on component mount.
   * If consent is found, the banner remains hidden. Otherwise, it's displayed.
   */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY) as CookieConsentStatus;
      if (storedConsent === 'accepted' || storedConsent === 'declined') {
        setConsentStatus(storedConsent);
        setShowBanner(false); // Consent already given, keep banner hidden
      } else {
        setConsentStatus(null); // No consent yet
        setShowBanner(true); // Show banner to prompt user for consent
      }
    }
  }, []);

  // If the banner should not be shown (either consent given or not yet mounted), return null
  if (!showBanner) {
    return null;
  }

  return (
    <section
      id="cookie-banner"
      className="fixed inset-x-0 bottom-0 z-[9999] p-4 md:p-6 bg-background/80 backdrop-blur-sm
                 animate-in fade-in-from-bottom-1/2 slide-in-from-bottom-1/2 duration-500
                 flex justify-center items-end"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie Consent Banner"
    >
      <Card className="max-w-4xl w-full shadow-lg border-border bg-card text-card-foreground">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl md:text-2xl font-bold">
            <span data-editable="bannerTitle">Your Privacy Matters to Us</span>
          </CardTitle>
          <CardDescription className="text-sm md:text-base text-muted-foreground">
            <span data-editable="bannerDescription">
              We use cookies to ensure you get the best experience on our car rental website. This
              includes personalizing content, providing social media features, and analyzing our
              traffic.
            </span>
          </CardDescription>
        </CardHeader>
        <CardContent className="py-2">
          <p className="text-xs md:text-sm">
            <span data-editable="learnMoreText">
              By clicking &quot;Accept All&quot;, you agree to the storing of cookies on your
              device. For more details on how we use cookies and your data, please read our{' '}
            </span>
            <a
              href="/privacy-policy" // Placeholder link for privacy policy
              onClick={e => {
                e.preventDefault(); // Prevent default browser navigation
                navigate('/privacy-policy'); // Use useSmartNavigation for internal routing
              }}
              className="text-primary hover:underline font-medium transition-colors duration-200"
              data-editable="privacyPolicyLinkText"
            >
              Privacy Policy
            </a>
            .
          </p>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            onClick={() => setConsent('accepted')}
            className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
            data-editable="acceptAllButtonText"
          >
            Accept All
          </Button>
          <Button
            onClick={() => setConsent('declined')}
            variant="outline"
            className="w-full sm:w-auto border-border bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors duration-200"
            data-editable="declineAllButtonText"
          >
            Decline All
          </Button>
          <Button
            onClick={() => {
              // This action could open a modal for granular cookie settings
              // or navigate to a dedicated cookie preferences page.
              alert(
                'Manage Preferences functionality is under development. Please check back later!'
              );
              // navigate('/cookie-preferences'); // Example of navigation to a preferences page
            }}
            variant="ghost"
            className="w-full sm:w-auto text-muted-foreground hover:bg-muted/80 transition-colors duration-200"
            data-editable="managePreferencesButtonText"
          >
            Manage Preferences
          </Button>
        </CardFooter>
      </Card>
    </section>
  );
}
