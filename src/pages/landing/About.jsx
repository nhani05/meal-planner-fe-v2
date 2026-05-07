import { motion } from 'framer-motion';
import { Target, Heart, Leaf, Users, Award, Globe } from 'lucide-react';

const ValueCard = ({ icon: Icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white rounded-2xl p-6 shadow-sm border border-[#becab9]/30 hover:shadow-lg transition-all"
  >
    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#006e1c]/10 to-[#4caf50]/10 flex items-center justify-center mb-4">
      <Icon size={24} className="text-[#006e1c]" />
    </div>
    <h3 className="font-bold text-[#171d16] mb-2">{title}</h3>
    <p className="text-sm text-[#6f7a6b]">{description}</p>
  </motion.div>
);

const TeamMember = ({ name, role, bio, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    className="bg-white rounded-2xl p-6 shadow-sm border border-[#becab9]/30 text-center"
  >
    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#006e1c] to-[#4caf50] flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
      {name.charAt(0)}
    </div>
    <h4 className="font-bold text-[#171d16] mb-1">{name}</h4>
    <p className="text-sm text-[#006e1c] font-medium mb-3">{role}</p>
    <p className="text-sm text-[#6f7a6b]">{bio}</p>
  </motion.div>
);

const StatItem = ({ value, label, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="text-center"
  >
    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#006e1c]/10 mb-3">
      <Icon size={28} className="text-[#006e1c]" />
    </div>
    <p className="text-3xl font-black text-white mb-1">{value}</p>
    <p className="text-sm text-white/80">{label}</p>
  </motion.div>
);

const TimelineItem = ({ year, title, description, isLeft }) => (
  <div className={`flex items-center gap-8 ${isLeft ? 'flex-row-reverse' : ''}`}>
    <div className={`flex-1 ${isLeft ? 'text-right' : 'text-left'}`}>
      <motion.div
        initial={{ opacity: 0, x: isLeft ? 20 : -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <span className="inline-block px-3 py-1 bg-[#006e1c] text-white text-sm font-semibold rounded-full mb-2">
          {year}
        </span>
        <h4 className="font-bold text-[#171d16] mb-1">{title}</h4>
        <p className="text-sm text-[#6f7a6b]">{description}</p>
      </motion.div>
    </div>
    <div className="relative flex-shrink-0">
      <div className="w-4 h-4 rounded-full bg-[#006e1c] ring-4 ring-[#f5fbef]" />
    </div>
    <div className="flex-1" />
  </div>
);

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Health First',
      description: 'We believe good nutrition is the foundation of a healthy life. Every feature we build prioritizes your wellbeing.'
    },
    {
      icon: Target,
      title: 'Personalization',
      description: 'Everyone is unique. Our platform adapts to your individual needs, preferences, and goals.'
    },
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'We promote sustainable eating habits and food choices that are good for you and the planet.'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Healthy living is better together. We foster a supportive community of like-minded individuals.'
    }
  ];

  const team = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      bio: 'Former nutritionist with 10+ years experience in dietary planning and health coaching.'
    },
    {
      name: 'Maria Garcia',
      role: 'Head of Product',
      bio: 'Product leader passionate about creating intuitive health and wellness applications.'
    },
    {
      name: 'David Kim',
      role: 'Lead Developer',
      bio: 'Full-stack engineer specializing in scalable web applications and AI integration.'
    },
    {
      name: 'Sarah Thompson',
      role: 'Nutrition Expert',
      bio: 'Registered dietitian ensuring our recommendations are scientifically sound.'
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
              Our mission is to make <span className="text-[#006e1c]">healthy eating</span> simple
            </h1>
            <p className="text-lg text-[#6f7a6b]">
              Founded in 2023, NutriPlan began with a simple idea: everyone deserves access to personalized nutrition guidance. Today, we are helping thousands achieve their health goals.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#006e1c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatItem value="50K+" label="Active Users" icon={Users} />
            <StatItem value="1M+" label="Meals Planned" icon={Leaf} />
            <StatItem value="98%" label="Satisfaction Rate" icon={Award} />
            <StatItem value="30+" label="Countries" icon={Globe} />
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-[#171d16] mb-4">
              Our <span className="text-[#006e1c]">core values</span>
            </h2>
            <p className="text-[#6f7a6b] max-w-2xl mx-auto">
              The principles that guide everything we do at NutriPlan.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <ValueCard key={value.title} {...value} />
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-[#171d16] mb-6">
                The story behind <span className="text-[#006e1c]">NutriPlan</span>
              </h2>
              <div className="space-y-4 text-[#6f7a6b]">
                <p>
                  It all started when our founder, Alex, was working as a nutritionist in a busy clinic. Day after day, he saw patients struggling with the same problem: they knew what they should eat, but planning and preparing healthy meals felt overwhelming.
                </p>
                <p>
                  "I had clients who would spend hours each week trying to plan their meals, only to give up and order takeout," Alex recalls. "I knew there had to be a better way."
                </p>
                <p>
                  In 2023, Alex teamed up with software engineer David to create NutriPlan. Their vision was clear: build an intelligent platform that makes personalized nutrition accessible to everyone.
                </p>
                <p>
                  Today, NutriPlan has grown into a team of 15 passionate individuals, from nutritionists to designers, all united by the goal of making healthy eating simple and enjoyable.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#f5fbef] rounded-3xl p-8"
            >
              <div className="space-y-8">
                <TimelineItem
                  year="2023"
                  title="The Beginning"
                  description="NutriPlan founded with a mission to simplify healthy eating"
                  isLeft={false}
                />
                <TimelineItem
                  year="2024"
                  title="First 10,000 Users"
                  description="Reached our first milestone of active users"
                  isLeft={true}
                />
                <TimelineItem
                  year="2024"
                  title="AI-Powered Features"
                  description="Launched intelligent meal planning capabilities"
                  isLeft={false}
                />
                <TimelineItem
                  year="2025"
                  title="Global Expansion"
                  description="Now serving users in 30+ countries worldwide"
                  isLeft={true}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-[#171d16] mb-4">
              Meet our <span className="text-[#006e1c]">team</span>
            </h2>
            <p className="text-[#6f7a6b] max-w-2xl mx-auto">
              Passionate individuals dedicated to helping you achieve your health goals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <TeamMember key={member.name} {...member} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-20 bg-[#006e1c]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">
              Join our growing team
            </h2>
            <p className="text-white/80 mb-8">
              We are always looking for talented individuals who share our passion for health and technology.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#006e1c] font-bold rounded-xl hover:bg-[#f5fbef] transition-colors"
            >
              View Open Positions
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
