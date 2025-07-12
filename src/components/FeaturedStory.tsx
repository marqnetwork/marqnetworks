'use client'

import { motion } from 'framer-motion'
import { Play, Heart, Share2 } from 'lucide-react'
import Image from 'next/image'

export default function FeaturedStory() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Featured <span className="gradient-text">Story</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            This week's most impressive interactive design story
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
            <div className="aspect-video relative">
              <Image
                src="https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg"
                alt="Featured Story"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Play Button */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                >
                  <Play size={32} className="ml-1" />
                </motion.button>
              </motion.div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">JD</span>
                </div>
                <div>
                  <p className="font-semibold">John Designer</p>
                  <p className="text-sm text-white/80">Creative Director</p>
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold mb-2">
                Immersive 3D Product Experience
              </h3>
              <p className="text-white/90 mb-4 max-w-2xl">
                An interactive 3D product showcase with smooth animations and engaging micro-interactions 
                that transforms the way users explore products online.
              </p>
              
              <div className="flex items-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <Heart size={20} />
                  <span>1.2k</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <Share2 size={20} />
                  <span>Share</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}