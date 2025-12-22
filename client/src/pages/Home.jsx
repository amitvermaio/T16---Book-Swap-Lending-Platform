import Navbar from '../components/Navbar';
import HeroSection from '../components/landing/HeroSection';
import TopBooks from '../components/landing/TopBooks';

const Home = () => {
  return (
    <div className='w-screen h-screen px-6 lg:px-12'>
      <Navbar />
      <HeroSection /> 
      <TopBooks />
    </div>
  )
}

export default Home