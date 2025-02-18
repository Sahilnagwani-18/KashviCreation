// app/components/Company.jsx
import { motion } from 'framer-motion';
import { BuildingLibraryIcon, UsersIcon, HeartIcon, ChartBarIcon, GlobeAltIcon, TrophyIcon } from '@heroicons/react/24/solid';

const companySections = [
  {
    title: "Our Heritage",
    icon: <BuildingLibraryIcon className="w-10 h-10 text-[#6D4A72]" />,
    content: `Founded in 2015, Kashvi Creations began as a small boutique in Mumbai. Today we're a global lifestyle brand impacting millions:`,
    stats: [
      { value: "500+", label: "International Stores" },
      { value: "10K+", label: "Artisan Partnerships" },
      { value: "98%", label: "Customer Satisfaction" },
      { value: "3x", label: "Annual Growth" }
    ],
    additionalContent: `We maintain our core values while embracing innovation in sustainable fashion and ethical manufacturing.`
  },
  // Add more sections...
];

export default function Company() {
  return (
    <div className="bg-gradient-to-b from-[#F8F0F5] to-[#FDF6F9] min-h-screen p-6 lg:p-12">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-center mb-12 lg:mb-16"
      >
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6D4A72] to-[#4A154B]">
            Our Legacy
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg lg:text-xl text-[#6D4A72] max-w-3xl mx-auto leading-relaxed"
        >
          Crafting Timeless Elegance Through Ethical Innovation | Global Presence with Local Heart
        </motion.p>
      </motion.header>

      <div className="max-w-7xl mx-auto grid gap-8 lg:gap-12">
        {companySections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            viewport={{ once: true, margin: "0px 0px -150px 0px" }}
            className="group relative bg-white rounded-2xl lg:rounded-3xl p-8 lg:p-12 shadow-xl hover:shadow-2xl transition-all duration-500 border-l-8 border-[#6D4A72] hover:border-[#4A154B]"
          >
            <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12">
              <motion.div 
                whileHover={{ rotate: -5, scale: 1.05 }}
                className="p-5 bg-[#F8F0F5] rounded-xl lg:shrink-0 transition-all duration-300"
              >
                {section.icon}
              </motion.div>
              <div className="space-y-6 lg:space-y-8">
                <motion.h2 
                  whileHover={{ x: 10 }}
                  className="text-3xl lg:text-4xl font-bold text-[#4A154B]"
                >
                  {section.title}
                </motion.h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6">
                  {section.stats.map((stat, statIndex) => (
                    <motion.div
                      key={statIndex}
                      whileHover={{ scale: 1.05 }}
                      className="bg-[#FDF6F9] p-4 rounded-xl text-center border-2 border-[#F8F0F5]"
                    >
                      <div className="text-2xl lg:text-3xl font-bold text-[#4A154B]">{stat.value}</div>
                      <div className="text-sm lg:text-base text-[#6D4A72] mt-1">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                <motion.p 
                  whileHover={{ scale: 1.02 }}
                  className="text-lg text-[#6D4A72] leading-relaxed border-l-4 border-[#4A154B] pl-4 italic"
                >
                  {section.additionalContent}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}

        {/* Global Presence Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[#4A154B] to-[#6D4A72] rounded-3xl p-8 lg:p-12 text-white"
        >
          <div className="flex items-center gap-6 mb-8">
            <GlobeAltIcon className="w-12 h-12 text-white" />
            <h3 className="text-3xl font-bold">Global Footprint</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-2xl font-bold">Continents</div>
              <div className="flex flex-wrap gap-2">
                {['Asia', 'Europe', 'North America', 'Australia', 'Africa'].map((continent, index) => (
                  <motion.span
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="px-4 py-2 bg-white/10 rounded-full text-sm"
                  >
                    {continent}
                  </motion.span>
                ))}
              </div>
            </div>
            {/* Add more global presence content */}
          </div>
        </motion.div>
      </div>
    </div>
  );
}