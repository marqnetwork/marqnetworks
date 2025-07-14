'use client'

import Link from 'next/link'
import Image from 'next/image'
import './style.css'

const stories = [
  { id: 1, logo: '/images/bird.svg', image: '/images/bir.png' },
  { id: 2, logo: '/images/bird.svg', image: '/images/bir.png' },
  { id: 3, logo: '/images/bird.svg', image: '/images/bir.png' },
  { id: 4, logo: '/images/bird.svg', image: '/images/bir.png' },
  { id: 5, logo: '/images/bird.svg', image: '/images/bir.png' },
  { id: 6, logo: '/images/bird.svg', image: '/images/bir.png' },
]

export default function StoryListPage() {
  return (
    <main className="bg-black text-white min-h-screen flex flex-col items-center px-4 py-16">
      {/* Hero Section */}
      <section className="w-full max-w-[1200px] text-center mb-20">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          The web platform <br /> for design teams
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          From startups to enterprises, teams use Framer to ship standout websites—no developers needed.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-white text-black font-medium h-10 px-8 py-6 rounded-full hover:opacity-90 transition">
            Contact sales
          </button>
          <button className="bg-[#1a1a1a] text-white font-medium px-6 py-3 rounded-full hover:opacity-90 transition border border-white/10">
            Explore Enterprise
          </button>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="w-full max-w-[1200px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-[#111] flex flex-col rounded-xl overflow-hidden border border-neutral-800 shadow-md hover:shadow-lg transition"
          >
            {/* Top bar */}
            <div className="flex items-center justify-between h-[40px] px-8 py-8 border-b border-neutral-800 bg-[#1a1a1a]">
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

            {/* Image */}
            <div className="relative w-full h-[240px] bg-black">
              <Image
                src={story.image}
                alt="Story preview"
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </section>
    </main>
  )
}
