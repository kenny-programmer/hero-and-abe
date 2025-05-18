
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Calendar, Heart, MapPin, Users, Gift, MessageSquare, Shirt, Dress } from 'lucide-react';
import BackgroundSlider from '@/components/BackgroundSlider';
import Countdown from '@/components/Countdown';
import CustomSocialHashtags from '@/components/CustomSocialHashtags';
import FAQSection from '@/components/FAQSection';
import GiftRegistry from '@/components/GiftRegistry';
import RSVPForm from '@/components/RSVPForm';
import HeartShape from '@/components/HeartShape';
import { Card, CardContent } from "@/components/ui/card";

// Set wedding date
const weddingDate = new Date('2025-07-25T15:00:00');

const Index = () => {
  // Images for background slider
  const backgroundImages = [
    "/lovable-uploads/557cdb7d-11c9-4857-8feb-dbc301b210c3.png",
    "/lovable-uploads/abf82647-259c-43a6-a6c0-2a9e7fd7c3a5.png",
    "/lovable-uploads/b5e268ed-a6b7-4bc4-b9db-de154ff527e7.png",
    "/lovable-uploads/3c3afc5b-7ebd-4dd0-8728-41bd35554a43.png",
    "/lovable-uploads/aede685c-c53c-4b4f-811e-63db5e5b4bef.png",
    "/lovable-uploads/02043bdc-3491-4b4f-addb-146cc161e5fc.png",
    "/lovable-uploads/fb1444e0-1d9f-4bc0-82e7-c65399360227.png"
  ];

  // Active section for navigation
  const [activeSection, setActiveSection] = useState('hero');

  // Handle scroll to set active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop - 100;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Background Slider */}
      <BackgroundSlider images={backgroundImages} interval={5000} />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm py-4">
        <div className="wedding-container">
          <div className="flex justify-center">
            <div className="flex space-x-1 md:space-x-4 overflow-x-auto pb-1 px-2 whitespace-nowrap">
              <button
                onClick={() => scrollToSection('hero')}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  activeSection === 'hero' 
                    ? 'bg-wedding-primary text-white' 
                    : 'hover:bg-wedding-primary/10'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection('details')}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  activeSection === 'details' 
                    ? 'bg-wedding-primary text-white' 
                    : 'hover:bg-wedding-primary/10'
                }`}
              >
                Details
              </button>
              <button
                onClick={() => scrollToSection('venue')}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  activeSection === 'venue' 
                    ? 'bg-wedding-primary text-white' 
                    : 'hover:bg-wedding-primary/10'
                }`}
              >
                Venue
              </button>
              <button
                onClick={() => scrollToSection('dress-code')}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  activeSection === 'dress-code' 
                    ? 'bg-wedding-primary text-white' 
                    : 'hover:bg-wedding-primary/10'
                }`}
              >
                Dress Code
              </button>
              <button
                onClick={() => scrollToSection('rsvp')}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  activeSection === 'rsvp' 
                    ? 'bg-wedding-primary text-white' 
                    : 'hover:bg-wedding-primary/10'
                }`}
              >
                RSVP
              </button>
              <button
                onClick={() => scrollToSection('faqs')}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  activeSection === 'faqs' 
                    ? 'bg-wedding-primary text-white' 
                    : 'hover:bg-wedding-primary/10'
                }`}
              >
                FAQs
              </button>
              <button
                onClick={() => scrollToSection('gifts')}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  activeSection === 'gifts' 
                    ? 'bg-wedding-primary text-white' 
                    : 'hover:bg-wedding-primary/10'
                }`}
              >
                Gifts
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section id="hero" className="min-h-[90vh] flex items-center justify-center text-center py-20">
        <div className="wedding-container">
          <div className="bg-black/30 backdrop-blur-sm p-8 rounded-lg max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-white font-cursive mb-4">Abe & Hero</h1>
            <p className="text-white text-lg md:text-xl mb-8">together with their families invite you to their wedding celebration</p>
            <div className="mb-8">
              <p className="text-white text-lg md:text-2xl font-medium">Friday, July 25, 2025</p>
              <p className="text-white text-lg">3:00 PM</p>
              <p className="text-white text-lg">Shercon Resort, Lipa City, Batangas</p>
            </div>
            
            <div className="mt-12 mb-6">
              <Countdown targetDate={weddingDate} />
            </div>
            
            <Button 
              size="lg"
              className="mt-8 bg-wedding-primary hover:bg-wedding-accent text-white"
              onClick={() => scrollToSection('rsvp')}
            >
              RSVP Now
            </Button>
          </div>
        </div>
      </section>
      
      {/* Wedding Details Section */}
      <section id="details" className="py-20 bg-wedding-secondary">
        <div className="wedding-container">
          <h2 className="section-title">Wedding Details</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            <div className="text-center bg-white p-8 rounded-lg shadow-md">
              <div className="mx-auto w-16 h-16 bg-wedding-primary rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-cursive">Ceremony</h3>
              <p className="text-lg mb-2">Friday, July 25, 2025</p>
              <p className="mb-2">3:00 PM</p>
              <p>Shercon Resort Garden</p>
              <div className="mt-6">
                <img 
                  src="/lovable-uploads/f24d94cd-eee6-47f6-a253-61a549ac3528.png" 
                  alt="Wedding Ceremony Setup" 
                  className="w-full h-auto rounded-lg shadow-md" 
                />
              </div>
            </div>
            
            <div className="text-center bg-white p-8 rounded-lg shadow-md">
              <div className="mx-auto w-16 h-16 bg-wedding-primary rounded-full flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 font-cursive">Reception</h3>
              <p className="text-lg mb-2">Friday, July 25, 2025</p>
              <p className="mb-2">6:00 PM</p>
              <p>Shercon Resort Main Hall</p>
              <div className="mt-6">
                <img 
                  src="/lovable-uploads/c69118d4-54db-4db0-952e-609ac201b44b.png" 
                  alt="Wedding Reception Venue" 
                  className="w-full h-auto rounded-lg shadow-md" 
                />
              </div>
            </div>
          </div>
          
          <div className="mt-16 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-6 font-cursive text-center">Directions</h3>
            <div className="bg-white rounded-lg shadow-md p-6">
              <img 
                src="/lovable-uploads/ed547f22-7444-417a-b8ae-0c833960be62.png" 
                alt="Directions to the venue" 
                className="w-full h-auto rounded-lg" 
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Venue Section */}
      <section id="venue" className="py-20 bg-white">
        <div className="wedding-container">
          <h2 className="section-title">Venue Location</h2>
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.6709382184607!2d121.15518677579087!3d14.044861789693552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33bd6e5e40d7f393%3A0xc1dc63428cf28b00!2sShercon%20Resort%20Eco%20Adventure%20Park!5e0!3m2!1sen!2sph!4v1715962128649!5m2!1sen!2sph" 
              width="100%" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Venue Location Map"
              className="w-full"
            ></iframe>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 font-cursive">Shercon Resort</h3>
              <p className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-wedding-primary" />
                <span>Purok 6, Barangay San Sebastian, Mataas Na Kahoy, Batangas</span>
              </p>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2">From Manila via SLEX:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Drive through SOUTH LUZON EXPRESSWAY (SLEX) and take LIPA CITY TAMBO EXIT</li>
                  <li>From the exit booth, turn left and travel along FERNANDO AIR BASE</li>
                  <li>After Fernando Air Base, turn right going to MATAAS NA KAHOY</li>
                  <li>Follow the signages along the way</li>
                  <li>Travel time from Alabang is 1.5 hours</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Dress Code Section */}
      <section id="dress-code" className="py-20 bg-wedding-secondary">
        <div className="wedding-container">
          <h2 className="section-title">Dress Code & Colors</h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-6 text-center">Color Palette</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="color-swatch terracotta"></div>
                      <p>Terracotta</p>
                    </div>
                    <div className="text-center">
                      <div className="color-swatch amber"></div>
                      <p>Amber</p>
                    </div>
                    <div className="text-center">
                      <div className="color-swatch golden"></div>
                      <p>Golden</p>
                    </div>
                  </div>
                  <p className="text-center mt-4 italic">We would love to see you in these shades</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-bold mb-6 text-center">Dress Suggestions</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center justify-center">
                        <Dress className="w-5 h-5 mr-1" /> For Ladies
                      </h4>
                      <p className="text-center text-sm">Cocktail dresses, formal separates, or elegant jumpsuits in warm tones</p>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2 flex items-center justify-center">
                        <Shirt className="w-5 h-5 mr-1" /> For Gentlemen
                      </h4>
                      <p className="text-center text-sm">Dress shirts in neutral or warm tones with slacks or suits</p>
                    </div>
                  </div>
                  
                  <p className="text-center mt-6 font-medium">Semi-Formal Attire</p>
                </div>
              </div>
              
              <div className="mt-8">
                <HeartShape className="w-48 h-40 mx-auto">
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-2">Semi-Formal</h3>
                    <p className="text-sm">Earth tones & warm colors</p>
                  </div>
                </HeartShape>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Social Hashtags Section */}
      <CustomSocialHashtags />
      
      {/* RSVP Section */}
      <section id="rsvp" className="py-20 bg-white">
        <div className="wedding-container">
          <h2 className="section-title">RSVP</h2>
          <RSVPForm />
          
          <div className="mt-16 text-center">
            <p className="text-wedding-text">
              For any questions regarding the RSVP, please contact us at <a href="mailto:abeandherowedding@gmail.com" className="text-wedding-primary">abeandherowedding@gmail.com</a>
            </p>
          </div>
        </div>
      </section>
      
      {/* FAQs Section */}
      <section id="faqs" className="py-20 bg-wedding-secondary">
        <FAQSection />
      </section>
      
      {/* Gifts Section */}
      <section id="gifts" className="py-20 bg-white">
        <GiftRegistry />
      </section>
      
      {/* Admin Link */}
      <div className="py-4 bg-wedding-primary text-white text-center">
        <div className="wedding-container">
          <Link to="/admin" className="text-white hover:underline">Admin Panel</Link>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="py-8 bg-wedding-text text-white text-center">
        <div className="wedding-container">
          <p className="mb-2">Abe & Hero's Wedding</p>
          <p>July 25, 2025 | Shercon Resort, Batangas</p>
          <p className="mt-4 text-sm opacity-70">© 2025 Abe & Hero</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
