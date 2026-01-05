'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Menu, X, CheckCircle, Calculator, FileText, ArrowRight,
  Phone, Mail, MapPin, Award, Quote, Star, Send, Loader2,
  Building2, TrendingUp, ShieldCheck
} from 'lucide-react';

// --- Navbar Component ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">

          {/* Logo */}
          <div
            onClick={() => scrollToSection('home')}
            className="flex-shrink-0 flex items-center gap-2 cursor-pointer group"
          >
            <div className="p-2 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:bg-blue-700 transition">
              <span className="text-white font-bold text-xl">TPR</span>
            </div>
            <span className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
              CS<span className="text-blue-600">.</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="text-slate-600 hover:text-blue-600 font-medium text-sm transition-colors"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-slate-900 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-slate-800 transition shadow-lg shadow-slate-900/20 text-sm"
            >
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
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            {navLinks.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:bg-slate-50 hover:text-blue-600"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full mt-4 bg-blue-600 text-white px-5 py-3 rounded-lg font-medium"
            >
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
    <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/20 blur-3xl rounded-full translate-x-1/3 -translate-y-1/4"></div>
    <div className="absolute bottom-0 left-0 w-1/3 h-full bg-indigo-900/20 blur-3xl rounded-full -translate-x-1/4 translate-y-1/4"></div>

    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-block py-1 px-3 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-semibold mb-6 tracking-wide">
          TPR CS CLOUD ACCOUNTING
        </span>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
          Accounting & Tax Help To <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-300">
            Keep You Financially Stable
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-slate-300 mb-10 leading-relaxed">
          We are committed to easing your financial burdens by offering streamlined accounting and tax services.
          Expert filing for Individuals, Freelancers, and Corporates.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg transition shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
            File My Taxes <ArrowRight size={18} />
          </button>
          <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl font-bold text-lg transition border border-white/10">
            Explore Services
          </button>
        </div>
      </motion.div>
    </div>
  </section>
);

// --- About Section ---
const About = () => (
  <section id="about" className="py-20 bg-white border-b border-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-blue-600 font-bold tracking-wider uppercase mb-2 text-sm">About Us</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Who We Are?</h3>
          <p className="text-slate-600 leading-relaxed mb-6">
            Cloud Accounting & Tax Services Inc. | Tax Filing TPRCS is a full-scale tax and accounting firm based in Guntur. Our comprehensive cloud accounting services make your life easier.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Our company leverages technology and the expertise of our vetted financial experts to ease your financial management troubles. Whether you are a salaried employee or a Pvt Ltd company, we have you covered.
          </p>
        </div>
        <div className="relative">
          <div className="aspect-square rounded-2xl bg-slate-100 overflow-hidden relative shadow-xl">
            {/* Using standard img tag for ease of use without config */}
            <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=800" alt="About TPRCS" className="object-cover w-full h-full" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// --- Services Cards ---
const SegmentCard = ({ title, desc, icon: Icon, points, badge }: any) => (
  <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group h-full">
    <div className="flex justify-between items-start mb-6">
      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <Icon size={24} />
      </div>
      {badge && <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded-full">{badge}</span>}
    </div>

    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 text-sm mb-6 leading-relaxed min-h-[60px]">{desc}</p>

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

const Services = () => (
  <section id="services" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Services</h2>
        <p className="text-slate-600">Expert financial management for individuals and businesses.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <SegmentCard
          title="Personal Tax (ITR)"
          desc="Maximizing refunds for salaried individuals and freelancers. We handle Form-16 analysis and capital gains."
          icon={FileText}
          badge="ITR-1 to ITR-4"
          points={[
            'Personal Income Tax Filing',
            'Capital Gains (Stocks/Crypto)',
            'Tax Refund Optimization',
            'Notice Management'
          ]}
        />
        <SegmentCard
          title="Business & GST"
          desc="Complete compliance for small businesses and shop owners. Monthly GST filing made simple."
          icon={Calculator}
          points={[
            'Monthly GST Filing',
            'GSTR-1 & GSTR-3B',
            'Balance Sheet Preparation',
            'MSME Registration'
          ]}
        />
        <SegmentCard
          title="Corporate Services"
          desc="End-to-end solutions for Pvt Ltd and LLP companies including incorporation and audit support."
          icon={Building2}
          points={[
            'Company Incorporation',
            'Corporate Tax Filing',
            'ROC Compliances',
            'Payroll Management'
          ]}
        />
      </div>
    </div>
  </section>
);

// --- Contact Form Section ---
const Contact = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'Personal Tax',
    message: ''
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('https://rajabackend.srikrishnatechhub.com/request-callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setStatus('success');
        // Optional: Reset form data if you want them to be able to send another later
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: 'Personal Tax',
          message: ''
        });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Submission error:", error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16">

          {/* Contact Info Side - Unchanged */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
            <p className="text-slate-300 mb-8 leading-relaxed">
              Ready to file your taxes or need a consultation? Fill out the form and our team will contact you within 24 hours.
            </p>

            <div className="space-y-8">
              {/* <div className="flex items-start gap-4">
                <div className="p-4 bg-slate-800 rounded-xl text-blue-400">
                  <MapPin size={28} />
                </div>
                {/* <div>
                  <h3 className="font-bold text-xl mb-1">Visit Us</h3>
                  <p className="text-slate-400">TPR CS, Brodipet / Koretapadu<br />Guntur, Andhra Pradesh</p>
                </div> 
              </div> */}

              <div className="flex items-start gap-4">
                <div className="p-4 bg-slate-800 rounded-xl text-blue-400">
                  <Mail size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">Email Us</h3>
                  <p className="text-slate-400">info@tprcs.com</p>
                </div>
              </div>

              {/* <div className="flex items-start gap-4">
                <div className="p-4 bg-slate-800 rounded-xl text-blue-400">
                  <Phone size={28} />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-1">Call Us</h3>
                  <p className="text-slate-400">+91 99999 99999</p>
                </div>
              </div> */}
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="bg-white text-slate-900 p-8 rounded-2xl shadow-2xl min-h-[500px] flex flex-col justify-center">

            {/* SUCCESS STATE: Shows big checkmark instead of form */}
            {status === 'success' ? (
              <div className="text-center py-10 animate-in fade-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle size={48} className="text-green-600" />
                </div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">Request Received!</h3>
                <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                  Thank you for contacting <strong>TPR CS</strong>. <br />
                  Our tax experts have received your details and will call you shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-8 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              /* NORMAL FORM STATE */
              <>
                <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                      <input
                        name="name" type="text" required
                        value={formData.name}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        onChange={handleChange}
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                      <input
                        name="phone" type="tel" required
                        value={formData.phone}
                        className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                        onChange={handleChange}
                        placeholder="+91 99999..."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input
                      name="email" type="email" required
                      value={formData.email}
                      className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                      onChange={handleChange}
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Service Required</label>
                    <select
                      name="service"
                      value={formData.service}
                      className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      onChange={handleChange}
                    >
                      <option>Personal Tax Filing (ITR)</option>
                      <option>Corporate Tax / GST</option>
                      <option>Bookkeeping</option>
                      <option>New Company Registration</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                    <textarea
                      name="message" rows={4}
                      value={formData.message}
                      className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition"
                      onChange={handleChange}
                      placeholder="Tell us about your requirements..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition flex justify-center items-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Submit Request</>}
                  </button>

                  {status === 'error' && (
                    <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">
                      Something went wrong. Please try again or call us directly.
                    </div>
                  )}
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Testimonials ---
const Testimonials = () => (
  <section className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-slate-900 mb-16">What People Say About Us</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          {
            name: "Ravi Teja",
            role: "Software Engineer",
            text: "I was worried about my tax filing this year due to multiple job switches. TPR CS handled everything smoothly. Highly recommended!"
          },
          {
            name: "Suresh Reddy",
            role: "Business Owner, Guntur",
            text: "They handle my monthly GST filings and annual returns. I can focus on my business knowing my compliance is in safe hands."
          },
          {
            name: "Anitha K",
            role: "Freelancer",
            text: "Best service for freelancers. They helped me save taxes legally and explained the entire process clearly."
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

// --- Footer ---
const Footer = () => (
  <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
      <p>&copy; {new Date().getFullYear()} TPR CS (Tech Professionals Career Solutions). All rights reserved.</p>
      <div className="mt-4 space-x-4">
        <a href="#" className="hover:text-white transition">Privacy Policy</a>
        <a href="#" className="hover:text-white transition">Terms of Service</a>
      </div>
    </div>
  </footer>
);

// --- Main Page Export ---
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}