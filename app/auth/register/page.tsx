'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebaseClient';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { db } from '@/lib/firebaseClient';
import { setDoc, doc } from 'firebase/firestore';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Parollar mos emas!');
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        createdAt: new Date().toISOString(),
      });
      router.push('/profile?welcome=1');
    } catch (err: any) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        email: result.user.email,
        createdAt: new Date().toISOString(),
      });
      router.push('/profile?welcome=1');
    } catch (err: any) {
      setError('Google orqali ro‘yxatdan o‘tishda xatolik: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md space-y-8 border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center">Ro‘yxatdan o‘tish</h1>
        {error && <div className="text-red-500 text-base text-center">{error}</div>}
        <div>
          <label className="block mb-2 text-lg">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-primary"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-lg">Parol</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-primary"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-lg">Parolni tasdiqlang</label>
          <input
            type="password"
            value={confirm}
            onChange={e => setConfirm(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-primary"
            required
          />
        </div>
        <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
          {loading ? 'Yuborilmoqda...' : 'Ro‘yxatdan o‘tish'}
        </Button>
        <div className="relative my-10">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-lg">
            <span className="bg-white px-4 text-muted-foreground">yoki</span>
          </div>
        </div>
        <Button
          type="button"
          className="w-full h-12 text-lg"
          variant="outline"
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          Google orqali ro‘yxatdan o‘tish
        </Button>
        <div className="text-center text-base text-muted-foreground mt-8">
          Allaqachon hisobingiz bormi?{' '}
          <Link href="/auth/signin" className="text-primary underline font-semibold">Kirish</Link>
        </div>
      </form>
    </div>
  );
} 