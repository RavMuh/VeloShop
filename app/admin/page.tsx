'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      if (!firebaseUser || firebaseUser.email !== 'admin@example.com') {
        router.replace('/');
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <div>Yuklanmoqda...</div>;
  if (!user || user.email !== 'admin@example.com') return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      <div>Faqat admin uchun maxsus sahifa.</div>
    </div>
  );
}

