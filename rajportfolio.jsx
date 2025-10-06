import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ChevronDown, ExternalLink, Mail, Phone, Twitter, Linkedin, Aperture, Sparkles } from 'lucide-react';

// API Key and API URL
const apiKey = "AIzaSyAw7Yup1wSTN09BwVY5y9MTBKe3yEXHHUI";
const apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent";

// Function to handle API call with exponential backoff
const fetchWithBackoff = async (url, options, maxRetries = 5) => {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if (attempt === maxRetries - 1) {
        console.error("Max retries reached. Failed to fetch:", error);
        throw error;
      }
      const delay = Math.pow(2, attempt) * 1000;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

// --- MOCK DATA ---
const SERVICES_DATA = [
  { id: 1, title: 'UI / UX DESIGN', description: "Crafting intuitive and engaging digital interfaces that prioritize user experience and aesthetic appeal." },
  { id: 2, title: 'GRAPHIC DESIGN', description: "Delivering high-impact visual content, including branding, marketing materials, and digital assets." },
  { id: 3, title: 'WEB DESIGN', description: "Building fast, responsive, and scalable web designs using modern frameworks like React and Next.js, Figma, AdobeXD." },
  { id: 4, title: 'ARTIST', description: "I am a guy who is dependant on my creativity and of course, AI can't replace me!." },
];

const PROJECTS_DATA = [
  { id: 1, title: 'GD FOR AGENCY', category: 'Graphic Design', image: 'https://github.com/rajlucario/portfolio-images/blob/main/IMG_20250512_222825_099.jpg?raw=true', mockDescription: "Made lot of Graphic Designs for an Advertising Agency and trusted by 1000+ people." },
  { id: 2, title: 'APP DESIGN FOR INAI AI', category: 'UI / UX Design', image: 'https://github.com/rajlucario/portfolio-images/blob/main/Screenshot_2025-10-06-09-50-24-21_1c337646f29875672b5a61192b9010f9.jpg?raw=true', mockDescription: "Designed an application UI/UX Design for an AI named 'Inai'." },
  { id: 3, title: 'TRYLOOP WRITER', category: 'Technical Writing', image: 'https://github.com/rajlucario/portfolio-images/blob/main/Gemini_Generated_Image_pa1q1fpa1q1fpa1q%20copy.png?raw=true', mockDescription: "Making lot of Topics and Contents for a Start Up named TRYLOOP." },
];

const FAQ_DATA = [
  { id: 1, question: 'WHAT SERVICES DO YOU OFFER?', answer: "I specialize in end-to-end digital product design and development, covering UI/UX, branding, and modern front-end engineering." },
  { id: 2, question: 'HOW DOES THE DESIGN PROCESS WORK?', answer: "The process involves discovery, conceptualization, wireframing, prototyping, development handoff, and iterative feedback." },
  { id: 3, question: 'HOW LONG DOES A PROJECT USUALLY TAKE?', answer: "Timelines vary by scope. A typical website redesign takes 4-8 weeks, while smaller projects are 2-3 weeks." },
  { id: 4, question: 'DO YOU OFFER REVISIONS?', answer: "Yes, all project contracts include a set number of revision rounds to ensure you are fully satisfied with the final result." },
];

// --- REUSABLE COMPONENTS ---

const AccordionItem = ({ item, index, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  const number = index + 1;
  const displayNumber = type === 'service' ? `${number}.` : `${number}. `;
  return (
    <div className={`border-b border-gray-200 transition-all duration-300 ${type === 'faq' ? 'py-6' : ''}`}>
      <button className="flex justify-between items-center w-full text-left py-4" onClick={() => setIsOpen(!isOpen)}>
        <span className={`text-4xl md:text-5xl font-extrabold tracking-tight ${type === 'service' ? 'text-gray-900' : 'text-gray-700'}`}>
          {displayNumber}{item.question || item.title}
        </span>
        <ChevronDown className={`w-8 h-8 text-gray-700 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
      </button>
      {isOpen && (
        <div className="pt-4 pb-8 pr-12 text-lg text-gray-600 max-w-4xl">
          <p>{item.description || item.answer}</p>
        </div>
      )}
    </div>
  );
};

// --- SECTION COMPONENTS ---

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 py-6 px-8 flex justify-between items-center bg-white/90 backdrop-blur-md">
    <div className="flex items-center space-x-2">
      <Aperture className="w-6 h-6 text-gray-900" />
      <span className="font-bold text-lg">RAJ NARAYANAN V</span>
    </div>    
    <nav className="hidden sm:flex space-x-8 text-sm font-medium uppercase text-gray-600">
      <Link to="/" className="hover:text-gray-900 transition-colors">Home</Link>
      <Link to="/about" className="hover:text-gray-900 transition-colors">About</Link>
      <Link to="/services" className="hover:text-gray-900 transition-colors">Services</Link>
      <Link to="/projects" className="hover:text-gray-900 transition-colors">Work</Link>
      <Link to="/contact" className="hover:text-gray-900 transition-colors">Contact</Link>
    </nav>
    
  </header>
);

const HeroSection = ({ profileImageUrl }) => (
  <section className="min-h-screen pt-32 pb-16 px-4 md:px-8 relative overflow-hidden">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between">
      <div className="md:w-1/2 z-10">
        <div className="flex items-center space-x-2 mb-4">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-sm font-medium text-gray-700">Available for work</span>
        </div>
        <h1 className="text-[5rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-extrabold leading-none uppercase tracking-tighter text-gray-900">GRAPHIC</h1>
        <h1 className="text-[5rem] sm:text-[8rem] md:text-[10rem] lg:text-[12rem] xl:text-[14rem] font-extrabold leading-none uppercase tracking-tighter text-gray-900 -mt-10 md:-mt-20">DESIGNER</h1>
        <p className="text-xl mt-4 max-w-md text-gray-700">I'm a Zoho Certified Designer</p>
      </div>
      <div className="md:w-1/2 mt-16 md:mt-0 flex justify-center md:justify-end z-10">
        <div className="relative w-80 h-96 sm:w-96 sm:h-[30rem] bg-gray-200 shadow-2xl rounded-xl overflow-hidden transform rotate-3">
          <img src={profileImageUrl} alt="Duncan Robert - Digital Designer" className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x500/0f172a/f8fafc?text=Your+Photo"; }} />
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-gray-200">
      <h2 className="text-6xl md:text-8xl font-extrabold uppercase tracking-tighter text-gray-900">WHAT I CAN DO FOR YOU?</h2>
      <p className="text-xl mt-6 max-w-2xl text-gray-600">I can turn your creativity and change into my creativity and deliver it as a product for you.</p>
    </div>
  </section>
);

const ServicesSection = () => (
  <section className="py-24 px-4 md:px-8 bg-white">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-6xl md:text-8xl font-extrabold uppercase tracking-tighter text-gray-900 mb-12">MY SERVICES</h2>
      <div className="space-y-4">
        {SERVICES_DATA.map((item, index) => (
          <AccordionItem key={item.id} item={item} index={index} type="service" />
        ))}
      </div>
    </div>
  </section>
);

const AboutSection = () => {
  const initialBio = "Hi, I'm **RAJ** — a passionate developer specializing in front-end technologies. I use React, Tailwind, and modern tooling to build web solutions that look incredible and perform flawlessly, crafting meaningful and impactful digital experiences.";
  const [bioText, setBioText] = useState(initialBio);
  const [loading, setLoading] = useState(false);
  const [refineCount, setRefineCount] = useState(0);

  const refineBio = async () => {
    setLoading(true);
    const userQuery = `Refine and expand the following professional bio draft for a portfolio website. Focus on a confident, expert tone and keep it under 150 words. Draft: "${bioText}"`;
    const systemPrompt = "Act as a professional copywriter specializing in technical portfolios.";

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
    };

    try {
      const result = await fetchWithBackoff(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (generatedText) {
        setBioText(generatedText.replace(/\*\*/g, ''));
        setRefineCount(prev => prev + 1);
      }
    } catch (error) {
      console.error("AI Bio Refinement Failed:", error);
      alert("Failed to refine bio. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 px-4 md:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl md:text-8xl font-extrabold uppercase tracking-tighter text-gray-900 mb-12">ABOUT ME</h2>
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="lg:w-3/5">
            <div className="mb-10 p-6 bg-white rounded-xl shadow-md border-t-4 border-indigo-500">
              <h3 className="text-xl font-bold mb-3 flex items-center">
                Your Professional Bio
                {refineCount > 0 && <span className="ml-3 text-xs bg-indigo-100 text-indigo-700 py-1 px-3 rounded-full">{refineCount} Refinements</span>}
              </h3>
              <textarea value={bioText} onChange={(e) => setBioText(e.target.value)} rows="5" className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:ring-indigo-500 focus:border-indigo-500" />
              <button onClick={refineBio} disabled={loading} className="mt-3 py-2 px-6 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition-colors disabled:opacity-50 flex items-center">
                {loading ? ('Refining...') : (<><Sparkles className="w-5 h-5 mr-2" />Refine Bio with AI</>)}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-8 mb-12">
              <div></div>
              <div></div>
              <div></div>
            </div>
            <button className="text-sm font-bold uppercase py-3 px-6 border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors">MY STORY</button>
          </div>
          <div className="lg:w-1/3 mt-12 lg:mt-0 p-8 bg-white rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-4">Contact Details</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900 flex items-center"><Mail className="w-4 h-4 mr-2" /> rajnarayananabc@gmail.com</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Call Today</p>
                <p className="font-medium text-gray-900 flex items-center"><Phone className="w-4 h-4 mr-2" /> +91 8838278976</p>
              </div>
            </div>
            <div className="flex space-x-4 mt-6 border-t pt-4">
              <Twitter className="w-5 h-5 text-gray-500 hover:text-gray-900 cursor-pointer" />
              <Linkedin className="w-5 h-5 text-gray-500 hover:text-gray-900 cursor-pointer" />
              <ExternalLink className="w-5 h-5 text-gray-500 hover:text-gray-900 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [description, setDescription] = useState(project.mockDescription);
  const [loading, setLoading] = useState(false);

  const generateDescription = async () => {
    setLoading(true);
    const userQuery = `Generate a compelling, detailed, single-paragraph project description (under 50 words) for a portfolio, focusing on the key achievement for this project: ${project.title}, which is in the category of ${project.category}. The original idea was: "${project.mockDescription}"`;
    const systemPrompt = "Act as a professional marketing copywriter.";

    const payload = {
      contents: [{ parts: [{ text: userQuery }] }],
      systemInstruction: { parts: [{ text: systemPrompt }] },
    };

    try {
      const result = await fetchWithBackoff(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      if (generatedText) {
        setDescription(generatedText);
      }
    } catch (error) {
      console.error("AI Description Generation Failed:", error);
      alert("Failed to generate description. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-[60vh] overflow-hidden rounded-xl group cursor-pointer shadow-lg" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      <img src={project.image} alt={project.title} className={`w-full h-full object-cover transition-transform duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-10 flex flex-col justify-end">
        <span className="text-xs uppercase font-medium text-white mb-2 tracking-widest bg-indigo-500 w-fit px-2 py-1 rounded">{project.category}</span>
        <h3 className="text-3xl font-extrabold text-white uppercase leading-tight mb-2">{project.title}</h3>
        <p className="text-gray-200 text-sm mb-4 max-w-lg">{description}</p>
        <button onClick={generateDescription} disabled={loading} className="w-fit px-3 py-1 bg-white/10 text-white text-xs font-semibold rounded-full hover:bg-white/20 transition-colors disabled:opacity-50 flex items-center">
          {loading ? ('Generating...') : (<><Sparkles className="w-3 h-3 mr-1 text-yellow-300" />Generate Description</>)}
        </button>
      </div>
      <div className={`absolute top-10 right-10 w-12 h-12 bg-white rounded-full flex items-center justify-center transition-all duration-300 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <ExternalLink className="w-5 h-5 text-gray-900" />
      </div>
    </div>
  );
};

const ProjectsSection = () => (
  <section className="py-24 px-4 md:px-8 bg-gray-900">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-6xl md:text-8xl font-extrabold uppercase tracking-tighter text-white mb-12">FEATURED PROJECTS</h2>
      <p className="text-xl text-gray-400 mb-16 max-w-3xl">These selected projects reflect my passion for blending strategy with creativity — solving real problems through thoughtful design and impactful storytelling.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {PROJECTS_DATA.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <div className="text-center mt-20">
        <button className="text-sm font-bold uppercase py-4 px-10 border-2 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white transition-colors">BROWSE ALL PROJECTS</button>
      </div>
    </div>
  </section>
);

const TestimonialsSection = () => (
  <section className="py-24 px-4 md:px-8 bg-white">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-6xl md:text-8xl font-extrabold uppercase tracking-tighter text-gray-900 mb-6">WHAT MY CLIENTS SAY</h2>
      <p className="text-xl text-gray-600 mb-16 max-w-4xl">Here's what my clients like about me and their satisfaction is my important factor than cost of the work. That got me an biggest impact in freelancing and doing High Quality Works.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        <div className="md:col-span-2 lg:col-span-2 p-8 bg-indigo-500 rounded-xl text-white flex flex-col justify-end">
          <p className="text-7xl font-extrabold">88%</p>
          <p className="text-xl font-medium mt-2">Satisfaction Rate</p>
        </div>
        <div className="p-6 bg-gray-100 rounded-xl">
          <p className="text-sm text-gray-700 italic mb-4">"Every Work Felt like a new Life to creativity and Greatest Of All Time!"</p>
          <p className="font-bold text-gray-900">Santosh</p>
          <p className="text-sm text-gray-500">Founder of Sathyas Ad Agency</p>
        </div>
        <div className="p-6 bg-gray-100 rounded-xl">
          <p className="text-sm text-gray-700 italic mb-4">"Captures Everyframe with Emotions and Satisfactions of every people and The best person I know with color psychology skills"</p>
          <p className="font-bold text-gray-900">ANTO JEBIKSAN</p>
          <p className="text-sm text-gray-500">Founder of Cresard</p>
        </div>
      </div>
    </div>
  </section>
);

const FAQSection = () => (
  <section className="py-24 px-4 md:px-8 bg-gray-50">
    <div className="max-w-7xl mx-auto">
      <h2 className="text-6xl md:text-8xl font-extrabold uppercase tracking-tighter text-gray-900 mb-12">FREQUENTLY ASKED QUESTIONS</h2>
      <div className="space-y-4">
        {FAQ_DATA.map((item, index) => (
          <AccordionItem key={item.id} item={item} index={index} type="faq" />
        ))}
      </div>
    </div>
  </section>
);

const ContactSection = ({ contactImageUrl }) => {
  const [formData, setFormData] = useState({ name: '', email: '', service: '', message: '' });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    console.log('Success: Thank you for your message! I will be in touch shortly.');
    setFormData({ name: '', email: '', service: '', message: '' });
  };
  return (
    <section className="py-24 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl md:text-8xl font-extrabold uppercase tracking-tighter text-gray-900 mb-16">LET'S WORK TOGETHER</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="relative h-[600px] rounded-xl overflow-hidden shadow-2xl">
            <img src={contactImageUrl} alt="Let's Connect" className="w-full h-full object-cover" onError={(e) => { e.target.onerror = null; e.target.src = "https://raw.githubusercontent.com/rajlucario/portfolio-images/e5dfedf60d16a412b4420ca3397e832ea787e657/WhatsApp%20Image%202025-10-06%20at%2010.15.34%20AM.jpeg"; }} />
            <div className="absolute bottom-10 left-10 text-5xl font-extrabold text-white bg-gray-900 p-4 rounded-full">👋</div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="text" name="name" placeholder="Name" required value={formData.name} onChange={handleChange} className="p-4 border-b-2 border-gray-200 focus:border-indigo-500 outline-none text-lg transition-colors" />
              <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} className="p-4 border-b-2 border-gray-200 focus:border-indigo-500 outline-none text-lg transition-colors" />
            </div>
            <select name="service" required value={formData.service} onChange={handleChange} className="w-full p-4 border-b-2 border-gray-200 focus:border-indigo-500 outline-none text-lg text-gray-500 transition-colors bg-white">
              <option value="">Select Service Needed?</option>
              {SERVICES_DATA.map(s => <option key={s.id} value={s.title}>{s.title}</option>)}
            </select>
            <textarea name="message" placeholder="What Can I Help You With?" rows="5" required value={formData.message} onChange={handleChange} className="w-full p-4 border-b-2 border-gray-200 focus:border-indigo-500 outline-none text-lg transition-colors"></textarea>
            <button type="submit" className="w-full py-5 bg-gray-900 text-white font-bold uppercase tracking-widest text-lg hover:bg-indigo-600 transition-colors rounded-lg shadow-xl">SUBMIT</button>
          </form>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-white py-12 px-4 md:px-8">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-sm">
      <p>© Copyright 2025. All Rights Reserved by olddshen</p>
      <div className="flex space-x-6">
        <p className="text-gray-400">Email: <span className="text-white">designer@example.com</span></p>
        <p className="text-gray-400">Call Today: <span className="text-white">+1 (555) 123-4567</span></p>
        <div className="flex space-x-2">
          <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
          <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
        </div>
      </div>
    </div>
  </footer>
);

// --- PAGE COMPONENTS ---

const HomePage = () => {
  const profileImageUrl = "https://github.com/rajlucario/portfolio-images/blob/main/Gemini_Generated_Image_wee19owee19owee1.png?raw=true";
  const contactImageUrl = "https://raw.githubusercontent.com/rajlucario/portfolio-images/e5dfedf60d16a412b4420ca3397e832ea787e657/WhatsApp%20Image%202025-10-06%20at%2010.15.34%20AM.jpeg";
  return (
    <>
      <HeroSection profileImageUrl={profileImageUrl} />
      <ServicesSection />
      <AboutSection />
      <ProjectsSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection contactImageUrl={contactImageUrl} />
    </>
  );
};

const AboutPage = () => <AboutSection />;
const ServicesPage = () => <ServicesSection />;
const ProjectsPage = () => <ProjectsSection />;
const ContactPage = () => {
  const contactImageUrl = "https://placehold.co/800x600/1f2937/f3f4f6?text=Lets+Work";
  return <ContactSection contactImageUrl={contactImageUrl} />;
};

// --- MAIN APP COMPONENT (Router) ---

const RajPortfolio = () => {
  return (
    <Router>
      <div className="min-h-screen font-sans">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default RajPortfolio;
