'use client'

import Link from 'next/link'
import Image from 'next/image'
import './style.css'

const stories = [
  {
    id: 1,
    logo: '/images/bird.svg',
    image: '/images/bir.png',
  },
  {
    id: 2,
    logo: '/images/bird.svg',
    image: '/images/bir.png',
  },
  {
    id: 3,
    logo: '/images/bird.svg',
    image: '/images/bir.png',
  },
  {
    id: 4,
    logo: '/images/bird.svg',
    image: '/images/bir.png',
  },
  {
    id: 5,
    logo: '/images/bird.svg',
    image: '/images/bir.png',
  },
  {
    id: 6,
    logo: '/images/bird.svg',
    image: '/images/bir.png',
  },
]

export default function StoryListPage() {
  return (
    <main className="bg-black text-white min-h-screen px-6 py-16">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto mb-20">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          The web platform <br /> for design teams
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          From startups to enterprises, teams use Framer to ship standout websites—no developers needed.
        </p>
        <div className="flex justify-center gap-4">
          <button className="bg-white text-black font-medium px-5 py-2 rounded-full hover:opacity-90 transition">
            Contact sales
          </button>
          <button className="bg-[#1a1a1a] text-white font-medium px-5 py-2 rounded-full hover:opacity-90 transition border border-white/10">
            Explore Enterprise
          </button>
        </div>
      </section>

      {/* Cards Grid */}
      <section className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-[#111] rounded-xl overflow-hidden border border-neutral-800 shadow-md hover:shadow-lg transition"
          >
            {/* Top bar with logo + read story */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-[#1a1a1a]">
              <div className="flex items-center gap-2">
                <Image
                  src={story.logo}
                  alt="Logo"
                  width={20}
                  height={20}
                  className="object-contain"
                />
              </div>
              <Link
                href={`/story/${story.id}`}
                className="text-gray-400 hover:text-white transition text-xs font-medium"
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
