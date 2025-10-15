import { notFound } from 'next/navigation'
import BlogClient from './BlogClient'

// Ensure this route handles slugs not pre-generated and fetches fresh data
export const dynamic = 'force-dynamic'
export const dynamicParams = true

export async function generateStaticParams() {
  const res = await fetch('https://marqnetworks.co/wp-json/wp/v2/posts?_embed', { cache: 'no-store' })
  const posts = await res.json()

  return posts.map((post: any) => ({
    slug: post.slug
  }))
}

interface BlogPageProps {
  params: {
    slug: string
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const res = await fetch(`https://marqnetworks.co/wp-json/wp/v2/posts?slug=${params.slug}&_embed`, { cache: 'no-store' })
  const data = await res.json()

  if (!res.ok || !data.length) {
    notFound()
  }

  const post = data[0]

  const blog = {
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

  const allRes = await fetch('https://marqnetworks.co/wp-json/wp/v2/posts?_embed', { cache: 'no-store' })
  const allPosts = await allRes.json()

  const allBlogs = allPosts.map((p: any) => ({
    slug: p.slug,
    title: p.title.rendered,
    image: p._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/images/bir.png'
  }))

  return <BlogClient blog={blog} allBlogs={allBlogs} />
}
