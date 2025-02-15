import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const videos = [
  "/videos/Video1.mp4",
  "/videos/Video2.mp4",
  "/videos/Video3.mp4",
  "/videos/Video4.mp4",
  "/videos/Video5.mp4",
  "/videos/Video6.mp4",
];

export default function VideoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRef = useRef(null);

  const handleTransition = (newIndex) => {
    setIsTransitioning(true);
    setCurrentIndex(newIndex);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const nextVideo = () => {
    handleTransition((currentIndex + 1) % videos.length);
  };

  const prevVideo = () => {
    handleTransition(currentIndex === 0 ? videos.length - 1 : currentIndex - 1);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("ended", nextVideo);
      return () => video.removeEventListener("ended", nextVideo);
    }
  }, [currentIndex]);

  useEffect(() => {
    const interval = setInterval(nextVideo, 10000);
    return () => clearInterval(interval);
  }, []);

  const getPrevIndex = () => (currentIndex - 1 + videos.length) % videos.length;
  const getNextIndex = () => (currentIndex + 1) % videos.length;

  return (
    <section className="relative bg-gradient-to-b from-gray-100 to-gray-300 py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Featured Collections</h2>
        <p className="text-gray-600 text-center mb-12">Experience our sarees in motion</p>
        
        <div className="relative flex items-center justify-center w-full h-full">
          {/* Previous Video */}
          <div className="relative w-[20%] h-[60vh] transform -translate-x-8">
            <video
              src={videos[getPrevIndex()]}
              className="
                w-full h-full object-cover rounded-2xl
                opacity-50 blur-[2px]
                transition-all duration-700
                transform scale-95 hover:scale-100
              "
              muted
            />
            <div className="absolute inset-0 bg-black/20 rounded-2xl" />
          </div>

          {/* Main Video */}
          <div className="relative w-[40%] h-[70vh] z-10 mx-8">
            <video
              ref={videoRef}
              key={videos[currentIndex]}
              src={videos[currentIndex]}
              autoPlay
              muted
              loop
              className="
                w-full h-full object-cover rounded-2xl
                shadow-lg shadow-gray-500/50
                transition-all duration-700 ease-in-out
                transform ${isTransitioning ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}
              "
            />
          </div>

          {/* Next Video */}
          <div className="relative w-[20%] h-[60vh] transform translate-x-8">
            <video
              src={videos[getNextIndex()]}
              className="
                w-full h-full object-cover rounded-2xl
                opacity-50 blur-[2px]
                transition-all duration-700
                transform scale-95 hover:scale-100
              "
              muted
            />
            <div className="absolute inset-0 bg-black/20 rounded-2xl" />
          </div>

          {/* Navigation Buttons */}
          <button
            className="
              absolute left-4 top-1/2 -translate-y-1/2
              bg-gray-800/50 backdrop-blur-lg p-4 rounded-full
              shadow-md hover:bg-gray-900/60
              transition-all duration-300 ease-in-out
              transform hover:scale-110
              ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}
            "
            onClick={prevVideo}
            disabled={isTransitioning}
          >
            <ChevronLeft className="text-white w-6 h-6" />
          </button>

          <button
            className="
              absolute right-4 top-1/2 -translate-y-1/2
              bg-gray-800/50 backdrop-blur-lg p-4 rounded-full
              shadow-md hover:bg-gray-900/60
              transition-all duration-300 ease-in-out
              transform hover:scale-110
              ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}
            "
            onClick={nextVideo}
            disabled={isTransitioning}
          >
            <ChevronRight className="text-white w-6 h-6" />
          </button>

          {/* Video Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {videos.map((_, index) => (
              <div
                key={index}
                className={`
                  w-3 h-3 rounded-full transition-all duration-300
                  ${index === currentIndex ? 'bg-gray-900 w-6' : 'bg-gray-500'}
                `}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}