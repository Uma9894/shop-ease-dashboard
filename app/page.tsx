'use client';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-100 to-white font-sans">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-orange-600 font-serif tracking-wide">
          ShopEase
        </div>
        <ul className="hidden md:flex gap-4 text-sm font-medium">
          <li>
            <Link
              href="/"
              className="px-4 py-2 rounded-full text-gray-700 hover:text-pink-600 hover:bg-pink-100 transition-colors duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className="px-4 py-2 rounded-full text-gray-700 hover:text-purple-600 hover:bg-purple-100 transition-colors duration-300"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="#about"
              className="px-4 py-2 rounded-full text-gray-700 hover:text-orange-500 hover:bg-orange-100 transition-colors duration-300"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="px-4 py-2 rounded-full text-gray-700 hover:text-blue-500 hover:bg-blue-100 transition-colors duration-300"
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 py-16 gap-12 md:gap-20 md:min-h-[calc(100vh-64px)]">
        {/* Left Text Content */}
        <div className="md:w-1/2 w-full text-center md:text-left space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 leading-tight">
            Discover <span className="text-orange-500">Quality</span> Products
          </h1>
          <p className="text-gray-600 text-lg max-w-md md:max-w-lg">
            Your one-stop shop for gadgets, accessories, and home essentials. Experience smooth shopping and unbeatable deals.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white px-6 py-3 rounded-lg font-semibold shadow-lg transition duration-300"
          >
            <span>Login</span>
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>

        {/* Right Image */}
        <div className="md:w-1/2 w-full flex justify-center">
          <Image
            src="/image1.png"
            alt="E-commerce Product"
            width={700}
            height={500}
            className="object-contain"
          />
        </div>
      </section>
    </main>
  );
}
