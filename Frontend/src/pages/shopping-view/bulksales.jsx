// app/components/BulkSales.jsx
import { motion } from 'framer-motion';
import { CurrencyDollarIcon, ScaleIcon, TruckIcon, ShieldCheckIcon, ArrowPathIcon, PhoneIcon } from '@heroicons/react/24/solid';

const bulkBenefits = [
  {
    icon: <CurrencyDollarIcon className="w-8 h-8" />,
    title: "Volume Discounts",
    content: "Save up to 45% with tiered pricing models"
  },
  {
    icon: <TruckIcon className="w-8 h-8" />,
    title: "Priority Shipping",
    content: "Guanteed worldwide delivery within 5-7 days"
  },
  // Add 4 more benefits...
];

export default function BulkSales() {
  return (
    <div className="bg-gradient-to-b from-[#F8F0F5] to-[#FDF6F9] min-h-screen p-6 lg:p-12">
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12 lg:mb-16"
      >
        <h1 className="text-4xl lg:text-6xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4A154B] to-[#4A154B]">
            Bulk Excellence
          </span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg lg:text-xl text-[#4A154B] max-w-3xl mx-auto leading-relaxed"
        >
          Custom Solutions for Retailers, Corporates & Event Planners | Volume Discounts & Priority Support
        </motion.p>
      </motion.header>

      {/* Benefits Grid */}
      <motion.div 
        className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1 }}
      >
        {bulkBenefits.map((benefit, index) => (
          <motion.div
            key={index}
            initial={{ y: 50 }}
            whileInView={{ y: 0 }}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all group"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-[#F8F0F5] rounded-lg text-[#4A154B]">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-[#4A154B]">{benefit.title}</h3>
            </div>
            <p className="text-[#4A154B]">{benefit.content}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
        {/* Left Column */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-[#4A154B] mb-6">Why Choose Us?</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <ShieldCheckIcon className="w-6 h-6 text-[#4A154B] mt-1" />
                <div>
                  <h4 className="font-bold text-[#4A154B]">Trusted Partnerships</h4>
                  <p className="text-[#4A154B]">500+ successful corporate collaborations</p>
                </div>
              </div>
              {/* Add more items... */}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#4A154B] to-[#4A154B] rounded-2xl p-8 text-white">
            <h2 className="text-2xl font-bold mb-6">Process Timeline</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">1</div>
                <div>
                  <h4 className="font-bold">Request Quote</h4>
                  <p className="text-sm opacity-90">24-hour response time</p>
                </div>
              </div>
              {/* Add steps 2-4... */}
            </div>
          </div>
        </motion.div>

        {/* Right Column - Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-8 lg:p-12 shadow-xl"
        >
          <h2 className="text-3xl font-bold text-[#4A154B] mb-8">Get Custom Quote</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-[#4A154B] font-medium mb-2">Organization Name</label>
              <input 
                type="text" 
                className="w-full p-4 border-2 border-[#F8F0F5] rounded-xl focus:border-[#4A154B] focus:ring-2 focus:ring-[#4A154B] transition-all"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-[#4A154B] font-medium mb-2">Contact Email</label>
                <input 
                  type="email" 
                  className="w-full p-4 border-2 border-[#F8F0F5] rounded-xl focus:border-[#4A154B] focus:ring-2 focus:ring-[#4A154B] transition-all"
                />
              </div>
              <div>
                <label className="block text-[#4A154B] font-medium mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  className="w-full p-4 border-2 border-[#F8F0F5] rounded-xl focus:border-[#4A154B] focus:ring-2 focus:ring-[#4A154B] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#4A154B] font-medium mb-2">Additional Requirements</label>
              <textarea 
                rows="4"
                className="w-full p-4 border-2 border-[#F8F0F5] rounded-xl focus:border-[#4A154B] focus:ring-2 focus:ring-[#4A154B] transition-all"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-gradient-to-r from-[#4A154B] to-[#4A154B] text-white py-4 rounded-xl font-bold text-lg"
            >
              Request Personalized Quote
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Trust Badges */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="max-w-4xl mx-auto mt-16 flex flex-wrap justify-center gap-8"
      >
        {["secure-payments", "iso-certified", "eco-friendly"].map((badge, index) => (
          <motion.img
            key={index}
            whileHover={{ y: -5 }}
            src={`/${badge}-badge.svg`}
            alt={badge}
            className="h-16 opacity-80 hover:opacity-100 transition-all"
          />
        ))}
      </motion.div>
    </div>
  );
}