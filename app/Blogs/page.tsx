'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import './style.css'

const filterOptions = ['All'] // For now, filter is disabled unless you use WP categories

export default function StoryListPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('https://marqnetworks.co/wp-json/wp/v2/posts?_embed')
      const data = await res.json()

      const postsWithImages = data.map((post: any) => {
        const featuredImage =
          post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/bir.png'

        return {
          id: post.id,
          slug: post.slug, // ✅ ADDED SLUG
          title: post.title.rendered,
          excerpt: post.excerpt.rendered,
          featuredImage,
        }
      })

      setPosts(postsWithImages)
    }

    fetchPosts()
  }, [])

  return (
    <main className="bg-black text-white min-h-screen flex flex-col items-center px-4 py-16">
      {/* Hero Section */}
      <section className="w-full max-w-[1200px] text-center mb-20 h-[80vh] flex flex-col justify-center items-center gap-3">
        <h1 className="text-6xl md:text-5xl font-bold leading-tight mb-4 fontt  widthh">
          Real-World Growth Insights <br /> Powered by AI 
        </h1>
        <p className="text-lg text-gray-400 mb-8 w-full max-w-[100%] sm:max-w-[500px] md:max-w-[1000px] text-center md:text-2xl mbb ">
          Get strategic advice on AI automation, funnel marketing, conversion-focused branding, and scalable software development from experts who've actually delivered growth.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-white text-black font-medium rounded-full hover:opacity-90 transition buttons">
            Explore AI Growth Insights 
          </button>
          <button className="bg-[#1a1a1a] text-white font-medium rounded-full hover:opacity-90 transition border border-white/10 buttons">
            Talk to an Expert
          </button>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="w-full max-w-[1200px]  marginn">
        <div className="flex justify-center gap-4 flex-wrap">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setActiveFilter(option)}
              className={`px-3 py-2 rounded-full text-sm font-medium transition filter_css ${
                activeFilter === option
                  ? 'bg-white text-black'
                  : 'bg-[#1a1a1a] text-white border border-white/10'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {/* Cards Grid */}
      <section className="w-full max-w-[1200px] mx-auto space-y-10 padding">
        {/* First Row - 2 Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {posts.slice(0, 2).map((post) => (
            <Link href={`/story/${post.slug}`} key={post.id}>
              <div className="cards flex flex-col rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
                <div className="flex items-center justify-between border-b border-neutral-800 bg-[#1a1a1a] card_inner">
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/bird.svg"
                      alt="Logo"
                      width={70}
                      height={70}
                      className="object-contain"
                    />
                  </div>
                  <span className="text-gray-300 hover:text-white transition text-base font-medium">
                    Read story →
                  </span>
                </div>
                <div className="relative w-full h-[400px] bg-black">
                  <Image
                    src={post.featuredImage}
                    alt="Story preview"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Remaining Rows - 3 Items Per Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 second">
          {posts.slice(2).map((post) => (
            <div
              key={post.id}
              className="cards flex flex-col rounded-xl overflow-hidden border border-neutral-800 shadow-md hover:shadow-lg transition right"
            >
              <div className="flex items-center justify-between border-b border-neutral-800 bg-[#1a1a1a] card_inner">
                <div className="flex items-center gap-2">
                  <Image
                    src="/images/logo.svg"
                    alt="Logo"
                    width={70}
                    height={70}
                    className="object-contain"
                  />
                </div>
                <Link
                  href={`/story/${post.slug}`} // ✅ UPDATED
                  className="text-gray-300 hover:text-white transition text-base font-medium"
                >
                  Read story →
                </Link>
              </div>

              <div className="relative w-full h-[300px] bg-black">
                <Image
                  src={post.featuredImage}
                  alt="Story preview"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}