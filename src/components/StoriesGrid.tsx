'use client'

import { motion } from 'framer-motion'
import { Heart, Eye, Share2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const stories = [
  {
    id: 1,
    title: "Animated Dashboard",
    author: "Sarah Chen",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
    likes: 892,
    views: "12.5k",
    category: "UI/UX"
  },
  {
    id: 2,
    title: "Interactive Portfolio",
    author: "Mike Johnson",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
    likes: 1205,
    views: "18.2k",
    category: "Web Design"
  },
  {
    id: 3,
    title: "Mobile App Prototype",
    author: "Lisa Wang",
    image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg",
    likes: 756,
    views: "9.8k",
    category: "Mobile"
  },
  {
    id: 4,
    title: "3D Product Showcase",
    author: "David Kim",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
    likes: 1456,
    views: "22.1k",
    category: "3D Design"
  },
  {
    id: 5,
    title: "Brand Animation",
    author: "Emma Davis",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
    likes: 634,
    views: "7.3k",
    category: "Animation"
  },
  {
    id: 6,
    title: "E-commerce Experience",
    author: "Alex Rodriguez",
    image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg",
    likes: 1089,
    views: "15.7k",
    category: "E-commerce"
  }
]

export default function StoriesGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            Latest <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore the most recent interactive design stories from our community
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="story-card group"
            >
              <Link href={`/story/${story.id}`}>
                <div className="aspect-[4/3] relative overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="story-overlay" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium">
                      {story.category}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="absolute top-4 right-4 z-10 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.preventDefault()
                        // Handle like action
                      }}
                      className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      <Heart size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => {
                        e.preventDefault()
                        // Handle share action
                      }}
                      className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                    >
                      <Share2 size={16} />
                    </motion.button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark mb-2 group-hover:text-primary transition-colors">
                    {story.title}
                  </h3>
                  <p className="text-gray-600 mb-4">by {story.author}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Heart size={16} />
                        <span>{story.likes}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={16} />
                        <span>{story.views}</span>
                      </div>
                    </div>
                    <span className="text-primary font-medium hover:underline">
                      View Story
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors shadow-lg"
          >
            Load More Stories
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}