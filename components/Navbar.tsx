// components/Navbar.jsx
'use client'; // Required for interactive elements like mobile menu
import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from './ui/button';
import AdBanner from "@/components/AdBanner"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <>

    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-xl font-bold text-blue-600">
              MyLogo
            </Link>
            {user?.role === 'admin' ? (
              <Link href="/admin/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                Admin Panel
              </Link>
            ) : null}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Button onClick={logout} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Logout
              </Button>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2">
                  Login
                </Link>
                <Link href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Register
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block text-gray-700 hover:text-blue-600 px-3 py-2">
              Home
            </Link>
            {user?.role === 'admin' ? (
              <Link href="/admin/dashboard" className="block text-gray-700 hover:text-blue-600 px-3 py-2">
                Admin Panel
              </Link>
            ) : null}
            {!user ? (
              <>
                <Link href="/login" className="block text-gray-700 hover:text-blue-600 px-3 py-2">
                  Login
                </Link>
                <Link href="/signup" className="block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                  Register
                </Link>
              </>
            ) : null}
          </div>
        </div>
      )}
    </nav>
    <AdBanner adSlot="1234567890" adFormat="auto" fullWidth={true} />
    </>
  );
}
