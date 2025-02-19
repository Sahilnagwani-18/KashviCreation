import React, { useEffect, useState } from "react";
import axios from "axios";
import storeImage from "../assets/Shop.png";

const FindStore = () => {
  const [store, setStore] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/store`)
      .then(response => setStore(response.data))
      .catch(error => console.error("Error fetching store:", error));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ latitude, longitude });
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (store && userLocation) {
      const dist = calculateDistance(
        userLocation.latitude, userLocation.longitude,
        store.latitude, store.longitude
      );
      setDistance(dist);
    }
  }, [store, userLocation]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br border-black">
      <div className="w-[90%] m-10 max-w-6xl h-[85vh] bg-white/20 backdrop-blur-lg shadow-xl border border-black/10 overflow-hidden">
        <div className="flex flex-col md:flex-row h-1/2">
          <div className="w-full md:w-1/2 h-full relative">
            <img
              src={storeImage}
              alt="Store"
              className="w-full h-full object-cover "
            />
          </div>
          <div className="w-full md:w-1/2 h-full flex flex-col justify-center items-center p-6 text-center">
            <h1 className="text-3xl font-bold text-black drop-shadow-md">Find Our Store</h1>

            {store && userLocation ? (
              <>
                <p className="text-2xl font-semibold text-yellow-400 mt-2">{store.name}</p>
                <p className="text-black">{store.address}</p>
                <p className="text-black">📍 Phone: {store.phone}</p>

                <p className="mt-4 text-xl font-bold text-green-400">
                  Your Distance: {distance ? `${distance} km` : "Calculating..."}
                </p>

                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.latitude},${userLocation.longitude}&destination=${store.latitude},${store.longitude}&travelmode=driving`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-6 py-3 rounded-lg bg-yellow-500 text-black font-bold shadow-lg"
                >
                  Get Directions 🚗
                </a>
              </>
            ) : (
              <p className="text-white mt-4">Loading store details...</p>
            )}
          </div>
        </div>

        <div className="w-full h-1/2 relative">
          {store && userLocation ? (
            <>
              {!isMapLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-b-2xl">
                  <p className="text-center text-black text-lg">Loading Map...</p>
                </div>
              )}
              <iframe
                title="Store Location"
                width="100%"
                height="100%"
                style={{ border: "0" }}
                loading="lazy"
                allowFullScreen
                className="rounded-b-2xl"
                src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyDs8YWhhbH8tmqiqdtWyDpNmZqWRYTkGSY
                      &origin=${userLocation.latitude},${userLocation.longitude}
                      &destination=${store.latitude},${store.longitude}
                      &mode=driving`}
                onLoad={() => setIsMapLoaded(true)}
              ></iframe>
            </>
          ) : (
            <p className="text-center text-white text-lg mt-4">Loading Map...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FindStore;