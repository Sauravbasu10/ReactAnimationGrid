import React, { useState, useEffect, useRef, useCallback } from 'react';

const SocialProof = () => {
  const [variant, setVariant] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [showSecondary, setShowSecondary] = useState(false);
  const intervalRef = useRef(null);

  // Define image sources for each variant
  const variantImages = {
    1: '/assets/task1.svg',
    2: '/assets/task1-variant1.svg',
    3: '/assets/task1-variant2.svg',
    4: '/assets/task1-variant3.svg',
    secondary: '/assets/video.svg',
  };

  // Start cycling variants on hover in pop-up with very slow timing
  const handleMouseEnter = () => {
    if (intervalRef.current) return; // Prevent multiple intervals
    let current = 2;
    setVariant(current);

    const cycleVariants = () => {
      const nextVariant = current < 4 ? current + 1 : 2;
      setVariant(nextVariant);
      current = nextVariant;
      intervalRef.current = setTimeout(cycleVariants, 1500); // Very slow interval (1500ms)
    };

    intervalRef.current = setTimeout(cycleVariants, 1500);
  };

  // Stop cycling and reset
  const handleMouseLeave = () => {
    if (intervalRef.current) {
      clearTimeout(intervalRef.current);
      intervalRef.current = null;
    }
    setVariant(1);
    setShowSecondary(false);
  };

  // Toggle pop-up with useCallback to keep stable reference
  const togglePopUp = useCallback(() => {
    setIsOpen((prevIsOpen) => {
      if (prevIsOpen && intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
        setVariant(1);
        setShowSecondary(false);
      }
      return !prevIsOpen;
    });
  }, []);

  // Handle Escape key to close pop-up
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && isOpen) {
        togglePopUp();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, togglePopUp]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <div
        className="bg-white shadow-lg relative overflow-hidden flex items-center justify-center w-full h-64 rounded-l-2xl rounded-r-none rounded-b-none cursor-pointer"
        onClick={togglePopUp}
      >
        <img
          src={variantImages[variant]}
          alt="Decorative graphic for social proof"
          className="w-full h-full object-contain transition-opacity duration-500"
        />
      </div>

      {isOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={togglePopUp}
          role="dialog"
          aria-modal="true"
          aria-label="Social proof image pop-up"
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-11/12 max-w-3xl h-[80vh] relative flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="relative w-1/2 h-full flex items-center justify-center">
              <img
                src={variantImages[variant]}
                alt="Decorative graphic for social proof"
                className="w-full h-full object-contain transition-opacity duration-500"
              />
              <div
                className="absolute left-0 top-0 w-1/2 h-full"
                onMouseEnter={() => setShowSecondary(true)}
                onMouseLeave={() => setShowSecondary(false)}
                aria-label="Hotspot for secondary SVG"
              />
            </div>
            {showSecondary && (
              <div className="w-1/2 h-full flex items-center justify-center">
                <img
                  src={variantImages.secondary}
                  alt="Secondary decorative graphic"
                  className="w-full h-full object-contain transition-opacity duration-500"
                />
              </div>
            )}
            <button
              className="absolute top-4 right-4 bg-gray-800 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600 transition"
              onClick={togglePopUp}
              aria-label="Close pop-up"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SocialProof;
