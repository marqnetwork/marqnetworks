// app/lib/fetchPost.ts

export async function fetchPost(slug: string) {
  const res = await fetch(`http://localhost/wordpress/wp-json/wp/v2/posts?slug=${slug}&_embed`);
  const post = await res.json();
  return post[0];
}

export async function fetchPosts() {
  const res = await fetch('http://localhost/wordpress/wp-json/wp/v2/posts?_embed');
  return res.json();
}
