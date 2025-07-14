import { notFound } from 'next/navigation'
import StoryClient from './StoryClient'


const stories = [
  {
    id: 1,
    title: "How Miro builds fast without losing design control with Framer",
    author: "Sarah Chen",
    authorAvatar: "SC",
    image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
    likes: 892,
    views: "12.5k",
    category: "Stories/Miro",
    description: "“Framer allowed us to ship high-performing, beautifully designed pages at record speed, all while keeping design control in-house.”",
    fullDescription: "This animated dashboard represents the pinnacle...",
    tags: ["Dashboard", "Animation", "Data Visualization", "React", "Framer Motion"],
    createdAt: "2024-01-15",
    duration: "3 weeks",
    tools: ["Figma", "React", "Framer Motion", "D3.js", "TypeScript"]
  },
  {
    id: 2,
    title: "Interactive Portfolio",
    author: "Mike Johnson",
    authorAvatar: "MJ",
    image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
    likes: 1205,
    views: "18.2k",
    category: "Web Design",
    description: "An innovative portfolio website...",
    fullDescription: "This interactive portfolio pushes the boundaries...",
    tags: ["Portfolio", "3D", "WebGL", "GSAP", "Interactive"],
    createdAt: "2024-01-10",
    duration: "4 weeks",
    tools: ["Three.js", "GSAP", "Next.js", "Blender", "WebGL"]
  },
  {
    id: 3,
    title: "Mobile App Prototype",
    author: "Lisa Wang",
    authorAvatar: "LW",
    image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg",
    likes: 756,
    views: "9.8k",
    category: "Mobile",
    description: "A comprehensive mobile app prototype...",
    fullDescription: "This mobile app prototype demonstrates the future...",
    tags: ["Mobile", "Prototype", "Gestures", "React Native", "UX"],
    createdAt: "2024-01-08",
    duration: "2 weeks",
    tools: ["React Native", "Figma", "Principle", "Lottie", "Expo"]
  }
  // ✅ Add more stories if needed
]

// ✅ Generate static paths for SSG
export async function generateStaticParams() {
  return stories.map(story => ({
    id: story.id.toString()
  }))
}

interface StoryPageProps {
  params: {
    id: string
  }
}

export default async function StoryPage({ params }: StoryPageProps) {
  const storyId = parseInt(params.id)
  const story = stories.find(s => s.id === storyId)

  if (!story) {
    notFound()
  }

  return <StoryClient story={story} allStories={stories} />
}
