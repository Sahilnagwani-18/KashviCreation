// app/components/Influencers.jsx
import { motion } from 'framer-motion';
import { UserGroupIcon, CameraIcon, HashtagIcon, StarIcon, ChartBarIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

const influencerStats = [
  { label: "Total Influencers", value: "1.2K+" },
  { label: "Average Reach", value: "2.4M" },
  { label: "Engagement Rate", value: "8.2%" },
  { label: "Countries", value: "45+" }
];

const influencers = [
  {
    name: "Aarohi Verma",
    niche: "Sustainable Fashion",
    image: "/influencer-1.jpg",
    followers: "1.2M",
    engagement: "9.8%",
    platforms: ["Instagram", "YouTube", "Pinterest"],
    bio: "Ethical fashion advocate creating conscious styling guides...",
    collaborations: "12 Kashvi Collections"
  },
  // Add 7 more influencers...
];

export default function Influencers() {
  return (
    <div className="bg-gradient-to-b from-[#F8F0F5] to-[#FDF6F9] min-h-screen p-6 lg:p-12">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 lg:mb-16"
      >
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6D4A72] to-[#4A154B]">
            Style Pioneers
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg lg:text-xl text-[#6D4A72] max-w-3xl mx-auto leading-relaxed"
        >
          Meet Our Global Network of Fashion Innovators and Trendsetters
        </motion.p>
      </motion.header>

      {/* Stats Grid */}
      <motion.div 
        className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {influencerStats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all"
          >
            <div className="text-3xl font-bold text-[#4A154B]">{stat.value}</div>
            <div className="text-sm text-[#6D4A72] mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Influencers Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {influencers.map((influencer, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true, margin: "100px" }}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <div className="relative h-80 overflow-hidden">
              <img 
                src={influencer.image} 
                alt={influencer.name} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A154B]/80 via-transparent to-transparent flex items-end p-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white">{influencer.name}</h3>
                  <div className="flex items-center gap-2">
                    <HashtagIcon className="w-5 h-5 text-white" />
                    <span className="text-sm text-white/90">{influencer.niche}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <UserGroupIcon className="w-5 h-5 text-[#6D4A72]" />
                  <span className="text-sm text-[#4A154B]">{influencer.followers}</span>
                </div>
                <div className="flex items-center gap-1 bg-[#F8F0F5] px-3 py-1 rounded-full">
                  <StarIcon className="w-4 h-4 text-[#6D4A72]" />
                  <span className="text-sm text-[#4A154B]">{influencer.engagement}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {influencer.platforms.map((platform, idx) => (
                  <motion.span
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1 bg-[#FDF6F9] text-[#4A154B] rounded-full text-sm"
                  >
                    {platform}
                  </motion.span>
                ))}
              </div>

              <motion.div
                whileHover={{ x: 5 }}
                className="inline-flex items-center gap-1 text-[#6D4A72] font-medium cursor-pointer"
              >
                View Profile
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto mt-20 bg-[#4A154B] rounded-3xl p-8 lg:p-12 text-center text-white"
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <ChartBarIcon className="w-12 h-12 mx-auto" />
          <h3 className="text-2xl lg:text-3xl font-bold">Join Our Creator Network</h3>
          <p className="text-lg text-white/90">Collaborate with brands and access exclusive partnership opportunities</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-white text-[#4A154B] rounded-full font-semibold mt-6"
          >
            Apply Now
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}