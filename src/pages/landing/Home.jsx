import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight, Calendar, ChefHat, Heart, TrendingUp, Users,
  Star, CheckCircle, Zap, Shield, Clock, Apple
} from 'lucide-react';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

// Feature card component
const FeatureCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-white rounded-2xl p-6 shadow-sm border border-[#becab9]/30 hover:shadow-lg hover:border-[#4caf50]/30 transition-all group"
  >
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#006e1c]/10 to-[#4caf50]/10 flex items-center justify-center mb-4 group-hover:from-[#006e1c]/20 group-hover:to-[#4caf50]/20 transition-all">
      <Icon size={24} className="text-[#006e1c]" />
    </div>
    <h3 className="font-bold text-[#171d16] mb-2">{title}</h3>
    <p className="text-sm text-[#6f7a6b]">{description}</p>
  </motion.div>
);

// Testimonial card
const TestimonialCard = ({ quote, author, role, rating, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className="bg-white rounded-2xl p-6 shadow-sm border border-[#becab9]/30"
  >
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? 'text-[#f59e0b] fill-[#f59e0b]' : 'text-[#becab9]'}
        />
      ))}
    </div>
    <p className="text-[#171d16] mb-4 italic">"{quote}"</p>
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#006e1c] to-[#4caf50] flex items-center justify-center text-white font-bold text-sm">
        {author.charAt(0)}
      </div>
      <div>
        <p className="font-semibold text-sm text-[#171d16]">{author}</p>
        <p className="text-xs text-[#6f7a6b]">{role}</p>
      </div>
    </div>
  </motion.div>
);

// Step component
const Step = ({ number, title, description, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex gap-4 items-start"
  >
    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#006e1c] flex items-center justify-center text-white font-bold">
      {number}
    </div>
    <div className="flex-1 pb-8 border-l-2 border-[#becab9]/30 pl-8 -ml-6 last:border-0">
      <div className="w-10 h-10 rounded-lg bg-[#f5fbef] flex items-center justify-center mb-2">
        <Icon size={20} className="text-[#006e1c]" />
      </div>
      <h3 className="font-bold text-[#171d16] mb-1">{title}</h3>
      <p className="text-sm text-[#6f7a6b]">{description}</p>
    </div>
  </motion.div>
);

export default function Home() {
  const features = [
    {
      icon: Calendar,
      title: 'Smart Meal Planning',
      description: 'Create personalized weekly meal plans tailored to your dietary preferences and goals.'
    },
    {
      icon: TrendingUp,
      title: 'Nutrition Tracking',
      description: 'Monitor calories, macros, and micronutrients in real-time with detailed analytics.'
    },
    {
      icon: ChefHat,
      title: 'Recipe Discovery',
      description: 'Browse thousands of healthy recipes with detailed nutritional information.'
    },
    {
      icon: Heart,
      title: 'Health Goals',
      description: 'Set and track your health goals with personalized recommendations.'
    },
    {
      icon: Zap,
      title: 'Quick Templates',
      description: 'Save time with customizable meal plan templates for every lifestyle.'
    },
    {
      icon: Shield,
      title: 'Dietary Preferences',
      description: 'Support for vegetarian, vegan, keto, and other special diets.'
    }
  ];

  const testimonials = [
    {
      quote: "NutriPlan has completely transformed how I eat. I've lost 20 pounds and feel more energetic than ever!",
      author: "Sarah Johnson",
      role: "Fitness Enthusiast",
      rating: 5
    },
    {
      quote: "As a busy professional, I never had time to plan meals. Now I eat healthy every day without the stress.",
      author: "Michael Chen",
      role: "Software Engineer",
      rating: 5
    },
    {
      quote: "The recipe recommendations are spot on! My whole family loves the meals I prepare now.",
      author: "Emily Rodriguez",
      role: "Working Mom",
      rating: 5
    }
  ];

  const stats = [
    { value: '50K+', label: 'Active Users', icon: Users },
    { value: '10K+', label: 'Recipes', icon: ChefHat },
    { value: '1M+', label: 'Meals Planned', icon: Apple },
    { value: '98%', label: 'Satisfaction', icon: Star }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#4caf50]/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#006e1c]/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#006e1c]/10 rounded-full text-[#006e1c] text-sm font-semibold mb-6"
              >
                <Star size={16} className="fill-[#006e1c]" />
                Trusted by 50,000+ users worldwide
              </motion.div>

              <h1 className="text-5xl lg:text-6xl font-black text-[#171d16] leading-tight mb-6">
                Plan Your Meals,<br />
                <span className="text-[#006e1c]">Transform</span> Your Health
              </h1>

              <p className="text-lg text-[#6f7a6b] mb-8 max-w-lg">
                NutriPlan helps you create personalized meal plans, track nutrition, and achieve your health goals with smart recommendations and beautiful analytics.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#006e1c] text-white font-semibold rounded-xl hover:bg-[#005a17] transition-colors shadow-lg shadow-[#006e1c]/20"
                >
                  Start Free Trial
                  <ArrowRight size={20} />
                </Link>
                <Link
                  to="/features"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#006e1c] font-semibold rounded-xl border-2 border-[#006e1c]/20 hover:border-[#006e1c] transition-colors"
                >
                  Explore Features
                </Link>
              </div>

              <div className="flex items-center gap-6 mt-8 text-sm text-[#6f7a6b]">
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-[#006e1c]" />
                  Free 14-day trial
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-[#006e1c]" />
                  No credit card required
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white rounded-3xl shadow-2xl p-6 border border-[#becab9]/30">
                {/* Mock Dashboard Preview */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 pb-4 border-b border-[#becab9]/30">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#f5fbef] rounded-xl p-4">
                      <div className="w-8 h-8 rounded-lg bg-[#006e1c]/20 flex items-center justify-center mb-2">
                        <Calendar size={16} className="text-[#006e1c]" />
                      </div>
                      <p className="text-xs text-[#6f7a6b]">Weekly Plan</p>
                      <p className="font-bold text-[#171d16]">21 meals</p>
                    </div>
                    <div className="bg-[#f5fbef] rounded-xl p-4">
                      <div className="w-8 h-8 rounded-lg bg-[#0061a4]/20 flex items-center justify-center mb-2">
                        <TrendingUp size={16} className="text-[#0061a4]" />
                      </div>
                      <p className="text-xs text-[#6f7a6b]">Calories</p>
                      <p className="font-bold text-[#171d16]">1,850 kcal</p>
                    </div>
                  </div>
                  <div className="bg-[#f5fbef] rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#006e1c] to-[#4caf50] flex items-center justify-center">
                        <Apple size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[#171d16]">Breakfast</p>
                        <p className="text-xs text-[#6f7a6b]">Oatmeal with berries</p>
                      </div>
                      <span className="ml-auto text-sm font-semibold text-[#006e1c]">350 kcal</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0061a4] to-[#33a0fd] flex items-center justify-center">
                        <ChefHat size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[#171d16]">Lunch</p>
                        <p className="text-xs text-[#6f7a6b]">Grilled chicken salad</p>
                      </div>
                      <span className="ml-auto text-sm font-semibold text-[#0061a4]">520 kcal</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-3 border border-[#becab9]/30"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#006e1c]/10 flex items-center justify-center">
                    <Heart size={16} className="text-[#006e1c]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#171d16]">Goal Progress</p>
                    <p className="text-xs text-[#6f7a6b]">85% completed</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-3 border border-[#becab9]/30"
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[#f59e0b]/10 flex items-center justify-center">
                    <Clock size={16} className="text-[#f59e0b]" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#171d16]">Time Saved</p>
                    <p className="text-xs text-[#6f7a6b]">5 hours/week</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-[#becab9]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#f5fbef] mb-3">
                  <stat.icon size={24} className="text-[#006e1c]" />
                </div>
                <p className="text-3xl font-black text-[#171d16]">{stat.value}</p>
                <p className="text-sm text-[#6f7a6b]">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-black text-[#171d16] mb-4">
              Everything you need to <span className="text-[#006e1c]">eat healthier</span>
            </h2>
            <p className="text-lg text-[#6f7a6b] max-w-2xl mx-auto">
              Powerful features designed to make meal planning simple, enjoyable, and effective.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                {...feature}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-black text-[#171d16] mb-6">
                Get started in <span className="text-[#006e1c]">3 easy steps</span>
              </h2>
              <p className="text-[#6f7a6b] mb-8">
                From signup to your first meal plan - we have made the process simple and intuitive.
              </p>

              <div className="space-y-0">
                <Step
                  number={1}
                  icon={Users}
                  title="Create Your Profile"
                  description="Set up your health goals, dietary preferences, and personal information."
                />
                <Step
                  number={2}
                  icon={Calendar}
                  title="Generate Your Plan"
                  description="Our AI creates a personalized meal plan based on your preferences and goals."
                />
                <Step
                  number={3}
                  icon={ChefHat}
                  title="Enjoy Healthy Meals"
                  description="Follow your plan, track your progress, and adjust as needed."
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#f5fbef] rounded-3xl p-8"
            >
              <div className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
                <div className="flex items-center gap-3 pb-4 border-b border-[#becab9]/30">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#006e1c] to-[#4caf50]" />
                  <div>
                    <p className="font-semibold text-[#171d16]">John's Meal Plan</p>
                    <p className="text-xs text-[#6f7a6b]">Week of Jan 15-21</p>
                  </div>
                  <span className="ml-auto px-3 py-1 bg-[#006e1c]/10 text-[#006e1c] text-xs font-semibold rounded-full">
                    Active
                  </span>
                </div>
                <div className="space-y-3">
                  {['Monday', 'Tuesday', 'Wednesday'].map((day, i) => (
                    <div key={day} className="flex items-center gap-3 p-3 bg-[#f5fbef] rounded-lg">
                      <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center font-bold text-sm text-[#006e1c]">
                        {day.slice(0, 2)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[#171d16]">{day}</p>
                        <p className="text-xs text-[#6f7a6b]">3 meals planned</p>
                      </div>
                      <CheckCircle size={18} className="text-[#006e1c]" />
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-black text-[#171d16] mb-4">
              Loved by <span className="text-[#006e1c]">thousands</span>
            </h2>
            <p className="text-lg text-[#6f7a6b]">
              See what our users have to say about their NutriPlan experience.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.author}
                {...testimonial}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#006e1c] relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#4caf50]/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#4caf50]/20 rounded-full blur-3xl" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-black text-white mb-4">
              Ready to transform your eating habits?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
              Join 50,000+ users who are already eating healthier with NutriPlan. Start your free trial today.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-[#006e1c] font-bold rounded-xl hover:bg-[#f5fbef] transition-colors shadow-lg"
              >
                Get Started Free
                <ArrowRight size={20} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#006e1c] text-white font-bold rounded-xl border-2 border-white/30 hover:bg-[#005a17] transition-colors"
              >
                Contact Sales
              </Link>
            </div>

            <p className="text-sm text-white/60 mt-6">
              14-day free trial • No credit card required • Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
