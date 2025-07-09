import BlogPost from '@/components/Slug/Slug';
import React from 'react';

const SlugPage = ({ params }: { params: { slug: string } }) => {
  return (
    <div>
      <BlogPost params={{ slug: params.slug }} />
    </div>
  );
};

export default SlugPage;
