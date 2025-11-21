'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

// 1. Define the Zod schema for form validation
const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters.' })
    .max(50, { message: 'Name must not be longer than 50 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z
    .string()
    .min(5, { message: 'Subject must be at least 5 characters.' })
    .max(100, { message: 'Subject must not be longer than 100 characters.' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters.' })
    .max(500, { message: 'Message must not be longer than 500 characters.' }),
});

// Infer the type from the schema
type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'success' | 'error' | null>(null);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (values: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmissionStatus(null); // Clear previous status
    try {
      // Simulate an API call for form submission
      // In a real application, you would send 'values' to your backend API here.
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      console.log('Form submitted successfully:', values);
      setSubmissionStatus('success');
      form.reset(); // Clear form fields on successful submission
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-background text-foreground py-16 md:py-24 animate-fade-in">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            <span data-editable="contact_title">Get in Touch with Us</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            <span data-editable="contact_description">
              Have questions about our car rental services, need assistance with a booking, or want
              to inquire about a specific vehicle? Reach out to our friendly team – we're here to
              help you plan your next adventure on the road.
            </span>
          </p>
        </div>

        {/* Main Content Grid: Form and Contact Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form Card */}
          <Card className="bg-card text-card-foreground shadow-lg border-border">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                <span data-editable="form_title">Send Us a Message</span>
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                <span data-editable="form_description">
                  Fill out the form below and we'll get back to you as soon as possible.
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
                data-form-id="692064e26a0190d8a7f96dfc"
              >
                {/* Name Field */}
                <div>
                  <Label htmlFor="name" className="text-card-foreground">
                    <span data-editable="label_name">Your Name</span>
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    className="mt-1 bg-background text-foreground border-input focus:ring-ring focus:ring-2"
                    {...form.register('name')}
                  />
                  {form.formState.errors.name && (
                    <p className="text-destructive text-sm mt-1" role="alert">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <Label htmlFor="email" className="text-card-foreground">
                    <span data-editable="label_email">Your Email</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    className="mt-1 bg-background text-foreground border-input focus:ring-ring focus:ring-2"
                    {...form.register('email')}
                  />
                  {form.formState.errors.email && (
                    <p className="text-destructive text-sm mt-1" role="alert">
                      {form.formState.errors.email.message}
                    </p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <Label htmlFor="subject" className="text-card-foreground">
                    <span data-editable="label_subject">Subject</span>
                  </Label>
                  <Input
                    id="subject"
                    type="text"
                    placeholder="Inquiry about car rental"
                    className="mt-1 bg-background text-foreground border-input focus:ring-ring focus:ring-2"
                    {...form.register('subject')}
                  />
                  {form.formState.errors.subject && (
                    <p className="text-destructive text-sm mt-1" role="alert">
                      {form.formState.errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <Label htmlFor="message" className="text-card-foreground">
                    <span data-editable="label_message">Your Message</span>
                  </Label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us more about your needs, desired car type, rental dates, etc."
                    className="mt-1 bg-background text-foreground border-input focus:ring-ring focus:ring-2 resize-y"
                    {...form.register('message')}
                  />
                  {form.formState.errors.message && (
                    <p className="text-destructive text-sm mt-1" role="alert">
                      {form.formState.errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span data-editable="button_submitting">Sending...</span>
                  ) : (
                    <span data-editable="button_submit">Send Message</span>
                  )}
                </Button>

                {/* Submission Status Feedback */}
                {submissionStatus === 'success' && (
                  <p className="text-center text-green-600 mt-4 animate-fade-in" aria-live="polite">
                    <span data-editable="success_message">
                      Your message has been sent successfully! We'll be in touch shortly.
                    </span>
                  </p>
                )}
                {submissionStatus === 'error' && (
                  <p
                    className="text-center text-destructive mt-4 animate-fade-in"
                    aria-live="polite"
                  >
                    <span data-editable="error_message">
                      There was an error sending your message. Please try again or contact us
                      directly.
                    </span>
                  </p>
                )}
              </form>
            </CardContent>
          </Card>

          {/* Contact Information & Map Placeholder */}
          <div className="space-y-8">
            {/* Contact Details Card */}
            <Card className="bg-card text-card-foreground shadow-lg border-border">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">
                  <span data-editable="info_title">Our Details</span>
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  <span data-editable="info_description">
                    Find us or reach out directly through our contact details.
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    <span data-editable="info_address_heading">Our Office</span>
                  </h3>
                  <p className="text-card-foreground">
                    <span data-editable="info_address_line1">123 Car Rental Avenue</span>
                    <br />
                    <span data-editable="info_address_line2">Suite 100, Metropolis, CA 90210</span>
                    <br />
                    <span data-editable="info_address_line3">United States</span>
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    <span data-editable="info_phone_heading">Phone</span>
                  </h3>
                  <p className="text-card-foreground">
                    <span data-editable="info_phone_number">+1 (555) 123-4567</span>
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    <span data-editable="info_email_heading">Email</span>
                  </h3>
                  <p className="text-card-foreground">
                    <span data-editable="info_email_address">info@yourcarrental.com</span>
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">
                    <span data-editable="info_hours_heading">Business Hours</span>
                  </h3>
                  <p className="text-card-foreground">
                    <span data-editable="info_hours_details">Mon - Fri: 9:00 AM - 6:00 PM</span>
                    <br />
                    <span data-editable="info_hours_weekend">Sat - Sun: 10:00 AM - 4:00 PM</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder Card */}
            <Card className="bg-card text-card-foreground shadow-lg border-border h-64 lg:h-80 flex items-center justify-center">
              <CardContent className="flex items-center justify-center h-full w-full p-6">
                <p className="text-muted-foreground text-center">
                  <span data-editable="map_placeholder_text">Map Placeholder</span>
                  <br />
                  <span className="text-sm" data-editable="map_placeholder_subtext">
                    (e.g., Google Maps or OpenStreetMap embed)
                  </span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
