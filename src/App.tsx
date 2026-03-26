import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';
import CookieConsent from './components/ui/CookieConsent';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: true,
      offset: 80,
    });
  }, []);

  return (
    <>
      <a
        href="#sobre"
        style={{
          position: 'absolute',
          top: '-40px',
          left: 0,
          background: '#4F46E5',
          color: '#ffffff',
          padding: '8px 16px',
          zIndex: 9999,
          fontWeight: 700,
          textDecoration: 'none',
          borderRadius: '0 0 8px 0',
          transition: 'top 0.2s',
        }}
        onFocus={(e) => { (e.currentTarget as HTMLAnchorElement).style.top = '0'; }}
        onBlur={(e) => { (e.currentTarget as HTMLAnchorElement).style.top = '-40px'; }}
      >
        Pular para o conteúdo principal
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer />
      <CookieConsent />
    </>
  );
}

export default App;
