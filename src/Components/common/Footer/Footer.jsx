import React from 'react';
import { 
  Activity, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Heart,
  Shield,
  Users,
  Award
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Departments', href: '/departments' },
    { name: 'Contact', href: '/contact' },
    { name: 'Emergency', href: '/emergency' },
  ];

  const services = [
    { name: 'Emergency Care', href: '/services/emergency' },
    { name: 'General Surgery', href: '/services/surgery' },
    { name: 'Cardiology', href: '/services/cardiology' },
    { name: 'Pediatrics', href: '/services/pediatrics' },
    { name: 'Radiology', href: '/services/radiology' },
    { name: 'Laboratory', href: '/services/laboratory' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-sky-500' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-500' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-700' },
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Patients Served' },
    { icon: Heart, value: '50+', label: 'Expert Doctors' },
    { icon: Award, value: '25+', label: 'Years Experience' },
    { icon: Shield, value: '24/7', label: 'Emergency Care' },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-green-900 to-cyan-900 text-white">
      {/* Stats Section */}
      <div className="border-b border-green-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-cyan-500 rounded-2xl mb-4 shadow-lg">
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-green-200 text-sm font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="flex items-center">
              <div >
                <div >
                  <img 
                    src="/logo.svg" 
                    alt="Logo" 
                    className="h-20 object-contain" 
                  />
                </div>
              </div>
            </div>
            
            <p className="text-green-100 text-sm leading-relaxed">
              Providing exceptional healthcare services with compassion, innovation, and excellence. 
              Your health and well-being are our top priorities.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-green-100">
                <div className="flex-shrink-0 w-8 h-8 bg-green-800/50 rounded-lg flex items-center justify-center">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">Emergency: +1 (555) 123-4567</div>
                  <div className="text-xs text-green-300">24/7 Available</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 text-green-100">
                <div className="flex-shrink-0 w-8 h-8 bg-green-800/50 rounded-lg flex items-center justify-center">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-medium">info@Healthcare.com</div>
                  <div className="text-xs text-green-300">Get in touch</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-cyan-400 rounded-full mr-3"></div>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-green-100 hover:text-white transition-colors duration-300 text-sm flex items-center group"
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:bg-cyan-400 transition-colors duration-300"></div>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-cyan-400 rounded-full mr-3"></div>
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href={service.href}
                    className="text-green-100 hover:text-white transition-colors duration-300 text-sm flex items-center group"
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full mr-3 group-hover:bg-cyan-400 transition-colors duration-300"></div>
                    {service.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <div className="w-1 h-6 bg-gradient-to-b from-green-400 to-cyan-400 rounded-full mr-3"></div>
              Contact & Hours
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3 text-green-100">
                <div className="flex-shrink-0 w-8 h-8 bg-green-800/50 rounded-lg flex items-center justify-center mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <div className="text-sm">
                  <div className="font-medium text-white mb-1">Address</div>
                  <div className="leading-relaxed">
                    123 Healthcare Ave,<br />
                    Medical District,<br />
                    New York, NY 10001
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 text-green-100">
                <div className="flex-shrink-0 w-8 h-8 bg-green-800/50 rounded-lg flex items-center justify-center mt-0.5">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="text-sm">
                  <div className="font-medium text-white mb-2">Operating Hours</div>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span>Mon - Fri:</span>
                      <span>8:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>9:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>10:00 AM - 4:00 PM</span>
                    </div>
                    <div className="mt-2 pt-2 border-t border-green-800/50">
                      <div className="flex justify-between font-medium text-green-400">
                        <span>Emergency:</span>
                        <span>24/7</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-4">
              <h4 className="text-white font-medium mb-4">Follow Us</h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 bg-green-800/50 hover:bg-green-700/50 rounded-xl flex items-center justify-center transition-all duration-300 ${social.color} group`}
                      aria-label={social.name}
                    >
                      <IconComponent className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-green-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-green-200 text-sm">
              © {currentYear} Healthcare Hospital Management. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-green-200 text-sm">
              <a href="/privacy" className="hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/terms" className="hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
              <a href="/accessibility" className="hover:text-white transition-colors duration-300">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;