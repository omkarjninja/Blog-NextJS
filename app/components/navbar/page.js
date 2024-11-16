'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import ThemeToggle from "../ThemeToggle";
export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
    return (
      <nav className="bg-white dark:bg-gray-800 shadow-md transition-colors bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-70">
        <div className="container mx-auto px-4">
          <div className="flex justify-between h-16 items-center">
            {/* Logo Section */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
                <span className="text-xl font-bold text-gray-900 dark:text-white">OmkarJ</span>
              </Link>
            </div>
  
            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-600 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white p-2"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
  
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center justify-center flex-1">
              <div className="flex space-x-8">
                <Link 
                  href="/" 
                  className="text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 font-medium"
                >
                  Home
                </Link>
                <Link 
                  href="/posts" 
                  className="text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 font-medium"
                >
                  Blog
                </Link>
                <Link 
                  href="/" 
                  className="text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 font-medium"
                >
                  NewsLetter
                </Link>
                <Link 
                  href="https://jadhavomkar.netlify.app/" 
                  className="text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 font-medium"
                >
                  Portfolio
                </Link>
              </div>
            </div>
  
            {/* CTA Button and Theme Toggle */}
            <div className="hidden md:flex items-center space-x-4">
              <ThemeToggle />
              <Link
                href="/authCheck"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
              >
                Write a Post
              </Link>
            </div>
          </div>
  
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-white dark:bg-gray-800">
                <Link 
                  href="/" 
                  className="block text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/posts" 
                  className="block text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <Link 
                  href="/about" 
                  className="block text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  className="block text-gray-600 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
                <Link
                  href="/write"
                  className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Write a Post
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    );
  }