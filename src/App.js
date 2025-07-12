import React from 'react';
import CourseDashboard from './components/CourseDashboard';
import LearningPathCards from './components/LearningPathCards';
import SocialProof from './components/SocialProof';

const App = () => {
  return (
    <div
      className="relative min-h-screen text-white overflow-hidden"
      style={{
        background: 'radial-gradient(53.75% 135.56% at 50% 50%, #0437B8 0%, #002687 100%)',
      }}
    >
      {/* Frontend Assessment Title */}
      <img 
        src="/frontendassessment.png" 
        alt="Frontend Assessment" 
        className="absolute top-32 left-32 w-[850px] md:w-[750px] sm:w-[300px]"
      />

      {/* Middle Right → CourseDashboard (two cards) - Decreased Height */}
      <div className="absolute top-16 right-0 w-[370px] h-[200px]">
        <CourseDashboard />
      </div>

      {/* Bottom Left → LearningPathCards (statistics card) - Decreased Height */}
      <div className="absolute bottom-0 right-[550px] w-[430px] h-[225px]">
        <LearningPathCards />
      </div>

      {/* Bottom Right: Social Proof (testimonials) - Increased Size */}
      <div className="absolute bottom-0 right-0 w-[510px]">
        <SocialProof />
      </div>

      {/* VritTech Logo - bottom left */}
      <img 
        src="/Logo.png" 
        alt="VritTech Logo" 
        className="absolute bottom-8 left-16 h-12 w-auto"
      />
    </div>
  );
};

export default App;