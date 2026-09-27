import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { ResumeProjects } from './components/ResumeProjects';
import { Education } from './components/Education';
import { ContactForm } from './components/contact/ContactForm';
import { AdminResponseSection } from './components/contact/AdminResponseSection';
import { GoogleSheetsModal } from './components/contact/GoogleSheetsModal';
import { ContactCardsSection } from './components/contact-cards/ContactCardsSection';
import { LikeCardsSection } from './components/mini-projects/LikeCardsSection';
import { GithubDeployGuide } from './components/GithubDeployGuide';
import { Footer } from './components/Footer';
import { ContactResponse, GoogleSheetsConfig, LikeCardItem } from './types';

// Pre-seeded responses for immediate testing
const INITIAL_DEMO_RESPONSES: ContactResponse[] = [
  {
    id: 'resp_demo_1',
    name: 'David Miller',
    email: 'david.miller@fintechglobal.com',
    phone: '+1 (415) 555-0199',
    subject: 'Senior Frontend Developer Role Inquiry',
    message: 'Hello Alex! We were impressed by your React component architecture and responsive design work. We have an open Senior Frontend role on our team and would love to schedule a preliminary conversation.',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
    formattedDate: 'Sep 26, 2026, 08:30 PM',
    status: 'unread',
    source: 'localStorage',
  },
  {
    id: 'resp_demo_2',
    name: 'Samantha Ray',
    email: 'samantha@creativepulse.io',
    phone: '+1 (212) 555-0143',
    subject: 'Client Web Application Consultation',
    message: 'Hi! We need a developer with experience in Google Sheets AppsScript webhook integration and local storage persistence for a client dashboard project. Could you share your availability for next week?',
    timestamp: new Date(Date.now() - 3600000 * 24).toISOString(),
    formattedDate: 'Sep 25, 2026, 04:15 PM',
    status: 'read',
    source: 'googleSheets',
  },
];

// Initial Card Items whose titles will be passed as props from App file
const INITIAL_CARD_ITEMS: LikeCardItem[] = [
  {
    id: 'like_1',
    title: 'Component-Driven UI Systems',
    description: 'Decomposing complex visual layouts into isolated, testable, and reusable React components with zero prop drilling.',
    category: 'React Architecture',
    tags: ['Components', 'TypeScript', 'CleanCode'],
    initialLiked: true,
    likesCount: 1,
  },
  {
    id: 'like_2',
    title: 'Chrome LocalStorage JSON Engine',
    description: 'Resilient client-side persistence pipeline serializing and parsing structured JSON entries with full timestamp retrieval.',
    category: 'Data Persistence',
    tags: ['localStorage', 'JSON', 'DOM'],
    initialLiked: false,
    likesCount: 0,
  },
  {
    id: 'like_3',
    title: 'Google AppsScript Webhook Sync',
    description: 'Serverless integration bridge transferring form submissions asynchronously into Google Sheets database spreadsheets.',
    category: 'Cloud Integration',
    tags: ['AppsScript', 'Webhooks', 'REST'],
    initialLiked: true,
    likesCount: 1,
  },
  {
    id: 'like_4',
    title: 'Dynamic Contact Cards SPA',
    description: 'Modular parent UserList component dynamically rendering custom user contact cards on the same page with live filtering.',
    category: 'Single Page App',
    tags: ['SPA', 'UserList', 'DynamicDOM'],
    initialLiked: false,
    likesCount: 0,
  },
  {
    id: 'like_5',
    title: 'Light & Dark Theme Switcher',
    description: 'CSS variables and Tailwind dark mode engine providing smooth transitions and persistent system preferences.',
    category: 'UI/UX Design',
    tags: ['TailwindCSS', 'Accessibility', 'Theme'],
    initialLiked: true,
    likesCount: 1,
  },
  {
    id: 'like_6',
    title: 'GitHub Pages Automated CI/CD',
    description: 'Continuous integration and deployment workflow compiling Vite assets and serving a public web application.',
    category: 'DevOps',
    tags: ['GitHub', 'gh-pages', 'Vite'],
    initialLiked: false,
    likesCount: 0,
  },
];

export default function App() {
  // 1. Chrome localStorage Response Retrieval state
  const [responses, setResponses] = useState<ContactResponse[]>(() => {
    try {
      const stored = localStorage.getItem('devfolio_contact_responses');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      // If empty, initialize with realistic sample data
      localStorage.setItem('devfolio_contact_responses', JSON.stringify(INITIAL_DEMO_RESPONSES));
      return INITIAL_DEMO_RESPONSES;
    } catch {
      return INITIAL_DEMO_RESPONSES;
    }
  });

  // 2. Google Sheets Configuration state
  const [sheetsConfig, setSheetsConfig] = useState<GoogleSheetsConfig>(() => {
    try {
      const stored = localStorage.getItem('devfolio_sheets_config');
      return stored ? JSON.parse(stored) : {
        scriptUrl: '',
        sheetName: 'Responses',
        syncEnabled: false,
      };
    } catch {
      return {
        scriptUrl: '',
        sheetName: 'Responses',
        syncEnabled: false,
      };
    }
  });

  const [isSheetsModalOpen, setIsSheetsModalOpen] = useState(false);

  // 3. Mini Project - Items passed as props from App file to LikeCard components
  const [cardItems, setCardItems] = useState<LikeCardItem[]>(() => {
    try {
      const stored = localStorage.getItem('devfolio_like_card_items');
      return stored ? JSON.parse(stored) : INITIAL_CARD_ITEMS;
    } catch {
      return INITIAL_CARD_ITEMS;
    }
  });

  // Save responses to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('devfolio_contact_responses', JSON.stringify(responses));
    } catch (err) {
      console.error('Failed to sync responses to localStorage:', err);
    }
  }, [responses]);

  // Save sheets config whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('devfolio_sheets_config', JSON.stringify(sheetsConfig));
    } catch (err) {
      console.error('Failed to sync sheets config:', err);
    }
  }, [sheetsConfig]);

  // Save card items
  useEffect(() => {
    try {
      localStorage.setItem('devfolio_like_card_items', JSON.stringify(cardItems));
    } catch (err) {
      console.error('Failed to sync card items:', err);
    }
  }, [cardItems]);

  // Handler: Add new inquiry from Contact Form
  const handleAddResponse = (newResponse: ContactResponse) => {
    setResponses((prev) => [newResponse, ...prev]);
  };

  // Handler: Delete inquiry from Admin inbox
  const handleDeleteResponse = (id: string) => {
    setResponses((prev) => prev.filter((r) => r.id !== id));
  };

  // Handler: Toggle Read / Unread status
  const handleToggleStatus = (id: string) => {
    setResponses((prev) =>
      prev.map((r) =>
        r.id === id ? { ...r, status: r.status === 'unread' ? 'read' : 'unread' } : r
      )
    );
  };

  // Handler: Clear all inquiries
  const handleClearAllResponses = () => {
    setResponses([]);
    localStorage.removeItem('devfolio_contact_responses');
  };

  // Handler: Re-seed sample data
  const handleSeedDemoResponses = () => {
    setResponses(INITIAL_DEMO_RESPONSES);
    localStorage.setItem('devfolio_contact_responses', JSON.stringify(INITIAL_DEMO_RESPONSES));
  };

  // Handler: Save Google Sheets Configuration
  const handleSaveSheetsConfig = (newConfig: GoogleSheetsConfig) => {
    setSheetsConfig(newConfig);
  };

  // Handler: Test Google Sheets webhook
  const handleTestSync = async (): Promise<boolean> => {
    if (!sheetsConfig.scriptUrl) return false;
    try {
      await fetch(sheetsConfig.scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: 'test_' + Date.now(),
          name: 'Test Ping',
          email: 'test@devfolio.app',
          subject: 'Connection Test',
          message: 'Testing Google Apps Script Webhook integration.',
          timestamp: new Date().toISOString(),
        }),
      });
      return true;
    } catch {
      return false;
    }
  };

  // Handler: Add custom card title from App file
  const handleAddCardTitle = (title: string, category: string, description: string) => {
    const newCard: LikeCardItem = {
      id: 'like_' + Date.now(),
      title,
      description,
      category,
      tags: ['AppProps', 'useState', 'Custom'],
      initialLiked: false,
      likesCount: 0,
    };
    setCardItems((prev) => [newCard, ...prev]);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const unreadCount = responses.filter((r) => r.status === 'unread').length;

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
        
        {/* Navigation Bar with all section links and theme toggle */}
        <Navbar
          unreadCount={unreadCount}
          onOpenAdmin={() => scrollToSection('admin')}
        />

        {/* Main Content with proper HTML5 container tags */}
        <main className="flex-1">
          {/* 1. Hero Section */}
          <Hero onScrollToContact={() => scrollToSection('contact')} />

          {/* 2. About Me Section */}
          <About />

          {/* 3. Skills Section */}
          <Skills />

          {/* 4. Experience Timeline Section */}
          <Experience />

          {/* 5. Projects Showcase Section */}
          <ResumeProjects />

          {/* 6. Education & Certifications Section */}
          <Education />

          {/* 7. React Components Contact Cards Project (SPA with UserList) */}
          <ContactCardsSection />

          {/* 8. React Mini Project (LikeCard with title props passed from App & useState Hook) */}
          <LikeCardsSection
            cardItems={cardItems}
            onAddCardTitle={handleAddCardTitle}
          />

          {/* 9. Contact Me Form with Chrome localStorage JSON persistence & AppsScript */}
          <ContactForm
            onResponseAdded={handleAddResponse}
            sheetsConfig={sheetsConfig}
            onOpenSheetsModal={() => setIsSheetsModalOpen(true)}
            onScrollToAdmin={() => scrollToSection('admin')}
          />

          {/* 10. Admin Login & User Responses Section (show/hide scenario & dynamic response display) */}
          <AdminResponseSection
            responses={responses}
            onDeleteResponse={handleDeleteResponse}
            onToggleStatus={handleToggleStatus}
            onClearAll={handleClearAllResponses}
            onSeedDemoData={handleSeedDemoResponses}
            sheetsConfig={sheetsConfig}
            onOpenSheetsModal={() => setIsSheetsModalOpen(true)}
          />

          {/* 11. GitHub Pages Deployment Guide */}
          <GithubDeployGuide />
        </main>

        {/* Google Sheets Configuration Modal */}
        <GoogleSheetsModal
          isOpen={isSheetsModalOpen}
          onClose={() => setIsSheetsModalOpen(false)}
          config={sheetsConfig}
          onSaveConfig={handleSaveSheetsConfig}
          onTestSync={handleTestSync}
        />

        {/* Footer */}
        <Footer />

      </div>
    </ThemeProvider>
  );
}
