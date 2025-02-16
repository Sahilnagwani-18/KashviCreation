import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top whenever the route changes
  }, [location]);

  return null; // This component doesn’t render anything, it just triggers the scroll effect
};

export default ScrollToTop;
