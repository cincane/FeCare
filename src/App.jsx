import { useState, useEffect } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import SmallFeatures from "./components/SmallFeatures";
import About from "./components/About";
import Team from "./components/Team";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Projects from "./components/Projects";
import Testimonials from "./components/Testimonials";
import Counter from "./components/Counter";
import Clients from "./components/Clients";
import CTA from "./components/CTA";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  // Global state similar to Alpine.js x-data
  const [darkMode, setDarkMode] = useState(true);
  const [stickyMenu, setStickyMenu] = useState(false);
  const [navigationOpen, setNavigationOpen] = useState(false);
  const [scrollTop, setScrollTop] = useState(false);

  // Load dark mode from localStorage (similar to Alpine x-init)
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  // Save dark mode to localStorage
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));

    // Toggle dark mode class on body
    if (darkMode) {
      document.body.classList.add("b", "eh");
    } else {
      document.body.classList.remove("b", "eh");
    }
  }, [darkMode]);

  // Handle scroll events for sticky header and scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setStickyMenu(window.pageYOffset > 20);
      setScrollTop(window.pageYOffset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        stickyMenu={stickyMenu}
        navigationOpen={navigationOpen}
        setNavigationOpen={setNavigationOpen}
      />

      <main>
        <Hero />
        <SmallFeatures />
        <About />
        <Team />
        <Services />
        <Pricing />
        <Projects />
        <Testimonials />
        <Counter />
        <Clients />
        <CTA />
        <FAQ />
      </main>

      <Footer />
      <ScrollToTop scrollTop={scrollTop} />
    </>
  );
}

export default App;
