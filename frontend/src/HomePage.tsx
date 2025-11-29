import Hero from "../src/HomepageComponents/Hero"
import WearYourStory from "../src/HomepageComponents/WearYourStory"
import FeatureCarousel from "../src/HomepageComponents/FeatureCarousel"
import PortfolioGrid from "../src/HomepageComponents/PortfolioGrid"
import Timeline from "../src/HomepageComponents/Timeline"
import Marquee from "../src/HomepageComponents/Marquee"
// import ContactForm from "../src/HomepageComponents/ContactForm"
// import NewsletterSubscribe from "../src/HomepageComponents/NewsletterSubscribe"

export default function Home() {
  return (
    <>
      <Hero />
      <WearYourStory />
      <FeatureCarousel />
      <PortfolioGrid />
      <Timeline />
      <Marquee />
      {/* <ContactForm /> */}
      {/* <NewsletterSubscribe /> */}
    </>
  )
}
