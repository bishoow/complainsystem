"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-200">
      <div className="container-custom">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center">
            {/* Smaller, more proportional logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/voice-of-nepal-logo.png"
                alt="Voice of Nepal Logo"
                width={120}
                height={67}
                className="h-auto dark:brightness-125"
                priority
              />
            </Link>
          </div>

          <nav className="flex items-center">
            <div className="hidden md:flex space-x-6">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-200 hover:text-nepal-blue dark:hover:text-nepal-blue font-medium"
              >
                Home
              </Link>
              <Link
                href="#about"
                className="text-gray-700 dark:text-gray-200 hover:text-nepal-blue dark:hover:text-nepal-blue font-medium"
              >
                About
              </Link>
              <Link
                href="#petitions"
                className="text-gray-700 dark:text-gray-200 hover:text-nepal-blue dark:hover:text-nepal-blue font-medium"
              >
                Petitions
              </Link>
              <Link
                href="#contact"
                className="text-gray-700 dark:text-gray-200 hover:text-nepal-blue dark:hover:text-nepal-blue font-medium"
              >
                Contact
              </Link>
            </div>

            <div className="flex items-center ml-4 space-x-3">
              <div className="h-8 w-8 relative">
                <Image
                  src="/images/nepal-flag.gif"
                  alt="Nepal Flag"
                  width={32}
                  height={32}
                  className="object-contain"
                />
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* Improved Mobile Navigation */}
      <div className="md:hidden bg-gray-100 dark:bg-gray-800 py-2 transition-colors duration-200">
        <div className="container-custom flex justify-between">
          <Link href="/" className="text-sm text-gray-700 dark:text-gray-200 font-medium">
            Home
          </Link>
          <Link
            href="#about"
            className="text-sm text-gray-700 dark:text-gray-200 font-medium"
          >
            About
          </Link>
          <Link
            href="#petitions"
            className="text-sm text-gray-700 dark:text-gray-200 font-medium"
          >
            Petitions
          </Link>
          <Link
            href="#contact"
            className="text-sm text-gray-700 dark:text-gray-200 font-medium"
          >
            Contact
          </Link>
        </div>
      </div>
    </header>
  )
}