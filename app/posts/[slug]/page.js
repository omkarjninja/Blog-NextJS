'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function PostPage({ params }) {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const q = query(
          collection(db, 'posts'),
          where('slug', '==', params.slug)
        );
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const postData = querySnapshot.docs[0].data();
          setPost({
            ...postData,
            createdAt: postData.createdAt?.toDate().toLocaleDateString() || 'Unknown date'
          });
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [params.slug]);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  if (!post) {
    return (
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Post Not Found</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">The post you're looking for doesn't exist.</p>
        <Link href="/posts" className="text-blue-500 hover:underline">
          ← Back to Posts
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Link href="/posts" className="text-blue-500 hover:underline mb-6 block">
        ← Back to Posts
      </Link>
      <article className="prose lg:prose-xl dark:prose-invert">
        <h1 className='text-3xl mb-6'>{post.title}</h1>
        <div>
        {post.content}
        </div>
        <div  className="text-gray-500 dark:text-gray-400 mt-6">{post.createdAt}</div>
      </article>
    </div>
  );
}