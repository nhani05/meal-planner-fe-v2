import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import LandingNavbar from './LandingNavbar';
import LandingFooter from './LandingFooter';

export default function LandingLayout() {
  return (
    <div className="min-h-screen bg-[#f5fbef] flex flex-col">
      <LandingNavbar />
      <main className="flex-1 pt-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </main>
      <LandingFooter />
    </div>
  );
}
