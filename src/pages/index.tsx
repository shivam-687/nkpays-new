import Hero from "@/components/landing-page/Hero";
import KeypointPanel from "@/components/landing-page/KeypointPanel";
import WhyChooseUs from "@/components/landing-page/WhyChooseUs";
import DownloadAppSection from "@/components/shared/DownloadAppSection";
import LogoCarousel from "@/components/shared/LogoCarousel";
import Section from "@/components/shared/Section";
import ServiceViwer from "@/components/shared/ServiceViwer";
import Testimonial from "@/components/shared/Testimonial";
import { type NextPage } from "next";
import Head from "next/head";
const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        <Section sectionTitle="Our Services" titleClassnames="mb-10">
          <div className="px-4 container"><ServiceViwer /></div>
        </Section>
        <Section>
          <div className="px-4 container mt-20"><WhyChooseUs /></div>
        </Section>
        <Section className="px-4" sectionTitle="What Our Clients Said About NKPays">
          <div className="container "><Testimonial /></div>
        </Section>

        <div className="p-4 bg-primary/10">
          <LogoCarousel />
        </div>

        <DownloadAppSection/>
      </main>
    </>
  );
};

export default Home;
