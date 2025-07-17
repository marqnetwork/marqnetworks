import { notFound } from 'next/navigation'
import StoryClient from './StoryClient'

export async function generateStaticParams() {
  const res = await fetch('https://marqnetworks.co/wp-json/wp/v2/posts?_embed')
  const posts = await res.json()

  return posts.map((post: any) => ({
    id: post.id.toString()
  }))
}

interface StoryPageProps {
  params: {
    id: string
  }
}

export default async function StoryPage({ params }: StoryPageProps) {
  const res = await fetch(`https://marqnetworks.co/wp-json/wp/v2/posts/${params.id}?_embed`)

  if (!res.ok) {
    notFound()
  }

  const post = await res.json()

  const story = {
    id: post.id,
    title: post.title.rendered,
    author: post._embedded?.author?.[0]?.name || 'Admin',
    authorAvatar: post._embedded?.author?.[0]?.name?.slice(0, 2).toUpperCase() || 'AD',
    image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/bir.png',
    likes: Math.floor(Math.random() * 500), // Since WP doesn't return likes
    views: Math.floor(Math.random() * 10000) + ' views', // Fake views
    category: post.categories?.[0] || 'General',
    description: post.excerpt.rendered,
    fullDescription: post.content.rendered,
    tags: [], // Optional: Fetch WP tags if needed
    createdAt: post.date.split('T')[0],
    duration: '1 week', // Placeholder, WP doesn’t provide this
    tools: []
  }

  const allRes = await fetch('https://marqnetworks.co/wp-json/wp/v2/posts?_embed')
  const allPosts = await allRes.json()

  const allStories = allPosts.map((p: any) => ({
    id: p.id,
    title: p.title.rendered,
    image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/bir.png'
  }))

  return <StoryClient story={story} allStories={allStories} />
}
