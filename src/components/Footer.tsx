'use client';

import Link from 'next/link';

const Footer = () => {

  return (
    <footer className="bg-[#1A1A1A] text-gray-400">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Devisyn</h3>
            <p className="text-gray-400">
              Crafting digital excellence through innovative software solutions.
            </p>

            <div className="flex space-x-4">
              <a href="https://linkedin.com/company/devisynstudio" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00FF9D] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 512 512" aria-hidden="true">
                  <path d="M444.17 32H70.28C49.85 32 32 46.7 32 66.89v374.72C32 461.91 49.85 480 70.28 480h373.78c20.54 0 35.94-18.21 35.94-38.39V66.89C480.12 46.7 464.6 32 444.17 32zm-273.3 373.43h-64.18V205.88h64.18zM141 175.54h-.46c-20.54 0-33.84-15.29-33.84-34.43 0-19.49 13.65-34.42 34.65-34.42s33.85 14.82 34.31 34.42c-.01 19.14-13.31 34.43-34.66 34.43zm264.43 229.89h-64.18V296.32c0-26.14-9.34-44-32.56-44-17.74 0-28.24 12-32.91 23.69-1.75 4.2-2.22 9.92-2.22 15.76v113.66h-64.18V205.88h64.18v27.77c9.34-13.3 23.93-32.44 57.88-32.44 42.13 0 74 27.77 74 87.64z" />
                </svg>
              </a>

              <a href="https://www.instagram.com/devisynstudio/" className="text-gray-400 hover:text-[#00FF9D] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 013.58 3.58c.247.636.416 1.363.465 2.427.048 1.024.06 1.379.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-3.58 3.58c-.636.247-1.363.416-2.427.465-1.024.048-1.379.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-3.58-3.58c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.379-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 013.58-3.58c.636-.247 1.363-.416 2.427-.465 1.024-.048 1.379-.06 3.808-.06zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm4.295 1.44a1.005 1.005 0 11-2 0 1.005 1.005 0 012 0zm-4.295 5.8a2.835 2.835 0 110-5.67 2.835 2.835 0 010 5.67z" clip-rule="evenodd" />
                </svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00FF9D] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 4.557a9.8 9.8 0 01-2.828.775 4.932 4.932 0 002.165-2.724 9.83 9.83 0 01-3.127 1.195A4.916 4.916 0 0016.616 3c-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124-4.087-.205-7.715-2.165-10.141-5.144a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.215 2.188 4.099a4.903 4.903 0 01-2.228-.616v.062c0 2.385 1.693 4.374 3.946 4.828a4.996 4.996 0 01-2.224.084c.626 1.956 2.444 3.377 4.6 3.418A9.867 9.867 0 012 19.54a13.91 13.91 0 007.548 2.213c9.055 0 14.001-7.498 14.001-13.986 0-.21-.005-.423-.015-.634A9.936 9.936 0 0024 4.557z" />
                </svg>
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#00FF9D] transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.91-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>


            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-[#00FF9D] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#00FF9D] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-[#00FF9D] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/work" className="hover:text-[#00FF9D] transition-colors">
                  Work
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services#web-development" className="hover:text-[#00FF9D] transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link href="/services#mobile-apps" className="hover:text-[#00FF9D] transition-colors">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link href="/services#ai-solutions" className="hover:text-[#00FF9D] transition-colors">
                  AI Solutions
                </Link>
              </li>
              <li>
                <Link href="/services#cloud-services" className="hover:text-[#00FF9D] transition-colors">
                  Cloud Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <a href="tel:+923175429933" className="flex items-center hover:text-[#00FF9D] transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+92 3175429933</span>
                </a>
              </li>
              <li className="flex items-center">
                <a href="mailto:devisynstudio@gmail.com" className="flex items-center hover:text-[#00FF9D] transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>devisynstudio@gmail.com</span>
                </a>
              </li>
              <li className="flex items-center">
                <a href="https://maps.google.com/?q=Ghousia+Street+Mohallah+Mehmood+Abad+Jhelum+Pakistan" target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-[#00FF9D] transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Ghousia Street, Mohallah Mehmood Abad, Jhelum, Pakistan</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Devisyn. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm text-gray-500 hover:text-[#00FF9D] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm text-gray-500 hover:text-[#00FF9D] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 