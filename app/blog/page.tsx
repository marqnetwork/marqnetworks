import { fetchPosts } from "../lib/fetchPost";

export default async function Blog() {
  const posts = await fetchPosts();

  return (
    <main style={{ padding: '2rem', color: 'white', backgroundColor: 'black' }}>
      <h1 style={{ color: '#39ff14', fontSize: '3rem' }}>Latest Blog Posts</h1>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {posts.map((post: any) => (
          <li key={post.id} style={{ marginBottom: '2rem' }}>
            <a
              href={`/blog/${post.slug}`}
              style={{ color: 'white', textDecoration: 'underline' }}
            >
              <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
            </a>
            <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </li>
        ))}
      </ul>
    </main>
  );
}
