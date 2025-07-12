'use client'

import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Eye, Share2, Play } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import "./style.css"
interface Story {
  id: number
  title: string
  author: string
  authorAvatar: string
  image: string
  likes: number
  views: string
  category: string
  description: string
  fullDescription: string
  tags: string[]
  createdAt: string
  duration: string
  tools: string[]
}

interface Props {
  story: Story
  allStories: Story[]
}

export default function StoryClient({ story, allStories }: Props) {
  return (
    <div className="min-h-screen bg-black sss w-[1200px]" >
      
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className=" z-50 glass-effect"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 text-white hover:text-white transition-colors"
              >
                <ArrowLeft size={20} />
                <span className="font-medium">Back to Stories</span>
              </motion.button>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <span className="text-xl font-bold gradient-text">Framer Stories</span>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="pt-24 pb-12 h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 h-screen flex justify-center items-center flex-col gap-5"
          >
            <div className="inline-block px-4 py-2 bg-primary/10 text-white rounded-full text-sm font-medium mb-4">
              {story.category}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{story.title}</h1>
            <p className="text-xl   mx-auto mb-8 text-center">{story.description}</p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{story.authorAvatar}</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-dark">{story.author}</p>
                <p className="text-sm ">{story.createdAt} • {story.duration}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-8 ">
              <div className="flex items-center gap-2"><Heart size={20} /><span>{story.likes}</span></div>
              <div className="flex items-center gap-2"><Eye size={20} /><span>{story.views}</span></div>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 text-white hover:text-white/80 transition-colors">
                <Share2 size={20} />
                <span>Share</span>
              </motion.button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative max-w-5xl mx-auto mb-16">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl group cursor-pointer">
              <div className="aspect-video relative">
                <Image src={story.image} alt={story.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300">
                    <Play size={32} className="ml-1" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Description and Sidebar */}
      <section className="py-16 ">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
                <h2 className="text-2xl font-bold text-dark mb-6">About This Story</h2>
                <div className="prose prose-lg text-white leading-relaxed">
                  {story.fullDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-6">{paragraph}</p>
                  ))}
                </div>
              </motion.div>
            </div>
            <div className="lg:col-span-1">
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className=" rounded-2xl p-6 shadow-lg">
                <h3 className="text-lg font-bold text-dark mb-4">Project Details</h3>
                <div className="space-y-4">
                  <div><p className="text-sm font-medium  mb-1">Duration</p><p className="text-dark">{story.duration}</p></div>
                  <div><p className="text-sm font-medium  mb-1">Category</p><p className="text-dark">{story.category}</p></div>
                  <div>
                    <p className="text-sm font-medium mb-2">Tools Used</p>
                    <div className="flex flex-wrap gap-2">{story.tools.map((tool, i) => (
                      <span key={i} className="px-3 py-1 bg-black-100 text-white rounded-full text-sm">{tool}</span>
                    ))}</div>
                  </div>
                  <div>
                    <p className="text-sm font-medium  mb-2">Tags</p>
                    <div className="flex flex-wrap gap-2">{story.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-primary/10 text-white rounded-full text-sm">{tag}</span>
                    ))}</div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full bg-primary text-white py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
                    View Live Demo
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Stories */}
      <section className="py-16 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-4">More <span className="gradient-text">Stories</span></h2>
            <p className="">Discover other amazing interactive design stories</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allStories.filter(s => s.id !== story.id).slice(0, 3).map((relatedStory, index) => (
              <motion.div key={relatedStory.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 1 + index * 0.1 }} whileHover={{ y: -10 }} className="story-card group">
                <Link href={`/story/${relatedStory.id}`}>
                  <div className="aspect-[4/3] relative overflow-hidden">
                    <Image src={relatedStory.image} alt={relatedStory.title} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-medium">{relatedStory.category}</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-dark mb-2 group-hover:text-primary transition-colors">{relatedStory.title}</h3>
                    <p className="bg-black mb-4">by {relatedStory.author}</p>
                    <div className="flex items-center justify-between text-sm bg-black">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1"><Heart size={16} /><span>{relatedStory.likes}</span></div>
                        <div className="flex items-center gap-1"><Eye size={16} /><span>{relatedStory.views}</span></div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
