import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-12 bg-[#F1D7F5] text-[#4B2A3A]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Welcome to Kashvi Creation</h1>
          <p className="text-lg sm:text-xl text-gray-600">
            Where tradition meets modern elegance.
          </p>
        </div>

        {/* About Content */}
        <div className="grid gap-12 md:grid-cols-2 items-center">
          {/* Text */}
          <div className="space-y-8">
            {[
              {
                title: 'Our Story',
                texts: [
                  `Founded with a passion for preserving the rich heritage of Indian textiles, Kashvi Creation has been a trusted name in the world of designer sarees for over a decade. Our journey began in [Location], where artisans and designers came together to redefine the saree experience for modern women while staying true to traditional roots.`,
                  `Over the years, we've become synonymous with quality, innovation, and exclusivity. Each saree in our collection is meticulously crafted—every thread tells a story of dedication and creativity.`,
                ]
              },
              {
                title: 'Our Craftsmanship',
                texts: [
                  `At the heart of Kashvi Creation lies our unwavering commitment to craftsmanship. We work with the finest fabrics—silk, chiffon, georgette, and cotton—to create sarees that are both luxurious and comfortable.`,
                  `Inspired by India's vibrant colors and intricate patterns, each piece is a wearable work of art.`
                ]
              },
              {
                title: 'Vision',
                texts: [
                  `To be the benchmark in the Indian fashion industry for its offerings and experiences.`
                ]
              },
              {
                title: 'Mission',
                texts: [
                  `To be the preferred choice in Indian fashion globally—with delightful customer service and quality products—by constantly evolving through innovation and design.`
                ]
              }
            ].map(({ title, texts }, idx) => (
              <div key={idx}>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">{title}</h2>
                {texts.map((t, i) => (
                  <p key={i} className="text-gray-700 leading-relaxed mb-2">{t}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Images */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { src: '/images/image1.jpg', alt: 'Artisan at work' },
              { src: '/images/image2.jpg', alt: 'Saree close-up' },
              { src: '/images/image3.jpg', alt: 'Saree collection' },
              { src: '/images/image4.jpg', alt: 'Elegant saree' },
            ].map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.alt}
                className="w-full h-52 sm:h-64 object-cover rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        </div>

        {/* Founders */}
        <div className="mt-16 space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">Founders</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Shravan Gupta</h3>
              <p className="text-gray-700 leading-relaxed">
                From an early age, he saw the evolution of textile capabilities…
              </p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">Saurabh, Shishir & Nishit Gupta</h3>
              <p className="text-gray-700 leading-relaxed">
                These second-generation entrepreneurs joined the family business…
              </p>
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="mt-16 bg-white rounded-lg shadow p-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">Milestones</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: 'Mushk Collection', date: 'October 2024' },
              { title: 'Indore Store', date: 'October 2024' },
              { title: 'Pitampura Store', date: 'July 2024' },
              { title: 'Inara Collection', date: 'March 2024' },
              { title: 'Hyderabad Store', date: 'March 2024' },
              { title: 'Surat Store', date: 'Dec 2023' },
            ].map((m, i) => (
              <div key={i} className="p-4 border rounded-lg hover:bg-[#FDF7E3] transition">
                <h3 className="font-semibold mb-1">{m.title}</h3>
                <p className="text-gray-600">{m.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">Features</h2>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            {[
              {
                title: 'Customization',
                text: `Professional consultants help select and style each outfit. We tailor-make designs to your preferences—because your experience is our priority.`
              },
              {
                title: 'Collection Launches',
                text: `We bring you the latest collections before every season—both in-store and online.`
              },
              {
                title: 'Worldwide Shipping',
                text: `Free shipping on orders above USD $200 across 24 countries, guaranteed authenticity, and premium logistics partners.`
              }
            ].map((f, i) => (
              <div key={i} className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
                <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-gray-700 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Join Us on This Journey</h2>
          <p className="text-gray-700 mb-6">
            We’re more than a brand; we’re a community celebrating beauty, tradition, and individuality.
          </p>
          <a
            href="/shop/listing"
            className="inline-block bg-[#4B2A3A] text-white px-8 py-3 rounded-full hover:bg-[#6A1B4C] transition"
          >
            Explore Our Collection
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
