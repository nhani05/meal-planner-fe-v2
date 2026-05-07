import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail, MapPin, Phone, Clock, Send, CheckCircle,
  HelpCircle, MessageSquare, FileQuestion, ChevronDown
} from 'lucide-react';

const ContactInfo = ({ icon: Icon, title, content, subContent }) => (
  <div className="flex items-start gap-4">
    <div className="w-12 h-12 rounded-xl bg-[#006e1c]/10 flex items-center justify-center flex-shrink-0">
      <Icon size={24} className="text-[#006e1c]" />
    </div>
    <div>
      <h4 className="font-semibold text-[#171d16] mb-1">{title}</h4>
      <p className="text-[#171d16]">{content}</p>
      {subContent && <p className="text-sm text-[#6f7a6b]">{subContent}</p>}
    </div>
  </div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#becab9]/30 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-left"
      >
        <span className="font-semibold text-[#171d16] pr-4">{question}</span>
        <ChevronDown
          size={20}
          className={`text-[#6f7a6b] flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        className="overflow-hidden"
      >
        <p className="pb-4 text-[#6f7a6b]">{answer}</p>
      </motion.div>
    </div>
  );
};

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const faqs = [
    {
      question: 'How do I get started with NutriPlan?',
      answer: 'Simply create an account, complete your health profile, and our AI will generate your first personalized meal plan. You can start with our 14-day free trial with no credit card required.'
    },
    {
      question: 'Can I customize my meal plans?',
      answer: 'Absolutely! You can set dietary preferences, allergies, calorie targets, and meal schedules. Our system adapts to create plans that match your specific needs.'
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'NutriPlan is fully responsive and works great on mobile browsers. We are also developing native iOS and Android apps coming later this year.'
    },
    {
      question: 'How do I cancel my subscription?',
      answer: 'You can cancel anytime from your account settings. Your access will continue until the end of your current billing period.'
    },
    {
      question: 'Do you offer refunds?',
      answer: 'Yes, we offer a 30-day money-back guarantee if you are not satisfied with NutriPlan for any reason.'
    },
    {
      question: 'Can I share my meal plan with others?',
      answer: 'Yes! You can share your meal plans via email or generate a shareable link. Family plans allowing multiple profiles are also available.'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#4caf50]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#006e1c]/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl lg:text-5xl font-black text-[#171d16] mb-6">
              Get in <span className="text-[#006e1c]">touch</span>
            </h1>
            <p className="text-lg text-[#6f7a6b]">
              Have questions? We would love to hear from you. Send us a message and we will respond as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-2xl shadow-sm border border-[#becab9]/30 p-8">
                <h2 className="text-2xl font-bold text-[#171d16] mb-6">Send us a message</h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-[#006e1c]/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={32} className="text-[#006e1c]" />
                    </div>
                    <h3 className="text-xl font-bold text-[#171d16] mb-2">Message Sent!</h3>
                    <p className="text-[#6f7a6b]">We will get back to you within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-[#171d16] mb-1">
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-[#becab9]/50 focus:border-[#006e1c] focus:ring-2 focus:ring-[#006e1c]/20 outline-none transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-[#171d16] mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-[#becab9]/50 focus:border-[#006e1c] focus:ring-2 focus:ring-[#006e1c]/20 outline-none transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#171d16] mb-1">
                        Subject
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-[#becab9]/50 focus:border-[#006e1c] focus:ring-2 focus:ring-[#006e1c]/20 outline-none transition-all bg-white"
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="billing">Billing Question</option>
                        <option value="partnership">Partnership</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-[#171d16] mb-1">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl border border-[#becab9]/50 focus:border-[#006e1c] focus:ring-2 focus:ring-[#006e1c]/20 outline-none transition-all resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#006e1c] text-white font-semibold rounded-xl hover:bg-[#005a17] transition-colors"
                    >
                      <Send size={18} />
                      Send Message
                    </button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl font-bold text-[#171d16] mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <ContactInfo
                    icon={Mail}
                    title="Email"
                    content="hello@nutriplan.com"
                    subContent="We respond within 24 hours"
                  />
                  <ContactInfo
                    icon={Phone}
                    title="Phone"
                    content="+1 (234) 567-890"
                    subContent="Mon-Fri from 9am to 6pm"
                  />
                  <ContactInfo
                    icon={MapPin}
                    title="Office"
                    content="123 Health Street, Wellness City"
                    subContent="California, USA 90210"
                  />
                  <ContactInfo
                    icon={Clock}
                    title="Working Hours"
                    content="Monday - Friday"
                    subContent="9:00 AM - 6:00 PM PST"
                  />
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-[#f5fbef] rounded-2xl p-4">
                <div className="bg-[#dee4d9] rounded-xl h-48 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin size={32} className="text-[#6f7a6b] mx-auto mb-2" />
                    <p className="text-sm text-[#6f7a6b]">Interactive Map</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#171d16] mb-4">
              Frequently asked <span className="text-[#006e1c]">questions</span>
            </h2>
            <p className="text-[#6f7a6b]">
              Find quick answers to common questions. Can not find what you are looking for? Contact us directly.
            </p>
          </motion.div>

          <div className="bg-white rounded-2xl shadow-sm border border-[#becab9]/30 p-6">
            {faqs.map((faq, index) => (
              <FAQItem key={index} {...faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Quick Support Cards */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: HelpCircle,
                title: 'Help Center',
                description: 'Browse our comprehensive documentation and tutorials.',
                action: 'Visit Help Center'
              },
              {
                icon: MessageSquare,
                title: 'Live Chat',
                description: 'Chat with our support team in real-time during business hours.',
                action: 'Start Chat'
              },
              {
                icon: FileQuestion,
                title: 'Community Forum',
                description: 'Join discussions with other NutriPlan users and share tips.',
                action: 'Join Forum'
              }
            ].map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-[#f5fbef] rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mx-auto mb-4">
                  <card.icon size={24} className="text-[#006e1c]" />
                </div>
                <h4 className="font-bold text-[#171d16] mb-2">{card.title}</h4>
                <p className="text-sm text-[#6f7a6b] mb-4">{card.description}</p>
                <a
                  href="#"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-[#006e1c] hover:underline"
                >
                  {card.action}
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
