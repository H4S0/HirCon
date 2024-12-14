import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <footer className="text-black">
      <div className="container mx-auto px-6">
        {/* Top Section */}
        <div className="flex flex-wrap justify-between gap-y-8">
          {/* Company Info */}
          <div className="w-full md:w-1/2 lg:w-1/3">
            <h3 className="text-2xl font-bold mb-4">Hircon</h3>
            <p className="text-gray-600 text-lg md:text-base">
              At Hircon, we bridge the gap between talented professionals and
              top-tier companies. Our mission is to provide seamless access to
              career-defining opportunities for job seekers, while empowering
              companies to find the right talent with ease.
            </p>
            <button className="mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300">
              Register Now
            </button>
          </div>

          {/* Quick Links */}
          <div className="w-full md:w-1/2 lg:w-1/3">
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-600 hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-600 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="text-gray-600 hover:text-white">
                  Our Services
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-600 hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full md:w-1/2 lg:w-1/3">
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p className="text-gray-600">📍 Tešanj, Bosnia and Herzegovina</p>
            <p className="text-gray-600 mt-2">📞 +1 (234) 567-8901</p>
            <p className="text-gray-600 mt-2">✉️ support@hircon.com</p>

            <div className="flex space-x-4 mt-4">
              <a
                href="#"
                aria-label="Facebook"
                className="text-gray-600 hover:text-black"
              >
                <Facebook />
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="text-gray-600 hover:text-black"
              >
                <Twitter />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-gray-600 hover:text-black"
              >
                <Linkedin />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="text-gray-600 hover:text-black"
              >
                <Instagram />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Hircon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
