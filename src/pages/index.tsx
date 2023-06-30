import ContactSection from "@/components/landing-page/ContactSection";
import Hero from "@/components/landing-page/Hero";
import Opportunities from "@/components/landing-page/Opportunities";
import WhyChooseUs from "@/components/landing-page/WhyChooseUs";
import DownloadAppSection from "@/components/shared/DownloadAppSection";
import LogoCarousel from "@/components/shared/LogoCarousel";
import Section from "@/components/shared/Section";
import ServiceViwer from "@/components/shared/ServiceViwer";
import Testimonial from "@/components/shared/Testimonial";
import { type NextPage } from "next";
import Head from "next/head";
import { NextSeo } from 'next-seo';
import { env } from "@/env.mjs";



const Home: NextPage = () => {
  const title = 'Simplify Your Life with Secure and Convenient Online Services | NKPays';
  const desc = "NKPays offers a wide range of online services including mobile recharge, travel booking, DTH recharges, bill payments, and more. Experience seamless transactions, reliable customer support, and secure financial transactions. Simplify your life and enjoy the convenience of our user-friendly platform. Join NKPays today!"
  return (
    <>
      <NextSeo
        title={title}
        description={desc}
        openGraph={{
          title: title,
          description: desc,
          url: env.NEXT_PUBLIC_SITE_URL,
          images: []
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      <main>
        <Hero />
        <Section className="bg-primary/20" sectionTitle="Our Services" titleClassnames="">
          <div className="px-4 container"><ServiceViwer /></div>
        </Section>
        <Section>
          <div className="px-4 container mt-10"><WhyChooseUs /></div>
        </Section>
        <Section>
          <div className="px-4 container mt-10"><Opportunities /></div>
        </Section>
        <Section className="px-4 my-20" sectionTitle="What Our Clients Said About NKPays">
          <div className="container "><Testimonial /></div>
        </Section>

        <div className="p-4 bg-primary/10">
          <LogoCarousel />
        </div>

        <DownloadAppSection />

        <ContactSection />
      </main>
    </>
  );
};

export default Home;

