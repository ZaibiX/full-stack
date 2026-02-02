import Navbar from '../components/Navbar.jsx';
import Footer from "../components/Footer.jsx"
import LoginForm from '../components/LoginForm.jsx';
import {useRef} from "react";

const LandingPage = () => {

  const emailLoginRef = useRef(null);

  function scrollToLogin(){
    // 1. Focus the input (this also helps the user start typing)
    emailLoginRef.current?.focus();
    
    // 2. Scroll the form into view smoothly
    emailLoginRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      
      <Navbar scrollToLogin={scrollToLogin} />
      {/* --- HERO SECTION --- */}
      <main className="max-w-7xl mx-auto px-6 py-20 md:py-12 flex flex-col md:flex-row items-center">
        {/* Left Content */}
        <div className="md:w-1/2 mb-12 md:mb-0">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Smart Inventory <br />
            <span className="text-blue-600">Simplified.</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            Take full control of your warehouse. Manage products, track stock levels in real-time, 
            and get automated low-stock alerts before you run out. 
            Built for Admins, Managers, and Teams.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {/* <button className="bg-blue-600 text-white px-8 py-4 rounded-xl text-lg font-bold hover:shadow-lg transition-all transform hover:-translate-y-1">
              Get Started Now
            </button> */}
            {/* <button className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl text-lg font-bold hover:bg-gray-100 transition">
              View Demo
            </button> */}
          </div>
        </div>

        {/* Right Visual Placeholder */}
        <div className="md:w-1/2 flex justify-center relative">
          {/* <div className="w-full h-64 md:h-96 bg-blue-100 rounded-3xl overflow-hidden shadow-2xl flex items-center justify-center border-4 border-white"> */}
            {/* You can replace this div with an actual <img> of a dashboard screenshot later */}
            {/* <div className="text-blue-400 text-center p-8">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="font-mono text-sm">[StockTrack Dashboard Preview]</p>
            </div>
          </div>  */}
         
          <LoginForm emailLoginRef= {emailLoginRef}/>


          {/* Small decorative "Low Stock" alert badge */}
          <div className="absolute top-10 right-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce shadow-lg">
            Low Stock Alert!
          </div>
        </div>
      </main>

      {/* --- QUICK FEATURES --- */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-blue-600 font-bold text-xl mb-2">Role Based</div>
            <p className="text-gray-500">Custom views for Admin, Managers, and Employees.</p>
          </div>
          <div>
            <div className="text-blue-600 font-bold text-xl mb-2">Real-Time CRUD</div>
            <p className="text-gray-500">Instantly create, update, or delete products with zero lag.</p>
          </div>
          <div>
            <div className="text-blue-600 font-bold text-xl mb-2">JWT Secured</div>
            <p className="text-gray-500">Industry-standard security protecting your sensitive data.</p>
          </div>
        </div>
      </section>

      

      <Footer />
    </div>
  );
};

export default LandingPage;