export async function generateStaticParams() {
  const res = await fetch('http://localhost/wordpress/wp-json/wp/v2/posts');
  const posts = await res.json();

  return posts.map((post: any) => ({
    slug: post.slug,
  }));
}

export async function fetchPost(slug: string) {
  const res = await fetch(`http://localhost/wordpress/wp-json/wp/v2/posts?slug=${slug}&_embed`);
  const post = await res.json();
  return post[0];
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await fetchPost(params.slug);

  return (
    <article style={{ padding: '2rem', color: 'white', backgroundColor: 'black' }}>
      <h1
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        style={{ color: 'white' }}
      />
      <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
    </article>
  );
}
