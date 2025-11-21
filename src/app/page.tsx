import Announcementbar from '@/components/sections/home/Announcementbar'
import Hero from '@/components/sections/home/Hero'
import Carfleet from '@/components/sections/home/Carfleet'
import Testimonials from '@/components/sections/home/Testimonials'
import Cta from '@/components/sections/home/Cta'
import Contact from '@/components/sections/home/Contact'
import Newsletter from '@/components/sections/home/Newsletter'
import Cookiebanner from '@/components/sections/home/Cookiebanner'

export default function HomePage() {
  return (
    <>
      <section id="announcement-bar">
        <Announcementbar />
      </section>
      <section id="hero">
        <Hero />
      </section>
      <section id="car-fleet">
        <Carfleet />
      </section>
      <section id="testimonials">
        <Testimonials />
      </section>
      <section id="cta">
        <Cta />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <section id="newsletter">
        <Newsletter />
      </section>
      <section id="cookie-banner">
        <Cookiebanner />
      </section>
    </>
  )
}