import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © {new Date().getFullYear()} SAMA. All rights reserved.
            </p>
            <p className="text-xs mt-1 text-gray-400">
              This tool is for informational purposes only and is not a substitute for professional medical advice.
            </p>
          </div>
          <div className="flex items-center">
            <span className="text-sm mr-2">Made with</span>
            <Heart size={16} className="text-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;