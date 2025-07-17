'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import './style.css'

const stories = [
  { id: 1, logo: '/images/bird.svg', image: '/images/bir.png', category: 'UI/UX' },
  { id: 2, logo: '/images/bird.svg', image: '/images/bir.png', category: 'Dev' },
  { id: 3, logo: '/images/bird.svg', image: '/images/bir.png', category: 'Strategy' },
  { id: 4, logo: '/images/bird.svg', image: '/images/bir.png', category: 'UI/UX' },
  { id: 5, logo: '/images/bird.svg', image: '/images/bir.png', category: 'Dev' },
  { id: 6, logo: '/images/bird.svg', image: '/images/bir.png', category: 'Strategy' },
]

const filterOptions = ['All', 'UI/UX', 'Dev', 'Strategy']

export default function StoryListPage() {
  const [activeFilter, setActiveFilter] = useState('All')

  const filteredStories =
    activeFilter === 'All'
      ? stories
      : stories.filter((story) => story.category === activeFilter)

  return (
    <main className="bg-black text-white min-h-screen flex flex-col items-center px-4 py-16">
      {/* Hero Section */}
      <section className="w-full max-w-[1200px] text-center mb-20 h-[80vh] flex flex-col justify-center items-center gap-3">
        <h1 className="text-4xl md:text-7xl font-bold leading-tight mb-6">
          The web platform <br /> for design teams
        </h1>
        <p className="text-lg text-gray-400 mb-8 w-[650px] md:text-3xl">
          From startups to enterprises, teams use Framer to ship standout websites—no developers needed.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-white text-black font-medium rounded-full hover:opacity-90 transition buttons">
            Contact sales
          </button>
          <button className="bg-[#1a1a1a] text-white font-medium rounded-full hover:opacity-90 transition border border-white/10 buttons">
            Explore Enterprise
          </button>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="w-full max-w-[1200px] mb-8">
        <div className="flex justify-center gap-4 flex-wrap">
          {filterOptions.map((option) => (
            <button
              key={option}
              onClick={() => setActiveFilter(option)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition filter_css ${
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
      <section className="w-full max-w-[1200px] mx-auto space-y-10">
        {/* First Row - 2 Items */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {filteredStories.slice(0, 2).map((story) => (
            <Link href={`/story/${story.id}`} key={story.id}>
              <div className="cards flex flex-col rounded-xl overflow-hidden shadow-md hover:shadow-lg transition">
                <div className="flex items-center justify-between border-b border-neutral-800 bg-[#1a1a1a] card_inner">
                  <div className="flex items-center gap-2">
                    <Image
                      src={story.logo}
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
                    src={story.image}
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
          {filteredStories.slice(2).map((story) => (
            
            <div
              key={story.id}
              className="cards flex flex-col rounded-xl overflow-hidden border border-neutral-800 shadow-md hover:shadow-lg transition right"
            >
              <div className="flex items-center justify-between border-b border-neutral-800 bg-[#1a1a1a] card_inner">
                <div className="flex items-center gap-2">
                  <Image
                    src={story.logo}
                    alt="Logo"
                    width={70}
                    height={70}
                    className="object-contain"
                  />
                </div>
                <Link
                  href={`/story/${story.id}`}
                  className="text-gray-300 hover:text-white transition text-base font-medium"
                >
                  Read story →
                </Link>
              </div>

              <div className="relative w-full h-[300px] bg-black">
                <Image
                  src={story.image}
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
