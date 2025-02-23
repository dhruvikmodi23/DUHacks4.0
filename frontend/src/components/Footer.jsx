import { Facebook, Twitter, Instagram } from "lucide-react"; // Importing icons

const Footer = () => {
  return (
    <footer className="bg-slate-500 text-white py-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3">About Us</h3>
          <p className="text-sm text-gray-300">
            Our platform bridges the gap between NGOs and donors, making it easy to contribute and bring positive change.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="text-sm space-y-2">
            <li><a href="/about" className="hover:text-blue-300">About Project</a></li>
            <li><a href="/ngos" className="hover:text-blue-300">View NGOs</a></li>
            <li><a href="/donate" className="hover:text-blue-300">Make a Donation</a></li>
            <li><a href="/events" className="hover:text-blue-300">Upcoming Events</a></li>
            <li><a href="/contact" className="hover:text-blue-300">Contact Us</a></li>
          </ul>
        </div>

        {/* Contact & Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Get in Touch</h3>
          <p className="text-sm text-gray-300">Email: support@ngoplatform.com</p>
          <p className="text-sm text-gray-300">Phone: +1 234 567 890</p>
          
          {/* Social Media Links */}
          <div className="mt-4 flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
              <Facebook className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
              <Twitter className="w-6 h-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
              <Instagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="text-center text-sm text-gray-400 mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} NGO Donation Platform. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
