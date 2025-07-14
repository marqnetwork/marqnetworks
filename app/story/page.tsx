import Link from 'next/link'
import Image from 'next/image'
import "./style.css"
import { motion } from 'framer-motion'

const stories = [
  {
    id: 1,
    title: "Animated Dashboard",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
    author: "Sarah Chen",
    category: "UI/UX",
  },
  {
    id: 2,
    title: "Interactive Portfolio",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
    author: "Mike Johnson",
    category: "Web Design",
  },
  {
    id: 3,
    title: "Mobile App Prototype",
    image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg",
    author: "Lisa Wang",
    category: "Mobile",
  },
  {
    id: 4,
    title: "3D Product Showcase",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
    author: "David Kim",
    category: "3D Design",
  },
  {
    id: 5,
    title: "Brand Animation",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
    author: "Emma Davis",
    category: "Animation",
  },
  {
    id: 6,
    title: "E-commerce Experience",
    image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg",
    author: "Alex Rodriguez",
    category: "E-commerce",
  }
]
const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};
export default function StoryListPage() {
  return (
    <main className="bg-black text-white min-h-screen py-20 px-6">
        <div className='text-center h-[50vh] flex-col flex justify-center items-center'>
          <h2 className="text-4xl md:text-5xl font-bold text-dark mb-4">
            The web platform <span className="gradient-text">for design teams</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
           From startups to enterprises, teams use Framer to ship standout websites—no developers needed.
          </p>
        </div>
      <div className="w-[1200px] mx-auto new">
        <h1 className="text-3xl font-bold text-center mb-[40px] ">
          Featured Stories
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 newww">
          {stories.map((story) => (
            <Link
              key={story.id}
              href={`/story/${story.id}`}
              className="group relative block rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 hover:shadow-xl transition"
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full">
                  {story.category}
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-white transition-colors">
                  {story.title}
                </h2>
                <p className="text-sm text-neutral-400">by {story.author}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
