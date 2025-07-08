'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebaseClient';
import { db } from '@/lib/firebaseClient';
import { doc, getDoc, collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { updateEmail, updatePassword } from 'firebase/auth';

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [emailForm, setEmailForm] = useState('');
  const [emailMsg, setEmailMsg] = useState('');
  const [passwordForm, setPasswordForm] = useState('');
  const [passwordMsg, setPasswordMsg] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (!firebaseUser) {
        setLoading(false);
        router.replace('/auth/signin');
        return;
      }
      // Fetch Firestore profile
      try {
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        if (userDoc.exists()) {
          setProfile(userDoc.data());
        } else {
          setProfile(null);
        }
      } catch (e) {
        setProfile(null);
      }
      // Fetch user's orders
      try {
        console.log('Current user UID:', firebaseUser.uid);
        const q = query(collection(db, 'orders'), where('userId', '==', firebaseUser.uid), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        console.log('Orders query snapshot size:', querySnapshot.size);
        const userOrders = querySnapshot.docs.map(doc => {
          const data = doc.data();
          console.log('Order doc userId:', data.userId, 'Order ID:', data.id);
          return data;
        });
        console.log('Fetched orders:', userOrders);
        setOrders(userOrders);
      } catch (e) {
        setOrders([]);
        console.log('Error fetching orders:', e);
      }
      // Foydalanuvchining barcha buyurtmalarini emas, balki Firestore'dagi barcha buyurtmalarni olib ko‘rish uchun:
      try {
        const allOrdersSnapshot = await getDocs(collection(db, 'orders'));
        const allOrders = allOrdersSnapshot.docs.map(doc => doc.data());
        setOrders(allOrders); // Faqat test uchun!
        console.log('ALL ORDERS IN FIRESTORE:', allOrders);
      } catch (e) {
        setOrders([]);
        console.log('Error fetching all orders:', e);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [router]);

  if (loading) return <div>Yuklanmoqda...</div>;
  if (!user) return null;

  const showWelcome = searchParams && searchParams.get('welcome') === '1';

  const handleEmailChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailMsg('');
    if (!user) return;
    try {
      await updateEmail(user, emailForm);
      setEmailMsg('Email muvaffaqiyatli o‘zgartirildi!');
      setEmailForm('');
    } catch (err: any) {
      setEmailMsg('Xatolik: ' + (err.message || 'Emailni o‘zgartirib bo‘lmadi.')); 
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMsg('');
    if (!user) return;
    try {
      await updatePassword(user, passwordForm);
      setPasswordMsg('Parol muvaffaqiyatli o‘zgartirildi!');
      setPasswordForm('');
    } catch (err: any) {
      setPasswordMsg('Xatolik: ' + (err.message || 'Parolni o‘zgartirib bo‘lmadi.'));
    }
  };

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
        <div>{profile?.email || user.email}</div>
        {profile?.createdAt && (
          <div className="text-sm text-muted-foreground mt-2">Ro‘yxatdan o‘tgan sana: {new Date(profile.createdAt).toLocaleString()}</div>
        )}
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Emailni o‘zgartirish</h2>
        <form onSubmit={handleEmailChange} className="flex flex-col gap-2 max-w-md">
          <input
            type="email"
            className="border rounded px-3 py-2"
            placeholder="Yangi email"
            value={emailForm}
            onChange={e => setEmailForm(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">Emailni o‘zgartirish</button>
          {emailMsg && <div className={emailMsg.startsWith('Xatolik') ? 'text-red-500' : 'text-green-600'}>{emailMsg}</div>}
        </form>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Parolni o‘zgartirish</h2>
        <form onSubmit={handlePasswordChange} className="flex flex-col gap-2 max-w-md">
          <input
            type="password"
            className="border rounded px-3 py-2"
            placeholder="Yangi parol"
            value={passwordForm}
            onChange={e => setPasswordForm(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary">Parolni o‘zgartirish</button>
          {passwordMsg && <div className={passwordMsg.startsWith('Xatolik') ? 'text-red-500' : 'text-green-600'}>{passwordMsg}</div>}
        </form>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Mening buyurtmalarim</h2>
        {orders.length === 0 ? (
          <div className="text-muted-foreground">Sizda hali buyurtmalar yo‘q.</div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <div className="font-semibold">Buyurtma ID: {order.id}</div>
                    <div className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleString()}</div>
                  </div>
                  <div className="font-bold text-primary text-lg">{order.total?.toLocaleString()} so'm</div>
                </div>
                <div className="mb-2">
                  <span className="font-medium">Status:</span> {order.status}
                </div>
                <div>
                  <span className="font-medium">Mahsulotlar:</span>
                  <ul className="list-disc ml-6">
                    {order.items?.map((item: any, idx: number) => (
                      <li key={idx} className="flex items-center gap-2 mb-1">
                        {item.product?.image && (
                          <img src={item.product.image} alt={item.product.name} className="w-8 h-8 object-cover rounded" />
                        )}
                        <span>{item.product?.name} ({item.quantity} ta)</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 