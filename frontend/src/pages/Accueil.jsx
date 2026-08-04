import { Box } from '@mui/material';
import HeroSlider from '../components/home/HeroSlider';
import WhyChooseUs from '../components/home/WhyChooseUs';
import LatestNews from '../components/home/LatestNews';
import StatsCounter from '../components/home/StatsCounter';
import OurCampuses from '../components/home/OurCampuses';
import UpcomingEvents from '../components/home/UpcomingEvents';
import Partners from '../components/home/Partners';
import Testimonials from '../components/home/Testimonials';
import AdmissionBanner from '../components/home/AdmissionBanner';
import Diplome from '../components/home/Diplome';
// import HomeMaps from '../components/home/HomeMaps';
function Accueil() {
  return (
    <Box>
      <HeroSlider />
      <WhyChooseUs />
      <LatestNews />
      <StatsCounter />
      <OurCampuses />
      <UpcomingEvents />
      <Diplome />
      <Partners />
      <Testimonials />
      <AdmissionBanner />
      {/* <HomeMaps /> */}
    </Box>
  );
}

export default Accueil;