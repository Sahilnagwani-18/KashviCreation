// app/components/Blog.jsx
import { motion } from "framer-motion";
import { 
    SparklesIcon, 
    CalendarIcon, 
    ArrowRightIcon, 
    BookOpenIcon,
    CpuChipIcon,
    GlobeAltIcon, // Replacement for LeafIcon
    ShieldCheckIcon // Additional icon
  } from '@heroicons/react/24/solid';

const blogPosts = [
  {
    title: "The Future of Sustainable Fashion",
    date: "March 15, 2024",
    category: "Sustainability",
    excerpt: `Discover how Kashvi Creations is pioneering sustainable fashion through:
    - Biodegradable textile innovations
    - Zero-waste production techniques
    - Ethical supply chain management
    - Circular fashion initiatives`,
    icon: <GlobeAltIcon  className="w-8 h-8 text-[#6D4A72]" />,
    readTime: "8 min read"
  },
  {
    title: "AI in Fashion: Transforming the Industry",
    date: "April 8, 2024",
    category: "Technology",
    excerpt: `Exploring technological advancements:
    • AI-driven trend forecasting
    • Virtual try-on experiences
    • Smart inventory management
    • Personalized styling algorithms`,
    icon: <CpuChipIcon className="w-8 h-8 text-[#6D4A72]" />,
    readTime: "10 min read"
  },
  {
    title: "Minimalist Wardrobes: Less is More",
    date: "February 22, 2024",
    category: "Lifestyle",
    excerpt: `Curating timeless collections:
    ✓ Capsule wardrobe essentials
    ✓ Seasonless clothing strategies
    ✓ Quality over quantity philosophy
    ✓ Sustainable closet management`,
    icon: <BookOpenIcon className="w-8 h-8 text-[#6D4A72]" />,
    readTime: "6 min read"
  }
];

export default function Blog() {
  return (
    <div className="bg-gradient-to-b from-[#F8F0F5] to-[#FDF6F9] min-h-screen p-6 lg:p-12">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 lg:mb-16"
      >
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#6D4A72] to-[#4A154B]">
            Kashvi Chronicles
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg lg:text-xl text-[#6D4A72] max-w-3xl mx-auto leading-relaxed"
        >
          Insights, Innovations, and Inspirations in Modern Fashion
        </motion.p>
      </motion.header>

      {/* Featured Article */}
      <motion.article 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl mb-16"
      >
        <div className="flex items-center gap-4 mb-6">
          <SparklesIcon className="w-12 h-12 text-[#4A154B]" />
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold text-[#4A154B]">Editor's Pick</h2>
            <p className="text-[#6D4A72]">Most Read Article of the Month</p>
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-xl lg:text-2xl font-bold text-[#4A154B]">
            Revolutionizing Textile Production: Our Sustainable Journey
          </h3>
          <div className="text-[#6D4A72] space-y-4">
            <p>Discover how we've achieved:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>78% reduction in water consumption</li>
              <li>100% renewable energy factories</li>
              <li>Closed-loop recycling system</li>
            </ul>
          </div>
          <div className="flex items-center gap-4 text-[#6D4A72]">
            <CalendarIcon className="w-5 h-5" />
            <span>March 1, 2024</span>
            <span>•</span>
            <span>12 min read</span>
          </div>
        </div>
      </motion.article>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
        {blogPosts.map((post, index) => (
          <motion.article 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-300 group border-l-4 border-[#6D4A72]"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-[#F8F0F5] rounded-lg">
                {post.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#4A154B]">{post.category}</h3>
                <p className="text-sm text-[#6D4A72]">{post.date}</p>
              </div>
            </div>
            
            <h4 className="text-xl lg:text-2xl font-bold text-[#4A154B] mb-4">
              {post.title}
            </h4>
            
            <div className="text-[#6D4A72] whitespace-pre-line leading-relaxed mb-6">
              {post.excerpt}
            </div>
            
            <motion.div
              whileHover={{ x: 5 }}
              className="inline-flex items-center gap-2 text-[#4A154B] font-medium"
            >
              <ArrowRightIcon className="w-4 h-4" />
              <span>Continue Reading</span>
            </motion.div>
            
            <div className="mt-4 pt-4 border-t border-[#F8F0F5] text-sm text-[#6D4A72]">
              {post.readTime} • 2.4k views
            </div>
          </motion.article>
        ))}
      </div>

      {/* Newsletter Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto mt-20 bg-gradient-to-r from-[#4A154B] to-[#6D4A72] rounded-2xl p-8 lg:p-12 text-center text-white"
      >
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-2xl lg:text-3xl font-bold">Stay Informed</h2>
          <p className="text-lg text-white/90">
            Get weekly insights on fashion innovation, sustainability practices, and exclusive previews
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-6 py-3 rounded-full bg-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-[#4A154B] rounded-full font-semibold"
            >
              Subscribe Now
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}