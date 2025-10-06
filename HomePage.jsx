import React from 'react';
import HeroSection from '../components/HeroSection';
import ServicesSection from '../components/ServicesSection';
import ProjectsSection from '../components/ProjectsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';

// Mock image URLs (replace these with your actual image paths in your setup)
const profileImageUrl = "https://github.com/rajlucario/portfolio-images/blob/main/Gemini_Generated_Image_wee19owee19owee1.png?raw=true";
const contactImageUrl = "https://placehold.co/800x600/1f2937/f3f4f6?text=Lets+Work";

const HomePage = () => (
  <>
    <HeroSection profileImageUrl={profileImageUrl} />
    <ServicesSection />
    <ProjectsSection />
    <TestimonialsSection />
    <FAQSection />
    <ContactSection contactImageUrl={contactImageUrl} />
  </>
);

export default HomePage;
