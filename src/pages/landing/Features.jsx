import { motion } from 'framer-motion';
import {
  Calendar, TrendingUp, ChefHat, Heart, Zap, Shield,
  Clock, Apple, BarChart3, Sparkles, Filter, Share2,
  Bell, Smartphone, Lock, Palette, Cloud
} from 'lucide-react';

const FeatureSection = ({ icon: Icon, title, description, features, imagePosition = 'right' }) => (
  <div className={`grid lg:grid-cols-2 gap-12 items-center mb-20 ${imagePosition === 'left' ? 'lg:flex-row-reverse' : ''}`}>
    <motion.div
      initial={{ opacity: 0, x: imagePosition === 'right' ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={imagePosition === 'left' ? 'lg:order-2' : ''}
    >
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#006e1c]/10 to-[#4caf50]/10 flex items-center justify-center mb-6">
        <Icon size={28} className="text-[#006e1c]" />
      </div>
      <h3 className="text-2xl font-bold text-[#171d16] mb-4">{title}</h3>
      <p className="text-[#6f7a6b] mb-6">{description}</p>
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-[#006e1c]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-[#006e1c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm text-[#171d16]">{feature}</span>
          </li>
        ))}
      </ul>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, x: imagePosition === 'right' ? 30 : -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className={`bg-[#f5fbef] rounded-3xl p-8 ${imagePosition === 'left' ? 'lg:order-1' : ''}`}
    >
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center gap-2 pb-4 border-b border-[#becab9]/30 mb-4">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-[#f5fbef] rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#006e1c] to-[#4caf50] flex items-center justify-center">
                <Icon size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="h-2 bg-[#becab9]/50 rounded w-24 mb-2" />
                <div className="h-2 bg-[#becab9]/30 rounded w-16" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </div>
);

const CoreFeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white rounded-2xl p-6 shadow-sm border border-[#becab9]/30 hover:shadow-lg hover:border-[#4caf50]/30 transition-all group"
  >
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#006e1c]/10 to-[#4caf50]/10 flex items-center justify-center mb-4 group-hover:from-[#006e1c]/20 group-hover:to-[#4caf50]/20 transition-all">
      <Icon size={24} className="text-[#006e1c]" />
    </div>
    <h4 className="font-bold text-[#171d16] mb-2">{title}</h4>
    <p className="text-sm text-[#6f7a6b]">{description}</p>
  </motion.div>
);

export default function Features() {
  const coreFeatures = [
    {
      icon: Calendar,
      title: 'Smart Meal Planning',
      description: 'AI-powered meal planning that adapts to your preferences and schedule.'
    },
    {
      icon: TrendingUp,
      title: 'Advanced Analytics',
      description: 'Track your nutrition with detailed charts and progress reports.'
    },
    {
      icon: ChefHat,
      title: 'Recipe Database',
      description: 'Access 10,000+ healthy recipes with complete nutritional info.'
    },
    {
      icon: Heart,
      title: 'Health Goals',
      description: 'Set personalized goals and get recommendations to achieve them.'
    },
    {
      icon: Zap,
      title: 'Quick Templates',
      description: 'Save and reuse meal plan templates for different occasions.'
    },
    {
      icon: Shield,
      title: 'Dietary Support',
      description: 'Full support for keto, vegan, vegetarian, and other special diets.'
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
              Powerful features for <span className="text-[#006e1c]">healthier living</span>
            </h1>
            <p className="text-lg text-[#6f7a6b]">
              Everything you need to plan, track, and achieve your nutrition goals - all in one beautiful platform.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((feature) => (
              <CoreFeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeatureSection
            icon={Calendar}
            title="Intelligent Meal Planning"
            description="Our AI-powered meal planner creates personalized weekly plans based on your dietary preferences, health goals, and schedule."
            features={[
              'Weekly and monthly planning views',
              'Automatic grocery list generation',
              'Leftover and ingredient optimization',
              'Integration with popular grocery delivery services',
              'Seasonal recipe recommendations'
            ]}
            imagePosition="right"
          />

          <FeatureSection
            icon={BarChart3}
            title="Comprehensive Nutrition Tracking"
            description="Track every aspect of your nutrition with our detailed analytics dashboard. Understand your eating patterns and make informed decisions."
            features={[
              'Real-time calorie and macro tracking',
              'Micronutrient analysis (vitamins & minerals)',
              'Progress charts and trend analysis',
              'Weekly and monthly nutrition reports',
              'Goal achievement notifications'
            ]}
            imagePosition="left"
          />

          <FeatureSection
            icon={ChefHat}
            title="Curated Recipe Collection"
            description="Explore thousands of healthy, delicious recipes with detailed nutritional information and step-by-step instructions."
            features={[
              '10,000+ recipes with full nutrition data',
              'Advanced search and filtering options',
              'Recipe reviews and ratings from community',
              'Save favorites and create custom collections',
              'Share recipes with friends and family'
            ]}
            imagePosition="right"
          />
        </div>
      </section>

      {/* Additional Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-[#171d16] mb-4">
              And so much <span className="text-[#006e1c]">more</span>
            </h2>
            <p className="text-[#6f7a6b]">Additional features to enhance your meal planning experience.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Clock, title: 'Prep Time Estimates', desc: 'Know exactly how long each meal takes to prepare' },
              { icon: Share2, title: 'Easy Sharing', desc: 'Share meal plans with family or your nutritionist' },
              { icon: Bell, title: 'Smart Reminders', desc: 'Get notified when it is time to prep or eat' },
              { icon: Smartphone, title: 'Mobile Friendly', desc: 'Access your plans on any device, anywhere' },
              { icon: Lock, title: 'Privacy First', desc: 'Your data is encrypted and never shared' },
              { icon: Palette, title: 'Custom Themes', desc: 'Personalize the app with your favorite colors' },
              { icon: Cloud, title: 'Cloud Sync', desc: 'Your data syncs across all your devices' },
              { icon: Sparkles, title: 'AI Suggestions', desc: 'Get smart recommendations based on your habits' }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-[#f5fbef] flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} className="text-[#006e1c]" />
                </div>
                <div>
                  <h4 className="font-semibold text-[#171d16] text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-[#6f7a6b]">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#006e1c]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to experience these features?
            </h2>
            <p className="text-white/80 mb-8">
              Start your free trial today and discover why thousands trust NutriPlan for their nutrition needs.
            </p>
            <a
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#006e1c] font-bold rounded-xl hover:bg-[#f5fbef] transition-colors"
            >
              Start Free Trial
              <Sparkles size={20} />
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
