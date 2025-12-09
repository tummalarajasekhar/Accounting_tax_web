'use client';

import React, { useState } from 'react';
import { Menu, X, CheckCircle, Calculator, FileText, ArrowRight, Phone, Mail, MapPin, Award, Quote, Star } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// --- Navbar Component ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Personal Tax', href: '#personal' },
    { name: 'Corporate', href: '#corporate' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
              CLaTAX<span className="text-blue-600">.</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <button className="bg-slate-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition shadow-lg shadow-slate-900/20 text-sm">
              Request Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <button className="w-full mt-4 bg-blue-600 text-white px-5 py-3 rounded-lg font-medium">
              Request Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// --- Hero Component ---
const Hero = () => (
  <section id="home" className="relative bg-slate-900 py-24 md:py-32 overflow-hidden">
    {/* Abstract Background */}
    <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/20 blur-3xl rounded-full translate-x-1/3 -translate-y-1/4"></div>
    <div className="absolute bottom-0 left-0 w-1/3 h-full bg-indigo-900/20 blur-3xl rounded-full -translate-x-1/4 translate-y-1/4"></div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-semibold mb-6 tracking-wide">
        CLOUD ACCOUNTING & TAX SERVICES INC.
      </span>
      
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
        Accounting & Tax Help To <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
          Keep You Financially Stable
        </span>
      </h1>
      
      <p className="max-w-2xl mx-auto text-lg text-slate-300 mb-10 leading-relaxed">
        We are committed to easing your financial burdens by offering streamlined accounting and tax services. 
        Offering the best quality services at the most affordable price globally.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
          Get Started <ArrowRight size={18} />
        </button>
        <button className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold text-lg transition border border-white/10">
          Our Services
        </button>
      </div>
    </div>
  </section>
);

// --- About / Who We Are ---
const About = () => (
  <section className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-blue-600 font-bold tracking-wider uppercase mb-2 text-sm">About Us</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Who We Are?</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            Cloud Accounting & Tax Services Inc. | CLaTAX is a full-scale tax and accounting firm. Our comprehensive cloud accounting services are sure to make your life way easier than before.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Our company leverages technology and the expertise of our vetted financial experts to ease your financial management troubles. It doesn’t matter where you’re based; our cloud accounting solutions are made to reach every individual and business.
          </p>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-2xl bg-slate-100 overflow-hidden relative">
            {/* Placeholder for About Image */}
            <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400">
              <span className="text-sm">Office / Team Image</span>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border border-slate-100 max-w-xs">
            <p className="font-bold text-slate-900 text-lg mb-1">Since 2017</p>
            <p className="text-slate-500 text-sm">Providing smart cloud-based tax accounting systems.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- Audience Cards (Individuals, Business, Corp) ---
const SegmentCard = ({ title, desc, icon: Icon, points, badge }: any) => (
  <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <Icon size={24} />
      </div>
      {badge && <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">{badge}</span>}
    </div>
    
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 text-sm mb-6 leading-relaxed min-h-[80px]">{desc}</p>
    
    <ul className="space-y-3">
      {points.map((pt: string, i: number) => (
        <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
          <CheckCircle size={16} className="text-blue-500 mt-0.5 shrink-0" />
          <span>{pt}</span>
        </li>
      ))}
    </ul>
  </div>
);

const Audience = () => (
  <section id="services" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Who Can Get Services From Us?</h2>
        <p className="text-slate-600">Our expert financial management services accommodate every individual from all walks of life.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <SegmentCard 
          title="Individuals & Families"
          desc="Managing your personal finances can feel overwhelming—but it doesn’t have to be! Say goodbye to the stress of doing taxes yourself."
          icon={FileText}
          badge="2024-2025 Checklist"
          points={[
            'Ensure you have all necessary documents',
            'Maximize deductions & credits',
            'Stay compliant with Tax Regulations',
            'Penalty and interest relief request'
          ]}
        />
        <SegmentCard 
          title="Business Owners"
          desc="Self-employed, freelancers, gig workers, and e-commerce sellers. Managing your finances shouldn’t be a roadblock to your growth."
          icon={Calculator}
          points={[
            'Hassle-free tax filing',
            'Bookkeeping services',
            'Pay stubs for employees',
            'Tax planning and consultancy'
          ]}
        />
        <SegmentCard 
          title="Corporations"
          desc="The complexities of corporate taxes demand precision. We ensure your corporate tax filings are error-free and optimized."
          icon={Award}
          points={[
            'Corporate income tax filing',
            'Tax audit representation',
            'Payroll management',
            'Sales Tax & Annual Filings'
          ]}
        />
      </div>
    </div>
  </section>
);

// --- Delivery Methods (Office vs Cloud) ---
const DeliveryMethods = () => (
  <section className="py-20 bg-slate-900 text-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold">How Can You Get Our Services?</h2>
      </div>
      
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Office */}
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-blue-500 transition cursor-pointer">
          <MapPin className="text-blue-500 mb-4" size={32} />
          <h3 className="text-xl font-bold mb-2">OFFICE: In-person Service</h3>
          <p className="text-slate-400 text-sm">
            Come to our office to speak with a certified professional accountant face to face. 
            Access services in person at our local branches.
          </p>
        </div>

        {/* Cloud */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-2xl shadow-lg transform md:-translate-y-4">
          <div className="flex justify-between items-start">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Star className="text-white" size={24} fill="white" />
            </div>
            <span className="bg-white text-blue-700 text-xs font-bold px-2 py-1 rounded">POPULAR</span>
          </div>
          <h3 className="text-xl font-bold mt-4 mb-2">CLOUD: On-line Remote Service</h3>
          <p className="text-blue-100 text-sm">
            Available to everybody globally. Use our easy cloud tax and accounting services at any time 
            and from anyplace. Saves time and stress.
          </p>
        </div>
      </div>
    </div>
  </section>
);

// --- Testimonials ---
const Testimonials = () => (
  <section className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">What People Say About Us</h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            name: "Limon Rahman",
            role: "Director, DhakaBazar Plus Ltd.",
            text: "I've been using CLaTAX for years. My business wouldn't have succeeded without them. They're helping us choose which parts of the company to focus on to boost revenue."
          },
          {
            name: "Shamim Ahamed",
            role: "Director, Victory Food Mart",
            text: "It's been 14 years of personal and business services. They are not just an accountant for me; they are my guide for any tax or financial issues raised."
          },
          {
            name: "Uday Singh",
            role: "Owner, Indian Junction Bar & Grill",
            text: "I trust this firm with my company's accountancy. They are wonderful at simplifying tax matters and handling what I don't want to do. Highly recommended."
          }
        ].map((testimonial, i) => (
          <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <Quote className="text-blue-200 mb-4" size={40} />
            <p className="text-slate-600 mb-6 italic">"{testimonial.text}"</p>
            <div>
              <p className="font-bold text-slate-900">{testimonial.name}</p>
              <p className="text-sm text-slate-500">{testimonial.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// --- Awards ---
const Awards = () => (
  <section className="py-16 bg-white border-b border-slate-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-2xl font-bold text-slate-900 mb-10">Awards & Recognition</h2>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
        <div className="flex flex-col items-center">
          <Award size={48} className="text-yellow-500 mb-2" />
          <span className="font-bold text-slate-800">#1 Best Accountants</span>
          <span className="text-xs text-slate-500">2024 Rankings</span>
        </div>
        <div className="flex flex-col items-center">
          <Award size={48} className="text-yellow-500 mb-2" />
          <span className="font-bold text-slate-800">Best Tax Practice</span>
          <span className="text-xs text-slate-500">LegalDirectorate.ca</span>
        </div>
        <div className="flex flex-col items-center">
          <Award size={48} className="text-yellow-500 mb-2" />
          <span className="font-bold text-slate-800">#1 Accounting Firm</span>
          <span className="text-xs text-slate-500">Waterview 2024</span>
        </div>
      </div>
    </div>
  </section>
);

// --- Footer ---
const Footer = () => (
  <footer id="contact" className="bg-slate-900 text-slate-300 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-1">
          <h3 className="text-white text-xl font-bold mb-4">CLaTAX</h3>
          <p className="text-sm text-slate-400 mb-6">
            A leading accounting firm delivering comprehensive solutions in tax preparation, bookkeeping, and corporate accounting.
          </p>
          <div className="flex gap-4">
            <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-blue-600 transition cursor-pointer">f</div>
            <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-blue-400 transition cursor-pointer">t</div>
            <div className="w-8 h-8 bg-slate-800 rounded flex items-center justify-center hover:bg-pink-600 transition cursor-pointer">i</div>
          </div>
        </div>
        
        <div>
          <h4 className="text-white font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-blue-500" />
              +1 (855) 915-2931
            </li>
            <li className="flex items-center gap-2">
              <Phone size={14} className="text-blue-500" />
              +1 (236) 521-0134
            </li>
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-blue-500" />
              info@cloudaccountings.net
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-400 transition">Personal Tax</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Corporate Tax</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Payroll Service</a></li>
            <li><a href="#" className="hover:text-blue-400 transition">Bookkeeping</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4">Head Office</h4>
          <p className="text-sm text-slate-400">
            123 Finance District Way,<br />
            Metropolitan Region, State<br />
            Global V5J 5J8
          </p>
        </div>
      </div>
      
      <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} Cloud Accounting & Tax Services Inc. All rights reserved.</p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Main Page ---
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      <About />
      <Audience />
      <DeliveryMethods />
      <Testimonials />
      <Awards />
      <Footer />
    </main>
  );
}