'use client'

import { motion } from 'framer-motion'
import { Heart, Eye, Share2 } from 'lucide-react'
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
  allStories: { id: number; title: string; image: string }[]
}

export default function StoryClient({ story, allStories }: Props) {
  return (
    <div className="min-h-screen bg-black sss w-[1200px]">

      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 flex justify-center items-center flex-col gap-5"
        >
          <div className="inline-block px-4 py-2 bg-primary/10 text-white rounded-full text-lg font-medium mb-4">
            {story.category}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 w-[650px]">{story.title}</h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-bold">{story.authorAvatar}</span>
            </div>
            <div className="text-left">
              <p className="font-semibold text-dark">{story.author}</p>
              <p className="text-sm">{story.createdAt} • {story.duration}</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-2"><Heart size={20} /><span>{story.likes}</span></div>
            <div className="flex items-center gap-2"><Eye size={20} /><span>{story.views}</span></div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="flex items-center gap-2 text-white hover:text-white/80 transition-colors">
              <Share2 size={20} />
              <span>Share</span>
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Story Image */}
      <section>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative mx-auto">
          <div className="overflow-hidden shadow-2xl group cursor-pointer m-auto p-4  marginbt">
            <div className="relative aspect-video rounded-xl overflow-hidden w-[90%]">
              <Image
                src={story.image}
                alt={story.title}
                fill
                className="object-contain w-[90%]"
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* Description */}
      <section className="Description w-[950px]">
        <div className="flex flex-col sm:flex-col md:flex-row justify-between gap-4">

          <div className="w-[70%]">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
              <div className="text-white leading-relaxed">
                <div dangerouslySetInnerHTML={{ __html: story.fullDescription }} />
              </div>
            </motion.div>
          </div>

          {/* Sidebar (optional, kept as-is) */}
          <div className="w-[30%] result">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="sticky top-20 space-y-8"
            >
              <div className="bg-[#111] text-white rounded-2xl p-6 shadow-md space-y-4 badge">
                <h3 className="text-base font-semibold">Quick Info</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  Blog post fetched from WordPress via REST API.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Stories */}
      <section className="Related_Stories mt-20">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="text-center mb-12">
          <h2 className="text-3xl font-bold text-dark mb-8 text-left head">More <span className="gradient-text">Stories</span></h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {allStories.filter(s => s.id !== story.id).map((s) => (
            <Link href={`/story/${s.id}`} key={s.id}>
              <div className="cards flex flex-col rounded-xl overflow-hidden border border-neutral-800 shadow-md hover:shadow-lg transition">
                <div className="relative w-full h-[300px] group overflow-hidden">
                  <Image
                    src={s.image}
                    alt={s.title}
                    fill
                    className="object-cover duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold">{s.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
