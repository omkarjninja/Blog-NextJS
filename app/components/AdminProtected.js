'use client';
import { useAuth } from '../lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// const ADMIN_EMAIL = "ojadhav250@gmail.com";

export default function AdminProtected({ children }) {
    const { user, loading } = useAuth();
    const router = useRouter();
  
    useEffect(() => {
      if (!loading && (!user || user.email !== ADMIN_EMAIL)) {
        router.push('/');
      }
    }, [user, loading, router]);
  
    if (loading || !user || user.email !== ADMIN_EMAIL) {
      return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
    }
  
    return children;
  }