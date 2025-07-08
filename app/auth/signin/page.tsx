'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/firebaseClient';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/');
    } catch (err: any) {
      setError('Login yoki parol xato!');
    }
    setLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      router.push('/');
    } catch (err: any) {
      setError('Google orqali kirishda xatolik: ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md space-y-8 border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center">Kirish</h1>
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
        <Button type="submit" className="w-full h-12 text-lg" disabled={loading}>
          {loading ? 'Kirish...' : 'Kirish'}
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
          Google orqali kirish
        </Button>
        <div className="text-center text-base text-muted-foreground mt-8">
          Hisobingiz yo‘qmi?{' '}
          <Link href="/auth/register" className="text-primary underline font-semibold">Ro‘yxatdan o‘tish</Link>
        </div>
      </form>
    </div>
  );
} 