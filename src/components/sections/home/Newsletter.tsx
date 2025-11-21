'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail } from 'lucide-react'; // Part of base packages
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils'; // Assuming this utility wraps clsx and tailwind-merge (base packages)

// 1. Define the Zod schema for form validation
const newsletterFormSchema = z.object({
  email: z.string().email('Please enter a valid email address.').min(1, 'Email is required.'),
});

// 2. Infer the TypeScript type from the schema
type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;

export default function Newsletter() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewsletterFormValues>({
    resolver: zodResolver(newsletterFormSchema),
  });

  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState<string>('');

  const onSubmit = async (data: NewsletterFormValues) => {
    setSubmissionStatus('idle'); // Reset status
    setMessage(''); // Clear previous message

    try {
      // Simulate an API call for newsletter subscription
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      console.log('Newsletter subscription data:', data);

      // Simulate a successful response
      setSubmissionStatus('success');
      setMessage(
        'Thank you for subscribing! Check your inbox for a welcome email with exclusive offers.'
      );
      reset(); // Clear the form fields
    } catch (error) {
      // Simulate an error response
      setSubmissionStatus('error');
      setMessage('Oops! Something went wrong. Please try again later.');
      console.error('Newsletter subscription error:', error);
    } finally {
      // Clear the status message after 5 seconds
      setTimeout(() => {
        setSubmissionStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  // Framer Motion variants for subtle animations
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  return (
    <section id="newsletter" className="bg-primary text-primary-foreground py-16 md:py-24 lg:py-32">
      <motion.div
        className="container mx-auto px-4 text-center max-w-4xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Trigger animation once when 30% in view
        variants={containerVariants}
      >
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight"
          variants={itemVariants}
        >
          <span data-editable="newsletter_title">
            Stay Updated on Our Latest Deals & Fleet Additions
          </span>
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto opacity-90"
          variants={itemVariants}
        >
          <span data-editable="newsletter_description">
            Subscribe to our newsletter for exclusive offers, new car announcements, and travel tips
            for your next adventure.
          </span>
        </motion.p>

        <motion.div
          className="bg-card text-card-foreground p-6 md:p-8 rounded-lg shadow-xl max-w-md mx-auto border border-border"
          variants={itemVariants}
        >
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            data-form-id="692064846a0190d8a7f96df9"
          >
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email" className="sr-only">
                <span data-editable="email_label">Email Address</span>
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  className={cn(
                    'pl-10 pr-4 py-2 text-base md:text-lg h-12',
                    errors.email && 'border-destructive focus-visible:ring-destructive'
                  )}
                  {...register('email')}
                  disabled={isSubmitting}
                  data-editable="email_placeholder"
                />
              </div>
              {errors.email && (
                <p className="text-destructive text-sm mt-1 text-left">{errors.email.message}</p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 h-12 text-base md:text-lg font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-accent-foreground"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span data-editable="button_submitting_text">Subscribing...</span>
                </>
              ) : (
                <span data-editable="button_text">Subscribe Now</span>
              )}
            </Button>

            {message && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'mt-4 text-sm font-medium',
                  submissionStatus === 'success' ? 'text-primary' : 'text-destructive'
                )}
              >
                {message}
              </motion.p>
            )}
          </form>
        </motion.div>
      </motion.div>
    </section>
  );
}
