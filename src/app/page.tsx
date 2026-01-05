
'use client';
import { useFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function RootPage() {
  const { user, isUserLoading } = useFirebase();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading) {
      if (user) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }
  }, [user, isUserLoading, router]);

  return (
      <div className="flex h-screen w-full items-center justify-center">
        <div>Loading...</div>
      </div>
  );
}
