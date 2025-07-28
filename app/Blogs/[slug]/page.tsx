import { notFound } from 'next/navigation'
import StoryClient from './StoryClient'

export async function generateStaticParams() {
  const res = await fetch('https://marqnetworks.co/wp-json/wp/v2/posts?_embed')
  const posts = await res.json()

  return posts.map((post: any) => ({
    slug: post.slug
  }))
}

interface StoryPageProps {
  params: {
    slug: string
  }
}

export default async function StoryPage({ params }: StoryPageProps) {
  const res = await fetch(`https://marqnetworks.co/wp-json/wp/v2/posts?slug=${params.slug}&_embed`)
  const data = await res.json()

  if (!res.ok || !data.length) {
    notFound()
  }

  const post = data[0]

  const story = {
    id: post.id,
    title: post.title.rendered,
    author: post._embedded?.author?.[0]?.name || 'Admin',
    authorAvatar: post._embedded?.author?.[0]?.name?.slice(0, 2).toUpperCase() || 'AD',
    image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/bir.png',
    likes: Math.floor(Math.random() * 500),
    views: Math.floor(Math.random() * 10000) + ' views',
    category: post.categories?.[0] || 'General',
    description: post.excerpt.rendered,
    fullDescription: post.content.rendered,
    tags: [],
    createdAt: post.date.split('T')[0],
    duration: '1 week',
    tools: []
  }

  const allRes = await fetch('https://marqnetworks.co/wp-json/wp/v2/posts?_embed')
  const allPosts = await allRes.json()

  const allStories = allPosts.map((p: any) => ({
    slug: p.slug,
    title: p.title.rendered,
    image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/bir.png'
  }))

  return <StoryClient story={story} allStories={allStories} />
}
