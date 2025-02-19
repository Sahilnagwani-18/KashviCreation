import React from 'react';

const Gallery = () => {
  const images = [
    { id: 1, src: '/images/galimg1.jpg', title: 'Silk Saree', category: 'Traditional', width: 'md:w-1/3', height: 'h-96', label: 'BestSellers' },
    { id: 2, src: '/images/galimg2.jpg', title: 'Cotton Saree', category: 'Casual', width: 'md:w-1/3', height: 'h-96', label: 'Category Luxe' },
    { id: 3, src: '/images/galimg3.jpg', title: 'Banarasi Saree', category: 'Wedding', width: 'md:w-1/3', height: 'h-96', label: 'Influencer Edit' },
    { id: 4, src: '/images/galimg4.jpg', title: 'Chiffon Saree', category: 'Party', width: 'md:w-1/2', height: 'h-96', label: 'Indowestern' },
    { id: 5, src: '/images/galimg5.jpg', title: 'Printed Saree', category: 'Casual', width: 'md:w-1/2', height: 'h-96', label: 'Bride' },
    { id: 6, src: '/images/galimg6.jpg', title: 'Designer Saree', category: 'Festive', width: 'w-full', height: 'h-150', label: '24 Hr Dispatch on New Arrival' },
  ];

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        {/* Gallery Title */}
        <h1 className="text-4xl font-bold text-center mb-8">Gallery</h1>

        <div className="flex flex-wrap -mx-2">
          {images.map((image) => (
            <div
              key={image.id}
              className={`w-full px-2 mb-4 ${image.width}`}
              style={{ background: '#FDF7E3' }}
            >
              <div className="relative overflow-hidden rounded-lg shadow-lg group">
                <img
                  src={image.src}
                  alt={image.title}
                  className={`w-full ${image.height} object-cover transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-110`}
                  loading="lazy"
                  srcSet={`${image.src} 1x, ${image.src}?w=500 2x`}
                />
                {/* Shadow Layer */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 bg-black bg-opacity-50 transition-transform duration-500 ease-in-out transform -translate-y-full group-hover:translate-y-0">
                  <h2 className="text-white text-2xl font-bold">{image.title}</h2>
                  <h3 className="text-gray-300 text-lg">{image.category}</h3>
                  <p className="text-white text-sm mt-2">{image.label}</p>
                  <a
                    href="http://localhost:5173/shop/listing"
                    className="mt-4 inline-block bg-black opacity-60 text-white px-6 py-2 rounded-md mx-auto w-[200px] hover:opacity-100 transition-opacity duration-300 ease-in-out"
                  >
                    SHOP NOW
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;