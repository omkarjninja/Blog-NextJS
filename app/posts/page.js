'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { db } from '../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const q = query(collection(db, 'posts'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        const fetchedPosts = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate().toLocaleDateString() || 'Unknown date'
        }));
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold dark:text-white">Blog Posts</h1>
      <div className="grid gap-6 md:grid-cols-2">
        {posts.map(post => (
          <Link 
            href={`/posts/${post.slug}`} 
            key={post.id}
            className="block transition-transform hover:scale-105"
          >
            <article className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-full">
              <h2 className="text-2xl font-bold mb-2 dark:text-white">{post.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {post.content.substring(0, 150)}...
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {post.createdAt}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}