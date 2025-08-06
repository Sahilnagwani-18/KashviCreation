import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";

function Gallery() {
  const productList = useSelector((state) => state.shopProducts.productList);
  const [images, setImages] = useState([]);

  // Load once on mount
  useEffect(() => {
    const filtered = productList.filter((p) => p?.image);
    const shuffled = [...filtered].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10).map((p) => p.image);
    setImages(selected);
  }, [productList]);

  return (
    <section className="py-8 px-4 bg-[#F1D7F5]">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-primary">
        Gallery
      </h2>

      <div className="grid gap-3 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {images.map((src, index) => (
          <div
            key={index}
            className="
              w-full 
              h-[160px] sm:h-[200px] md:h-[280px] lg:h-[320px] xl:h-[355px]
              overflow-hidden 
              rounded-lg 
              shadow 
              border 
              bg-gray-100
            "
          >
            <LazyLoad height="100%" offset={100} once>
              <img
                src={src}
                alt={`Gallery product ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </LazyLoad>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
