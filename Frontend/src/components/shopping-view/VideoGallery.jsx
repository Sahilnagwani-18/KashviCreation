import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Icons for navigation

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
  const videoRef = useRef(null);

  // Function to go to next video
  const nextVideo = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  // Function to go to previous video
  const prevVideo = () => {
    setCurrentIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  // Auto-change video when it ends
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("ended", nextVideo);
      return () => video.removeEventListener("ended", nextVideo);
    }
  }, [currentIndex]);

  // Auto-change video every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextVideo, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-10 relative flex items-center justify-center w-full h-full bg-white">
      {/* Previous Video Preview (Small Size) */}
      <video
        src={videos[(currentIndex - 1 + videos.length) % videos.length]}
        className="w-[10%] h-[50vh] opacity-50 rounded-lg transition-all duration-500 hover:opacity-70 object-cover"
        muted
      />

      {/* Main Playing Video (Large & Popped Out) */}
      <div className="relative w-[20%] h-[70vh] mx-4 object-cover">
        <video
          ref={videoRef}
          key={videos[currentIndex]}
          src={videos[currentIndex]}
          autoPlay
          muted
          loop
          className="w-full h-full object-cover rounded-xl  shadow-2xl transform scale-105 transition-all duration-500 hover:scale-110"
        />
      </div>

      {/* Next Video Preview (Small Size) */}
      <video
        src={videos[(currentIndex + 1) % videos.length]}
        className="w-[10%] h-[50vh] opacity-50 rounded-lg transition-all duration-500 hover:opacity-70 object-cover"
        muted
      />

      {/* Previous Button */}
      <button
        className="absolute left-5 bg-black/50 p-3 rounded-full shadow-lg hover:bg-black/80 transition"
        onClick={prevVideo}
      >
        <ChevronLeft className="text-white w-8 h-8" />
      </button>

      {/* Next Button */}
      <button
        className="absolute right-5 bg-black/50 p-3 rounded-full shadow-lg hover:bg-black/80 transition"
        onClick={nextVideo}
      >
        <ChevronRight className="text-white w-8 h-8" />
      </button>
    </div>
  );
}