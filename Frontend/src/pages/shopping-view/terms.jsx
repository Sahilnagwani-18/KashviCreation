import { motion } from "framer-motion";
import { Truck, CreditCard, Ruler, Shield, HeartHandshake, Recycle } from "lucide-react";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/solid";

const termsSections = [
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Worldwide Couture Delivery",
    content: {
      main: "We deliver designer wear to 150+ countries through trusted partners:",
      points: [
        "Standard Shipping: 7-12 business days",
        "Express Delivery: 3-5 business days (₹890 extra)",
        "Bridal Emergency Service: 48hr delivery (select cities)",
        "Live tracking with predictive analytics"
      ],
      note: "Custom orders require 2-3 weeks crafting time before shipping"
    }
  },
  {
    icon: <CreditCard className="w-6 h-6" />,
    title: "Secure Payment Ecosystem",
    content: {
      main: "Protected by RBI-compliant payment gateways:",
      methods: [
        { name: "Credit/Debit Cards", icon: "💳" },
        { name: "UPI Payments", icon: "📱" },
        { name: "EMI Options", icon: "📅", terms: "3-12 months via ICICI/HSBC" },
        { name: "Designer Wallet", icon: "👛", desc: "Store credit for future collections" }
      ],
      security: "PCI-DSS Level 1 Certified | 256-bit SSL Encryption"
    }
  },
  {
    icon: <Ruler className="w-6 h-6" />,
    title: "Perfect Fit Guarantee",
    content: {
      promise: "Three pillars of sizing assurance:",
      pillars: [
        {
          title: "Virtual Tailor",
          desc: "AI-powered size recommendations using 50+ body metrics",
          link: "/virtual-tailor"
        },
        {
          title: "Free Alterations",
          desc: "First adjustment free within 30 days",
          terms: "Excludes sale items"
        },
        {
          title: "Size Exchange",
          desc: "No-questions asked within 14 days",
          icon: "🔄"
        }
      ]
    }
  },
  {
    icon: <Ruler className="w-6 h-6" />,
    title: "Artisan Craft Commitment",
    content: {
      pledge: "Every garment comes with:",
      features: [
        "Hand-stitched quality certification",
        "Natural dye authenticity seal",
        "Sustainable packaging (recyclable silk wraps)",
        "Digital artisan profile access"
      ],
      assurance: "0 tolerance for machine-made replicas"
    }
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "10-Year Heritage Warranty",
    content: {
      coverage: [
        "Fabric integrity against defects",
        "Zari work preservation",
        "Color fastness guarantee",
        "Free annual deep cleaning (select items)"
      ],
      exclusions: "Normal wear & tear, improper storage",
      claim: "Submit heritage certificate for service"
    }
  },
  {
    icon: <HeartHandshake className="w-6 h-6" />,
    title: "Ethical Resale Program",
    content: {
      program: [
        "Get 40% value back when upgrading collections",
        "VIP access to pre-owned designer vault",
        "Charity donation matching program"
      ],
      terms: "Items must maintain 90%+ original condition"
    }
  },
  {
    icon: <Recycle className="w-6 h-6" />,
    title: "Sustainable Care System",
    content: {
      steps: [
        "Free eco-clean kit with every silk purchase",
        "Carbon-neutral dry cleaning partners",
        "End-of-life recycling program",
        "Rewards for sustainable care practices"
      ]
    }
  }
];

export default function TermsConditions() {
  return (
    <div className="bg-[#F1D7F5] min-h-screen">
      {/* Hero Section */}
      <motion.header 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative h-[400px] overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r bg-[#F1D7F5] to-[#F1D7F9]" />
        <div className="relative max-w-6xl mx-auto px-4 pt-32 text-center">
          <h1 className="text-5xl font-bold text-[#5A4A4F] mb-4">
            Crafted Commitments
          </h1>
          <p className="text-xl text-[#A37B73]">
            Your Trust, Our Promise
          </p>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid gap-12 mb-16">
          {termsSections.map((section, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Section Header */}
              <div className="flex items-center p-6 bg-gradient-to-r from-[#F1D7F5] to-[#F1D7F9]">
                <div className="p-3 bg-white rounded-lg shadow-sm mr-4">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-semibold text-[#5A4A4F]">
                  {section.title}
                </h2>
              </div>

              {/* Content Area */}
              <div className="p-6">
                {section.content.main && (
                  <p className="text-lg text-[#5A4A4F] mb-4">
                    {section.content.main}
                  </p>
                )}

                {/* Render content points */}
                {section.content.points && (
                  <div className="space-y-4">
                    {section.content.points.map((point, i) => (
                      <div key={i} className="flex items-start p-4 bg-[#F1D7F5] rounded-lg">
                        <div className="w-6 h-6 bg-[#F1D7F5] text-white rounded-full flex items-center justify-center mr-3">
                          {i + 1}
                        </div>
                        <span className="flex-1">{point}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Render methods (for payment section) */}
                {section.content.methods && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.content.methods.map((method, i) => (
                      <div key={i} className="p-4 bg-[#F1D7F] rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{method.icon}</span>
                          <span className="font-medium">{method.name}</span>
                        </div>
                        {method.terms && (
                          <p className="text-sm text-[#A37B73] mt-1">{method.terms}</p>
                        )}
                        {method.desc && (
                          <p className="text-sm text-[#5A4A4F] mt-1">{method.desc}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Render pillars (for fit guarantee section) */}
                {section.content.pillars && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {section.content.pillars.map((pillar, i) => (
                      <div key={i} className="p-4 bg-[#FFF8F5] rounded-lg">
                        <h3 className="font-semibold text-[#5A4A4F]">{pillar.title}</h3>
                        <p className="text-sm text-[#A37B73] mt-1">{pillar.desc}</p>
                        {pillar.terms && (
                          <p className="text-xs text-[#A37B73] mt-1">{pillar.terms}</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Render features (for artisan section) */}
                {section.content.features && (
                  <div className="space-y-4">
                    {section.content.features.map((feature, i) => (
                      <div key={i} className="flex items-start p-4 bg-[#FFF8F5] rounded-lg">
                        <div className="w-6 h-6 bg-[#A37B73] text-white rounded-full flex items-center justify-center mr-3">
                          {i + 1}
                        </div>
                        <span className="flex-1">{feature}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Render coverage (for warranty section) */}
                {section.content.coverage && (
                  <div className="space-y-4">
                    {section.content.coverage.map((item, i) => (
                      <div key={i} className="flex items-start p-4 bg-[#FFF8F5] rounded-lg">
                        <div className="w-6 h-6 bg-[#A37B73] text-white rounded-full flex items-center justify-center mr-3">
                          {i + 1}
                        </div>
                        <span className="flex-1">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Render program (for resale section) */}
                {section.content.program && (
                  <div className="space-y-4">
                    {section.content.program.map((item, i) => (
                      <div key={i} className="flex items-start p-4 bg-[#FFF8F5] rounded-lg">
                        <div className="w-6 h-6 bg-[#A37B73] text-white rounded-full flex items-center justify-center mr-3">
                          {i + 1}
                        </div>
                        <span className="flex-1">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Render steps (for sustainability section) */}
                {section.content.steps && (
                  <div className="space-y-4">
                    {section.content.steps.map((step, i) => (
                      <div key={i} className="flex items-start p-4 bg-[#FFF8F5] rounded-lg">
                        <div className="w-6 h-6 bg-[#A37B73] text-white rounded-full flex items-center justify-center mr-3">
                          {i + 1}
                        </div>
                        <span className="flex-1">{step}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Additional Notes */}
                {section.content.note && (
                  <p className="text-sm text-[#A37B73] mt-4">{section.content.note}</p>
                )}
                {section.content.security && (
                  <p className="text-sm text-[#A37B73] mt-4">{section.content.security}</p>
                )}
                {section.content.assurance && (
                  <p className="text-sm text-[#A37B73] mt-4">{section.content.assurance}</p>
                )}
                {section.content.exclusions && (
                  <p className="text-sm text-[#A37B73] mt-4">{section.content.exclusions}</p>
                )}
                {section.content.claim && (
                  <p className="text-sm text-[#A37B73] mt-4">{section.content.claim}</p>
                )}
                {section.content.terms && (
                  <p className="text-sm text-[#A37B73] mt-4">{section.content.terms}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-12">
          <TrustBadge icon="🎗️" title="Handloom Certified" />
          <TrustBadge icon="🌿" title="Eco-Friendly Dyes" />
          <TrustBadge icon="🛡️" title="Secure Payments" />
          <TrustBadge icon="📦" title="Global Shipping" />
        </div>

        {/* Contact Section */}
        <div className="text-center border-t pt-8">
          <h3 className="text-xl font-semibold mb-4 text-[#5A4A4F]">
            Need Assistance?
          </h3>
          <div className="flex justify-center gap-6">
            <ContactLink 
              icon={<EnvelopeIcon />}
              label="legal@kashvicreation.com"
              href="mailto:legal@kashvicreation.com"
            />
            <ContactLink
              icon={<PhoneIcon />}
              label="+91 12345 67890"
              href="tel:+911234567890"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Reusable Components
const TrustBadge = ({ icon, title }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    className="p-4 bg-white rounded-xl shadow-md"
  >
    <div className="text-3xl mb-2">{icon}</div>
    <p className="text-sm font-medium text-[#5A4A4F]">{title}</p>
  </motion.div>
);

const ContactLink = ({ icon, label, href }) => (
  <motion.a
    whileHover={{ scale: 1.05 }}
    href={href}
    className="flex items-center gap-2 text-[#A37B73]"
  >
    <div className="w-8 h-8 bg-[#F5E6E8] rounded-full flex items-center justify-center">
      {icon}
    </div>
    <span className="hidden sm:inline">{label}</span>
  </motion.a>
);