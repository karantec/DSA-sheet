import React from "react";

import HeroCarousel from "./Home";
import SecurityFeatures from "../WhyChoose";
import DetailedFeaturesSection from "../DetaledSection";

const MainPage = () => {
  return (
    <div>
      <HeroCarousel />
      <SecurityFeatures />
      <DetailedFeaturesSection />
      {/* <Gallerytwo /> */}
      {/* Uncomment the following line to include DescriptiveCards component */}
      {/* <DescriptiveCards/> */}
    </div>
  );
};

export default MainPage;
