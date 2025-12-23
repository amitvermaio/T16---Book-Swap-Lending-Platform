import Navbar from '../components/Navbar';
import HeroSection from '../components/landing/HeroSection';
import TopBooks from '../components/landing/TopBooks';
import HowItWorks from '../components/landing/HowItWorks';
import Why from '../components/landing/Why';
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className='w-screen h-screen px-6 lg:px-12'>
      <Navbar />
      <HeroSection /> 
      <TopBooks />
      <HowItWorks />
      <Why />
      <Footer />
    </div>
  )
}

export default Home