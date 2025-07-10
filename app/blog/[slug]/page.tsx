// // app/blog/[slug]/page.tsx
// import { fetchPost } from '../../lib/fetchPost';

// export async function generateStaticParams() {
//   const res = await fetch('https://wordpress.org/news/wp-json/wp/v2/posts');
//   const posts = await res.json();

//   return posts.map((post: any) => ({
//     slug: post.slug,
//   }));
// }


// export default async function Page({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const post = await fetchPost(params.slug);

//   return (
//     <article style={{ padding: "2rem", color: "white", backgroundColor: "black" }}>
//       <h1
//         dangerouslySetInnerHTML={{ __html: post.title.rendered }}
//         style={{ color: "white" }}
//       />
//       <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
//     </article>
//   );
// }

import React from 'react'

const page = () => {
  return (
    <div>page</div>
  )
}

export default page
