import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import StoreSection from "../components/StoreSection";
import FeatureSection from "../components/FeatureSection";
import StepCard from "../components/StepCard";
import Footer from "../components/Footer";

function Home() {
  return (
    <>

      <Navbar />

      <Hero />

      <StoreSection />

      <FeatureSection />

      <section
        className="how-section"
        id="how-it-works"
      >

        <div className="how-heading">

          <span>HOW IT WORKS</span>

          <h2>
            Start Tracking in 4 Simple Steps
          </h2>

          <p>
            TrackKart continuously monitors your products
            and notifies you when the price reaches your target.
          </p>

        </div>

        <div className="steps">

          <StepCard
            number="1"
            title="Paste Product URL"
            description="Copy and paste any supported Amazon or Flipkart product link."
          />

          <StepCard
            number="2"
            title="Set Target Price"
            description="Choose the maximum price you're willing to pay."
          />

          <StepCard
            number="3"
            title="Automatic Monitoring"
            description="TrackKart checks the product price automatically in the background."
          />

          <StepCard
            number="4"
            title="Receive Email Alert"
            description="You'll instantly receive an email once your target price is reached."
          />

        </div>

      </section>

      <Footer />

    </>
  );
}

export default Home;