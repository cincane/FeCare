import { useState } from "react"; // Tambah ini
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "./ScrollToTop";
import Hero from "./Hero";
import SmallFeatures from "./SmallFeatures";
import About from "./About";
import Team from "./Team";
import Services from "./Services";
import Counter from "./Counter";
import Clients from "./Clients";
import FAQ from "./FAQ";

const HomePage = () => {
  // Tambah state untuk mengontrol mobile menu
  const [navigationOpen, setNavigationOpen] = useState(false);

  return (
    <>
      <Header 
        navigationOpen={navigationOpen}
        setNavigationOpen={setNavigationOpen}
      />
      <main>
        <Hero />
        <SmallFeatures />
        <About />
        <Team />
        <Services />
        <Counter />
        <FAQ />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default HomePage;