'use client'

import { motion } from 'framer-motion'
import { Heart, Eye, Share2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import "./style.css"

interface Blog {
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
  blog: Blog
  allBlogs: { slug: string; title: string; image: string }[]
}

export default function BlogClient({ blog, allBlogs }: Props) {
  return (
    <div className="min-h-screen bg-black sss w-full max-w-[1200px] mx-auto px-4">
      {/* Hero Section */}
      <section className="pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 flex justify-center items-center flex-col gap-5"
        >
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl font-bold text-white mb-6 w-full max-w-[700px] mt2">
            {blog.title}
          </h1>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-white font-bold">{blog.authorAvatar}</span>
            </div>
            <div className="text-left">
              <p className="font-semibold text-dark ">{blog.author}</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto"
        >
          <div className="overflow-hidden shadow-2xl group cursor-pointer m-auto p-4 marginbt mt">
            <div className="relative aspect-video rounded-xl overflow-hidden w-full max-w-[1200px] mx-auto">
              <Image src={blog.image} alt={blog.title} fill className="object-cover" />
            </div>
          </div>
        </motion.div>
      </section>

      <section className="Description w-full max-w-[950px] mx-auto px-4">
        <div className="flex flex-col sm:flex-col md:flex-row justify-between gap-4">
          <div className="w-full md:w-[60%]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="text-white leading-relaxed">
                <div className="custom-html" dangerouslySetInnerHTML={{ __html: blog.fullDescription }} />
              </div>
            </motion.div>
          </div>
          <div className="w-full md:w-[30%] result mt-8 md:mt-0 order-1 sidebar">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="sticky top-20 space-y-8"
            >
              <div className="bg-[#111] text-white rounded-2xl p-6 shadow-md space-y-4 badge">
                <h3 className="text-base font-semibold">Quick Info</h3>
                <p className="text-sm text-gray-300 leading-relaxed">Blog post fetched from WordPress via REST API.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="Related_Stories mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-dark mb-8 text-left head">
            More <span className="gradient-text">Blogs</span>
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {allBlogs
            .filter((b) => b.slug !== blog.title.toLowerCase().replace(/\s+/g, '-'))
            .map((b) => (
              <Link href={`/blog/${b.slug}`} key={b.slug}>
                <div className="cards flex flex-col rounded-xl overflow-hidden border border-neutral-800 shadow-md hover:shadow-lg transition">
                  <div className="relative w-full h-[300px] group overflow-hidden">
                    <Image src={b.image} alt={b.title} fill className="object-cover duration-300 group-hover:scale-105" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{b.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </section>
    </div>
  )
}
