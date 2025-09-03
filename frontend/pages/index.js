
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const auth = useSelector((state) => state.auth);
  const token = auth?.token;

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken || token) {
      router.push('/dashboard');
    }
  }, [token, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Mini Project Manager
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Organize your projects and tasks efficiently
          </p>
          <div className="space-x-4">
            <Link
              href="/login"
              className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg hover:bg-indigo-700 inline-block"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="bg-white text-indigo-600 px-6 py-3 rounded-md text-lg border border-indigo-600 hover:bg-indigo-50 inline-block"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}