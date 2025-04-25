"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors duration-200">
      <div className="container-custom">
        <div className="flex items-center justify-between py-3">
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
                href="#contact"
                className="text-gray-700 dark:text-gray-200 hover:text-nepal-blue dark:hover:text-nepal-blue font-medium"
              >
                Contact
              </Link>
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