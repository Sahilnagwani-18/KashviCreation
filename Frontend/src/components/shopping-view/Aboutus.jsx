import React from 'react';

const AboutUs = () => {
  return (
    <section className="py-12 bg-[#FDF7E3]">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Kashvi Creation</h1>
          <p className="text-lg text-gray-600">
            Where tradition meets modern elegance.
          </p>
        </div>

        {/* About Us Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Column - Text */}
          <div className="space-y-6">
            {/* Our Story */}
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Story</h2>
              <p className="text-gray-600 leading-relaxed">
                Founded with a passion for preserving the rich heritage of Indian textiles, Kashvi Creation has been a trusted name in the world of designer sarees for over a decade. Our journey began in [Location], where a team of skilled artisans and designers came together with a shared vision: to redefine the saree experience for modern women while staying true to traditional roots.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Over the years, we have grown into a brand synonymous with quality, innovation, and exclusivity. Each saree in our collection is meticulously crafted, ensuring that every thread tells a story of dedication and creativity.
              </p>
            </div>

            <hr className="my-8 border-t-2 border-gray-300" />

            {/* Our Craftsmanship */}
            <div className="mt-16">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Craftsmanship</h2>
              <p className="text-gray-600 leading-relaxed">
                At the heart of Kashvi Creation lies our unwavering commitment to craftsmanship. We work with the finest fabrics, including silk, chiffon, georgette, and cotton, to create sarees that are both luxurious and comfortable. Our designs are inspired by the vibrant colors, intricate patterns, and cultural diversity of India, making each piece a work of art.
              </p>
            </div>

            <hr className="my-8 border-t-2 border-gray-300" />

            {/* Vision */}
            <div className="mt-20">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To be a company that is a benchmark in the Indian fashion industry for its offerings and experiences.
              </p>
            </div>

            <hr className="my-8 border-t-2 border-gray-300" />

            {/* Mission */}
            <div className="mt-24">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To be a preferred company of choice in Indian fashion globally for its delightful customer service, and quality product offerings by constantly evolving using innovation and design.
              </p>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="grid grid-cols-2 gap-4">
            {[
            { src: '/images/image1.jpg', alt: 'Artisan at work' },
            { src: '/images/image2.jpg', alt: 'Saree close-up' },
            { src: '/images/image3.jpg', alt: 'Saree collection' },
            { src: '/images/image4.jpg', alt: 'Elegant saree' },
            ].map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                className="w-full h-72 object-cover rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>

        </div>
        
        <hr className="my-8 border-t-2 border-gray-300" />

        {/* Founders Section */}
        <div className="mt-12 bg-[#E8F8F2] p-6 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Founders</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-800">Shravan Gupta</h3>
              <p className="text-gray-600 mt-2">
                From an early age, he saw the building up of textile capabilities, the diversification of its product base, and emergence which gave birth to the business idea. From specializing in sourcing & supplying quality textile raw materials across the world, today his efforts have let the company be one of the leading importers of silk fabrics. His contagious zeal has let fashion companies across the globe entrust the brand with their development needs. Later his idea gave birth to the brand, Kashvi Creation, which has achieved a remarkable presence as a manufacturer & exporter in Women’s Ethnic Wear.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-gray-800">Saurabh, Shishir & Nishit Gupta</h3>
              <p className="text-gray-600 mt-2">
                Saurabh, Shishir & Nishit Gupta joined the family business alongside a very passionate team led by his father. These second-generation entrepreneurs went on to study overseas and started their pioneering careers with Kashvi Creation in 2007. They always envisioned Kashvi Creation as a dynamic enterprise. It is an omnichannel approach to business development & brand building that has enabled them to create a seamless, integrated & unique experience for their customers through its various touchpoints.
              </p>
            </div>
          </div>
        </div>

        {/* Milestones Section */}
        <div className="mt-12 bg-[#FCE4D6] shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Milestones</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[ 
              { title: 'Mushk Collection', date: 'October 2024' },
              { title: 'Indore Store', date: 'October 2024' },
              { title: 'Pitampura Store', date: 'July 2024' },
              { title: 'Inara Collection', date: 'March 2024' },
              { title: 'Hyderabad Store', date: 'March 2024' },
              { title: 'Surat Store', date: 'Dec 2023' },
              { title: 'Bengaluru Store', date: 'Nov 2023' },
              { title: 'Zayra Collection', date: 'Oct 2023' },
              { title: 'Ahmedabad Store', date: 'July 2023' },
              { title: 'Noor Collection', date: 'Oct 2022' },
              { title: 'Delhi Store', date: 'Aug 2022' },
              { title: 'Rumi Collection', date: 'Apr 2022' }
            ].map((milestone, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gray-800">{milestone.title}</h3>
                <p className="text-gray-600 mt-2">{milestone.date}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 bg-[#E8F8F2] shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800">Customization</h3>
              <p className="text-gray-600 mt-2">
                Our clients experience personal attention and service from professional fashion consultants who help select and style each outfit. We tailor make designs of your choices & requirements through immaculate tailoring because your Kashvi Creation experience is our priority.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800">Collection Launches</h3>
              <p className="text-gray-600 mt-2">
                Here at Kashvi Creation, we make sure that all our designs are latest & thereby we bring to you collections that we launch right before every season all across our stores & online.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold text-gray-800">Worldwide Shipping</h3>
              <p className="text-gray-600 mt-2">
                We offer free shipping on orders above USD $200 across 24 countries. Kashvi Creation guarantees you 100% authenticity of all the items. Our quality life cycle starts with the precise selection of the exclusive brands by our buyers and ends with the delivery of your shipment by our premium logistics partners (DHL, UPS, Blue Dart, Delhivery).
              </p>
            </div>
          </div>
        </div>

        <hr className="my-12 border-t-4 border-gray-300" />

        {/* Call-to-Action Section */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Join Us on This Journey</h2>
          <p className="text-gray-600 mb-6">
            At Kashvi Creation, we are more than just a brand; we are a community of saree lovers who celebrate beauty, tradition, and individuality. Thank you for being a part of our journey.
          </p>
          <a
            href="/shop/listing"
            className="inline-block bg-black text-white px-8 py-3 rounded-full hover:bg-gray-800 transition duration-300"
          >
            Explore Our Collection
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
