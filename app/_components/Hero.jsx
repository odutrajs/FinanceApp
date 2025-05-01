import React from "react";

import HeroSection from "../_components/Hero/HeroSection";
import FeaturesSection from "../_components/Hero/FeatureSection";
import Testimonials from "../_components/Hero/Testimonials";
import PlansSection from "../_components/Hero/PlansSection";
import IntegrationSection from "../_components/Hero/IntegrationSection";
import CommonQuestions from "../_components/Hero/CommonQuestions";
import FinalCta from "../_components/Hero/FinalCta";
import Footer from "./Footer";

const Hero = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <Testimonials />
      <PlansSection />
      <IntegrationSection />
      <CommonQuestions />
      <FinalCta />
      <Footer />
    </>
  );
};

export default Hero;
