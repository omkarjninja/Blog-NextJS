"use client";
import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, Loader2 } from 'lucide-react';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { deleteDoc, doc } from 'firebase/firestore';
import { updateDoc } from 'firebase/firestore';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingPost, setEditingPost] = useState(null);
const [editTitle, setEditTitle] = useState('');
const [editContent, setEditContent] = useState('');

  // Simulated Firebase data structure
  const samplePosts = [
    {
      id: '1',
      title: 'Getting Started with React',
      excerpt: 'Learn the basics of React and its core concepts...',
      createdAt: '2024-03-15',
      status: 'published'
    },
    {
      id: '2',
      title: 'Firebase Integration Guide',
      excerpt: 'A comprehensive guide to integrating Firebase...',
      createdAt: '2024-03-14',
      status: 'draft'
    }
  ];

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

  const handleEdit = (post) => {
    setEditingPost(post);  // Make sure this is the full post object
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  function handleCancelEdit() {
    setEditingPost(null);
    setEditTitle('');
    setEditContent('');
  }
  async function handleUpdate() {
    console.log("editingPost:", editingPost);
    console.log("editTitle:", editTitle);
    console.log("editContent:", editContent);
  
    // Ensure editingPost is not null and contains the necessary ID
    if (editingPost && editTitle && editContent && editingPost.id) {
      try {
        // Reference to the post document in Firestore
        const postRef = doc(db, 'posts', editingPost.id);
        
        // Update the document with the new title and content
        await updateDoc(postRef, {
          title: editTitle,
          content: editContent,
        });
  
        // Update the post in local state
        setPosts(
          posts.map((post) =>
            post.id === editingPost.id
              ? { ...post, title: editTitle, content: editContent }
              : post
          )
        );
  
        // Reset the editing state
        handleCancelEdit();
        console.log('Post updated successfully');
      } catch (error) {
        console.error('Error updating post:', error);
      }
    } else {
      console.error("Missing data to update the post:", { editingPost, editTitle, editContent });
    }
  }
  
  async function handleDelete(postId) {
    try {
      // Confirm deletion with the user
      if (confirm('Are you sure you want to delete this post?')) {
        // Reference to the post document
        const postRef = doc(db, 'posts', postId);
        
        // Delete the document from Firestore
        await deleteDoc(postRef);
        
        // Update local state to remove the deleted post
        setPosts(posts.filter((post) => post.id !== postId));
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  }

//   const handleEdit = (postId) => {
//     // Add navigation to edit page
//     window.location.href = `/edit-post/${postId}`;
//   };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500 dark:text-blue-400" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500 dark:text-red-400">
        Error loading posts: {error.message}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-transparent">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Blog Posts</h1>
        <button
          onClick={() => window.location.href = '/admin'}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
        >
          <Plus className="h-5 w-5" />
          New Post
        </button>
      </div>

      {editingPost && (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Edit Post</h2>

      <input
        type="text"
        placeholder="Title"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        className="w-full p-3 mb-4 bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />

      <textarea
        placeholder="Content"
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
        className="w-full p-3 mb-4 bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      ></textarea>

      <div className="flex justify-between">
        <button
          onClick={handleUpdate}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Update
        </button>

        <button
          onClick={handleCancelEdit}
          className="bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-white py-2 px-4 rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


      <div className="grid gap-4">
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 text-sm">
                  <span className="text-gray-500 dark:text-gray-400">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    post.status === 'published' 
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' 
                      : 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200'
                  }`}>
                    {post.status}
                  </span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(post.id)}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <Pencil className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {posts.length === 0 && (
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <p className="text-gray-600 dark:text-gray-300">No posts found. Create your first post!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;