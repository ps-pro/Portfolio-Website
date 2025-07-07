"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  RxGithubLogo, 
  RxLinkedinLogo, 
  RxTwitterLogo 
} from "react-icons/rx";
import { 
  SiGooglescholar, 
  SiOrcid, 
  SiResearchgate,
  SiMedium,
  SiYoutube
} from "react-icons/si";
import { TbWorld } from "react-icons/tb";

// Professional links data
const professionalLinks = {
  research: [
    {
      name: "Google Scholar",
      icon: SiGooglescholar,
      url: "https://scholar.google.com/citations?user=YOUR_USER_ID",
      color: "hover:text-emerald-300"
    },
    {
      name: "ORCID",
      icon: SiOrcid,
      url: "https://orcid.org/0000-0000-0000-0000",
      color: "hover:text-green-300"
    },
    {
      name: "ResearchGate",
      icon: SiResearchgate,
      url: "https://www.researchgate.net/profile/YOUR_PROFILE",
      color: "hover:text-cyan-300"
    }
  ],
  professional: [
    {
      name: "LinkedIn",
      icon: RxLinkedinLogo,
      url: "https://linkedin.com/in/YOUR_USERNAME",
      color: "hover:text-blue-300"
    },
    {
      name: "GitHub",
      icon: RxGithubLogo,
      url: "https://github.com/YOUR_USERNAME",
      color: "hover:text-gray-100"
    },
    {
      name: "Portfolio",
      icon: TbWorld,
      url: "https://your-website.com",
      color: "hover:text-purple-300"
    }
  ],
  community: [
    {
      name: "Twitter",
      icon: RxTwitterLogo,
      url: "https://twitter.com/YOUR_USERNAME",
      color: "hover:text-blue-400"
    },
    {
      name: "Medium",
      icon: SiMedium,
      url: "https://medium.com/@YOUR_USERNAME",
      color: "hover:text-emerald-300"
    },
    {
      name: "YouTube",
      icon: SiYoutube,
      url: "https://youtube.com/@YOUR_CHANNEL",
      color: "hover:text-red-400"
    }
  ]
};

export const CosmicFooter = () => {
  return (
    <footer className="relative w-full bg-gradient-to-t from-[#030014] via-[#0a0a2e] to-transparent">
      {/* Cosmic Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Animated Stars */}
      <div className="absolute inset-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-6">
        {/* Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left Column: Research & Publications */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-3"
          >
            <h3 className="text-lg font-semibold text-white mb-3">Research & Publications</h3>
            <div className="space-y-1">
              {professionalLinks.research.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block py-1.5 px-2 rounded-md bg-transparent hover:bg-white/5 transition-all duration-300"
                  >
                    <motion.div
                      whileHover={{ scale: 1.03, y: -1 }}
                      className={`flex items-center justify-center gap-2 text-gray-300 ${link.color} transition-colors text-sm`}
                    >
                      <link.icon className="w-4 h-4" />
                      <span>{link.name}</span>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Center Column: Professional Network */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center space-y-3"
          >
            <h3 className="text-lg font-semibold text-white mb-3">Professional Network</h3>
            <div className="space-y-1">
              {professionalLinks.professional.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block py-1.5 px-2 rounded-md bg-transparent hover:bg-white/5 transition-all duration-300"
                  >
                    <motion.div
                      whileHover={{ scale: 1.03, y: -1 }}
                      className={`flex items-center justify-center gap-2 text-gray-300 ${link.color} transition-colors text-sm`}
                    >
                      <link.icon className="w-4 h-4" />
                      <span>{link.name}</span>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Community & Outreach */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center space-y-3"
          >
            <h3 className="text-lg font-semibold text-white mb-3">Community & Outreach</h3>
            <div className="space-y-1">
              {professionalLinks.community.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block py-1.5 px-2 rounded-md bg-transparent hover:bg-white/5 transition-all duration-300"
                  >
                    <motion.div
                      whileHover={{ scale: 1.03, y: -1 }}
                      className={`flex items-center justify-center gap-2 text-gray-300 ${link.color} transition-colors text-sm`}
                    >
                      <link.icon className="w-4 h-4" />
                      <span>{link.name}</span>
                    </motion.div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};