'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      if (!firebaseUser) {
        router.replace('/auth/signin');
      }
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <div>Yuklanmoqda...</div>;
  if (!user) return null;

  const showWelcome = searchParams && searchParams.get('welcome') === '1';

  return (
    <div className="container mx-auto px-4 py-8">
      {showWelcome && (
        <div className="mb-6 p-4 rounded-lg bg-green-100 text-green-800 text-lg font-semibold text-center">
          Tabriklaymiz! Siz muvaffaqiyatli ro‘yxatdan o‘tdingiz.
        </div>
      )}
      <h1 className="text-3xl font-bold mb-8">Shaxsiy kabinet</h1>
      <div className="mb-8">
        <div className="text-lg font-semibold">Foydalanuvchi:</div>
        <div>{user.email}</div>
      </div>
    </div>
  );
} 