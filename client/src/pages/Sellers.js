import React from "react";
import CalltoAction from "../components/CalltoAction/CalltoAction";
import Footer from "../components/Footer/Footer";
import JoinSection from "../components/JoinSection/JoinSection";
import Listings from "../components/ListingSection/Listings";
import Menu from "../components/Menu/Menu";
import WithSubnavigation from "../components/Menu/Menu";
import Navbar from "../components/navbar/Navbar";
import Pricing from "../components/PricingCards/Pricing";
import SellerHero from "../components/SellersHero/SellerHero";
import SellSection from "../components/SellSection/SellSection";
import Services from "../components/Services/Services";
import ServicesCards from "../components/ServicesCards/ServicesCards";
import Slider from "../components/Slider/Slider";
import Testimonial from "../components/Testimonial/Testimonial";
import TopNav from "../components/topnav/TopNav";
import cta2 from "../images/cta2.svg";
import cta3 from "../images/cta3.svg";
import cta4 from "../images/services1.svg";

const Sellers = () => {
  const bgColor = "#c8f5bc";
  const mainTitle = "The easy way to sell your PM";
  const title1 = "Set up your account.";
  const title2 = "Get help to sell";
  const title3 = "Connect with Buyers";
  const descript1 =
    "Provide the key information buyers will need to evaluate your PM";
  const descript2 =
    "Browse the STR’s in-market acquisition advisor directory. Secure your best outcome with professional help, be it taxation, legal, due diligence, M&A and more. Or, go it alone and skip straight to negotiations with buyers. The choice is yours. ";
  const descript3 =
    "Interested buyers will ask you for more details. Once you've exchanged data, finalised negotiations and you're both happy, expect an offer within 3 weeks.";
  const list1 = [
    {
      item: "Describe your PM (your company name is always private)",
    },
    {
      item: "Explain why you’re selling",
    },
    {
      item: "Shout out about your key STR and financial metrics",
    },
    {
      item: "Always anonymous, you choose what to share and with whom ",
    },
    {
      item: "We help you prepare your pitch deck",
    },
  ];
  const list2 = [
    {
      item: "Broad range of approved advisors ",
    },
    {
      item: "Browse by rating, fee and experience",
    },
    {
      item: "Engage instantly through Sell My PM",
    },
  ];
  const list3 = [
    {
      item: "Approve or reject information requests",
    },
    {
      item: "Let the buyers come to you",
    },
    {
      item: "Provide the info buyers need upfront clearly, professionally and easily",
    },
  ];

  const heroTitle =
    "Sell your PM fast and for the best price. Property Manager friendly. Always anonoymous. No commission.";
  const heroDescript =
    "List your details, state your metrics, and get eyes on your PM instantly. Hire approved advisors to help you sell or skip straight to the conversation.";
  const smText =
    "The fastest, easiest way to sell your Property Management business";

  return (
    <div className="home">
      <TopNav />
      <Menu />
      <SellerHero
        smText={smText}
        heroTitle={heroTitle}
        heroDescript={heroDescript}
        bgColor={bgColor}
      />
      <CalltoAction
        mainTitle={mainTitle}
        image={cta2}
        isHeading={true}
        title={title1}
        descript={descript1}
        list={list1}
      />
      <SellSection
        isSlider={false}
        image={cta3}
        title={title2}
        descript={descript2}
        list={list2}
      />
      <CalltoAction
        image={cta4}
        title={title3}
        descript={descript3}
        list={list3}
      />
      <Testimonial />
      <JoinSection />
      <Footer />
    </div>
  );
};

export default Sellers;
