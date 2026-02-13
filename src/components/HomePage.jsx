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
  return (
    <>
      <Header /> {/* Jangan kirim props */}
      <main>
        <Hero />
        <SmallFeatures />
        <About />
        <Team />
        <Services />
        <Counter />
        <Clients />
        <FAQ />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
};

export default HomePage;