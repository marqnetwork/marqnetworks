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


      {/* Hero Section */}
      <section className="pt-24 pb-12 h-[screen]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ]">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12 h-screen flex justify-center items-center flex-col gap-5"
          >
            <div className="inline-block px-4 py-2 bg-primary/10 text-white rounded-full text-lg font-medium mb-4">
              {story.category}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 w-[650px]">{story.title}</h1>
            <p className="text-2xl font-extrabold   mx-auto mb-8 text-center w-[550px] text-[#aaa]">{story.description}</p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-white font-bold">{story.authorAvatar}</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-dark">{story.author} </p>
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

        </div>
      </section>
      <section>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative  mx-auto bg-amber-300">
          <div className=" overflow-hidden shadow-2xl group cursor-pointer m-auto p-4">
            <div className="relative aspect-video  rounded-xl overflow-hidden w-[90%]">
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
      {/* Description and Sidebar */}
      <section className="Description w-[950px] ">

        <div className=" gap-4 justify-between flex flex-row" >
          <div className="  w-[70%]">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }}>
              <br />
              <h1 className="text-2xl font-bold text-dark mb-6">Seeking a faster, simpler way to manage their website, Loops moved from Webflow to Framer. Their key goals were to easily make updates, seamlessly integrate with their existing tools, and speed up their overall workflow.</h1>
              <br />
              <h2 className="text-2xl font-bold text-dark mb-6">Effortless design, smoother updates</h2>
              <br />
              <div className=" text-white leading-relaxed">
                {story.fullDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-6">{paragraph}</p>
                ))}
              </div>
            </motion.div>
          </div>
          <div className=" description w-[30%]  result">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="sticky top-20 space-y-8"
            >
              {/* Info Card */}
              <div className="bg-[#111] text-white rounded-2xl p-6 shadow-md space-y-4 badge">
                {/* Header */}
                <div className="flex items-center gap-4">
                  <div className=" rounded-md py-2">
                    <Image
                      src="/images/calcom-logo.svg"
                      alt="Cal.com"
                      width={36}
                      height={36}
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold">Cal.com</h3>
                    <p className="text-sm text-gray-400">cal.com</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-300 leading-relaxed">
                  Cal.com is a fully customizable scheduling platform used by individuals, teams, and developers. It helps users book meetings, manage availability, and integrate with popular apps. All while staying on-brand and privacy-first.
                </p>

                {/* Badges */}
                <div className="flex flex-wrap gap-2 text-xs font-medium text-white ">
                  <span className="px-3 py-1 rounded-full border border-white/10 bg-black/10 flex items-center gap-1">
                    <span>10–50</span>
                  </span>
                  <span className="px-3 py-1 rounded-full border border-white/10 bg-black/10 flex items-center gap-1">
                    <span>2021</span>
                  </span>
                  <span className="px-3 py-1 rounded-full border border-white/10 bg-black/10 flex items-center gap-1">
                    <span>Series A</span>
                  </span>
                  <span className="px-3 py-1 rounded-full border border-white/10 bg-black/10 flex items-center gap-1">
                    <span>$32.5M</span>
                  </span>
                </div>
              </div>

              {/* Results Card */}
              <div className="bg-[#111] text-white rounded-2xl p-6 shadow-md mt-4 result">
                <h4 className="font-semibold text-sm mb-3">Results</h4>
                <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                  <li>Site updates happen instantly</li>
                  <li>Everyone can build, not just designers</li>
                  <li>No more handoffs to engineering</li>
                </ul>
              </div>
            </motion.div>
          </div>

        </div>

      </section>

      {/* Related Stories */}
      <section className="Related_Stories">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-8 text-left head">More <span className="gradient-text">Stories</span></h2>

          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allStories.slice(2).map((story) => (
              <div
                key={story.id}
                className="cards flex flex-col rounded-xl overflow-hidden border border-neutral-800 shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between border-b border-neutral-800 bg-[#1a1a1a] card_inner">


                </div>
                <div className="relative w-full h-[300px] group overflow-hidden">
                  {/* Image */}
                  <Image
                    src={story.image}
                    alt="Story preview"
                    fill
                    className="object-cover  duration-300 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              
              </div>
            ))}
          </div>
  <div className="flex items-center justify-start gap-4 new">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{story.authorAvatar}</span>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-dark">{story.author} </p>
                    <p className="text-sm ">{story.createdAt} • {story.duration}</p>
                  </div>
                </div>

        </div>
      </section>
    </div>
  )
}
