import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">
              © {new Date().getFullYear()} Vehicle Complaint Management System. All rights reserved.
            </p>
            <p className="text-xs mt-1 text-gray-400">
            Contact: support@vehiclecomplaints.gov.np | +977-1234567890
            Terms of Service | Privacy Policy | FAQs
            Powered by the IT Department, Government of Nepal
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;