import { motion } from 'framer-motion';
import { EnvelopeIcon, ShieldCheckIcon, LockClosedIcon, DocumentTextIcon } from '@heroicons/react/24/solid';

const privacySections = [
  {
    title: "Data Collection & Usage",
    icon: <DocumentTextIcon className="w-10 h-10 text-[#4A154B]" />, // Lightish maroon
    content: `We collect user data to improve our services and provide personalized experiences. Data collected includes:
    - Personal Information: Name, Email, Phone Number
    - Payment Details: Encrypted & Secure
    - Shopping Preferences: Wishlist, Cart, Order History
    - Device & Location Data: For better delivery estimates
    
    Your data is never shared with third parties for marketing purposes. It is used only to enhance your experience and ensure security.`,
    additionalContent: `We adhere to strict data minimization principles, ensuring we only collect what is necessary. All data is anonymized where possible to protect your identity.`
  },
  {
    title: "Data Protection & Security",
    icon: <LockClosedIcon className="w-10 h-10 text-[#4A154B]" />, // Lightish maroon
    content: `We use top-tier security measures to protect user data:
    - AES-256 Encryption: For all transactions
    - Secure Cloud Storage: With end-to-end encryption
    - Multi-Factor Authentication (MFA): For login security
    - Regular Security Audits: Compliance with GDPR & CCPA laws
    
    If you detect any suspicious activity, please contact us immediately at security@kashvicreation.com.`,
    additionalContent: `Our security team monitors systems 24/7 to prevent unauthorized access. We also conduct regular penetration testing to identify and fix vulnerabilities.`
  },
  {
    title: "User Rights & Control",
    icon: <ShieldCheckIcon className="w-10 h-10 text-[#4A154B]" />, // Lightish maroon
    content: `You have full control over your data. You can:
    - Request Access: To your data at any time
    - Update or Correct: Personal details
    - Delete Your Account: And associated data (Irreversible)
    - Opt-Out: Of marketing communications
    
    Manage your privacy settings in your account dashboard.`,
    additionalContent: `We provide a simple, user-friendly interface to manage your data preferences. You can also download a copy of your data for personal use.`
  },
  {
    title: "Cookies & Tracking Policy",
    icon: <DocumentTextIcon className="w-10 h-10 text-[#4A154B]" />, // Lightish maroon
    content: `Our platform uses cookies to enhance user experience:
    - Essential Cookies: Required for website functionality
    - Analytical Cookies: Used for performance tracking (Google Analytics)
    - Marketing Cookies: Helps show relevant ads & offers
    
    You can control cookie preferences through browser settings. Disabling cookies may affect website functionality.`,
    additionalContent: `We provide a cookie consent banner to allow you to customize your preferences. You can also manage cookies directly from your account settings.`
  }
];

export default function PrivacyPolicy() {
    return (
      <div className="bg-gradient-to-b from-[#F8F0F5] to-[#FDF6F9] min-h-screen p-6 lg:p-12">
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-[#4A154B] mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#4A154B] to-[#4A154B]">
              Privacy Policy
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-[#4A154B] max-w-2xl mx-auto">
            Your Data, Our Responsibility – Committed to Transparent and Secure Data Practices
          </p>
        </motion.header>
  
        {/* Privacy Sections */}
        <div className="max-w-7xl mx-auto grid gap-8 lg:gap-12">
          {privacySections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative bg-white rounded-xl lg:rounded-2xl p-8 lg:p-10 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-[#4A154B]"
            >
              <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
                <div className="p-4 bg-[#F8F0F5] rounded-lg lg:shrink-0">
                  {section.icon}
                </div>
                <div className="space-y-4 lg:space-y-6">
                  <h2 className="text-2xl lg:text-3xl font-bold text-[#4A154B]">
                    {section.title}
                  </h2>
                  <div className="space-y-4">
                    <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                      {section.content}
                    </p>
                    <p className="text-[#4A154B] font-medium whitespace-pre-line">
                      {section.additionalContent}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
  
        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center mt-16 lg:mt-20"
        >
          <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 lg:p-10 shadow-lg">
            <h3 className="text-2xl lg:text-3xl font-bold text-[#4A154B] mb-4">
              Privacy Guardians
            </h3>
            <p className="text-lg text-[#4A154B] mb-6">
              Our dedicated team is always available to address your data concerns
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="mailto:privacy@kashvicreation.com"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#4A154B] to-[#4A154B] text-white rounded-full hover:shadow-lg transition-all"
            >
              <EnvelopeIcon className="w-5 h-5" />
              <span className="font-medium">Reach Our Experts</span>
            </motion.a>
          </div>
        </motion.div>
      </div>
    );
  }