"use client";
import { useState, useEffect } from 'react';
import {
    CheckCircle, Globe, Calculator, 
    ShieldCheck, Mail, Phone, Zap, Clock,
    PieChart, HardDrive, MapPin, Award, 
    Video, CreditCard, Star, FileText, 
    User, ChevronDown, ChevronUp, Lock,
    TrendingUp, Landmark, BookOpen
} from 'lucide-react';

// --- DYNAMIC DATA CONFIGURATION (All Content is Country-Specific) ---
const TAX_DATA = {
    Canada: {
        name: "Canada",
        apiCode: "ca",
        phoneCode: "+1",
        color: "bg-red-600",
        text: "text-red-600",
        symbol: "$",
        standardDeduction: "$16,452",
        // Hero Data
        benefits: [
            { title: "RRSP Room", desc: "Reduce tax with contributions.", icon: <PieChart /> },
            { title: "FHSA Access", desc: "Tax-free savings for buyers.", icon: <HardDrive /> }
        ],
        // Services Section
        services: [
            { title: "CRA Netfile Certified", desc: "Direct digital filing with the Canada Revenue Agency for instant confirmations.", icon: <ShieldCheck size={32} /> },
            { title: "RRSP Optimization", desc: "We calculate your exact contribution room to maximize your refund.", icon: <TrendingUp size={32} /> },
            { title: "Provincial Credits", desc: "Auto-detection of OTB, GST/HST, and Climate Action incentives.", icon: <MapPin size={32} /> }
        ],
        // Process Section
        process: [
            { title: "Upload T4/T5 Slips", desc: "Snap a photo of your employment and investment slips.", icon: <FileText size={40} /> },
            { title: "CRA Auto-Fill", desc: "We pull existing data directly from your MyCRA account.", icon: <User size={40} /> },
            { title: "Netfile Submit", desc: "Instant transmission to the CRA with confirmation #.", icon: <CheckCircle size={40} /> }
        ],
        // FAQ Section
        faqs: [
            { q: "Can I split pension income?", a: "Yes, we automatically optimize pension splitting with your spouse to lower your bracket." },
            { q: "What about my TFSA?", a: "TFSA earnings are tax-free, but we ensure you haven't over-contributed to avoid penalties." },
            { q: "Is Audit Defense included?", a: "Yes, we handle all correspondence with the CRA on your behalf." }
        ]
    },
    USA: {
        name: "United States",
        apiCode: "us",
        phoneCode: "+1",
        color: "bg-blue-600",
        text: "text-blue-600",
        symbol: "$",
        standardDeduction: "$16,100",
        benefits: [
            { title: "OBBB Credits", desc: "Up to $10k for EV loans.", icon: <Zap /> },
            { title: "HSA Savings", desc: "Tax-free health savings.", icon: <ShieldCheck /> }
        ],
        services: [
            { title: "IRS Audit Defense", desc: "Full representation before the IRS if your 1040 is challenged.", icon: <Landmark size={32} /> },
            { title: "Federal & State", desc: "Unified filing for Federal and all 50 State returns in one go.", icon: <Globe size={32} /> },
            { title: "1099 & W2 Reconciliation", desc: "Complex matching for freelancers and full-time employees.", icon: <FileText size={32} /> }
        ],
        process: [
            { title: "Upload W2/1099", desc: "Import your wage and income statements securely.", icon: <FileText size={40} /> },
            { title: "Deduction Finder", desc: "Our AI scans for itemized deductions vs standard deduction.", icon: <User size={40} /> },
            { title: "E-File Direct", desc: "Submitted directly to the IRS and State agencies.", icon: <CheckCircle size={40} /> }
        ],
        faqs: [
            { q: "Do you handle State taxes?", a: "Yes, we file for all 50 states, including complex multi-state filings." },
            { q: "Can I file an extension?", a: "Yes, we can file Form 4868 instantly to give you until October 15th." },
            { q: "Is my data secure?", a: "We use bank-level AES-256 encryption and are IRS e-file authorized." }
        ]
    },
    India: {
        name: "India",
        apiCode: "in",
        phoneCode: "+91",
        color: "bg-orange-500",
        text: "text-orange-500",
        symbol: "₹",
        standardDeduction: "₹75,000",
        benefits: [
            { title: "87A Rebate", desc: "Zero tax up to ₹12.75L income.", icon: <Zap /> },
            { title: "DTAA Relief", desc: "Avoid double tax on foreign pay.", icon: <Globe /> }
        ],
        services: [
            { title: "CA Assisted Filing", desc: "Every return is verified by a Chartered Accountant before submission.", icon: <Award size={32} /> },
            { title: "80C & 80D Planning", desc: "Maximize deductions via LIC, PPF, ELSS, and Medical Insurance.", icon: <BookOpen size={32} /> },
            { title: "Notice Management", desc: "We handle Section 143(1) intimations and defective return notices.", icon: <ShieldCheck size={32} /> }
        ],
        process: [
            { title: "Upload Form-16", desc: "Just upload your PDF. We extract salary and TDS details.", icon: <FileText size={40} /> },
            { title: "AIS/TIS Check", desc: "We cross-verify data with the Annual Information Statement.", icon: <User size={40} /> },
            { title: "ITR-V Ack", desc: "ITR filed instantly. We also help you e-Verify via Aadhaar.", icon: <CheckCircle size={40} /> }
        ],
        faqs: [
            { q: "Which ITR form should I choose?", a: "Our system automatically selects ITR-1, 2, 3, or 4 based on your income sources." },
            { q: "Can I claim HRA if I live with parents?", a: "Yes, we help you structure rent receipts correctly to claim HRA exemptions." },
            { q: "What is the deadline?", a: "Usually July 31st. Late filing attracts penalties u/s 234F." }
        ]
    }
};

export default function TaxPage() {
    const [country, setCountry] = useState<keyof typeof TAX_DATA>('Canada');
    const [income, setIncome] = useState<number>(75000);
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [openFaq, setOpenFaq] = useState<number | null>(0);
    
    // --- BOOKING STATE ---
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [bookDate, setBookDate] = useState<string | null>(null);
    const [bookTime, setBookTime] = useState<string | null>(null);
    const [bookEmail, setBookEmail] = useState('');
    const [bookState, setBookState] = useState('');
    const [bookStatus, setBookStatus] = useState<'idle' | 'sending' | 'booked' | 'error'>('idle');

    // --- CONTACT FORM STATE ---
    const [pincode, setPincode] = useState('');
    const [stateManual, setStateManual] = useState('');
    const [referral, setReferral] = useState(''); 
    const [phone, setPhone] = useState('');
    const [isLocLoading, setIsLocLoading] = useState(false);

    const active = TAX_DATA[country];

    // --- 1. DYNAMIC DATE GENERATOR ---
    useEffect(() => {
        const generateNextDays = () => {
            const dates = [];
            const today = new Date();
            for (let i = 1; i <= 4; i++) {
                const nextDay = new Date(today);
                nextDay.setDate(today.getDate() + i);
                const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric' };
                dates.push(nextDay.toLocaleDateString('en-US', options));
            }
            setAvailableDates(dates);
        };
        generateNextDays();
    }, []);

    // --- 2. LOCATION AUTO-LOOKUP LOGIC ---
    useEffect(() => {
        setStateManual(''); 
        const fetchLocation = async () => {
            const cleanPin = pincode.replace(/\s/g, "").toUpperCase();
            
            const isCanadaTrigger = country === 'Canada' && cleanPin.length === 3;
            const isUSATrigger = country === 'USA' && cleanPin.length === 5;
            const isIndiaTrigger = country === 'India' && cleanPin.length === 6;

            if (isCanadaTrigger || isUSATrigger || isIndiaTrigger) {
                setIsLocLoading(true);
                try {
                    let url = country === 'India' 
                        ? `https://api.postalpincode.in/pincode/${cleanPin}` 
                        : `https://api.zippopotam.us/${active.apiCode}/${cleanPin}`;
                    
                    const res = await fetch(url);
                    const data = await res.json();
                    
                    if (country === 'India' && data[0].Status === "Success") {
                        setStateManual(data[0].PostOffice[0].State);
                    } else if (country !== 'India' && res.ok) {
                        setStateManual(data.places[0].state);
                    }
                } catch (e) { 
                    console.error("Location lookup failed"); 
                } finally { 
                    setIsLocLoading(false); 
                }
            }
        };
        if (pincode.length >= 3) fetchLocation();
    }, [pincode, country, active.apiCode]);

    // --- 3. HANDLER: BOOKING SUBMISSION ---
    const handleBooking = async () => {
        if (!bookDate || !bookTime || !bookEmail || !bookState) return;
        setBookStatus('sending');
        try {
            const res = await fetch('/api/book-demo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date: bookDate, time: bookTime, email: bookEmail, state: bookState, country: country })
            });
            if (res.ok) setBookStatus('booked');
            else setBookStatus('error');
        } catch (err) { setBookStatus('error'); }
    };

    // --- 4. HANDLER: CONTACT FORM ---
    const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!stateManual) return; 

        setFormStatus('sending');
        
        const formData = new FormData(e.currentTarget);
        const payload = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: `${active.phoneCode} ${phone}`,
            message: formData.get('message'),
            country: country,
            pincode: pincode,
            state: stateManual,
            referral: referral,
        };

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                setFormStatus('success');
                setPhone(''); setPincode(''); setStateManual(''); setReferral('');
                (e.target as HTMLFormElement).reset(); 
            } else { setFormStatus('error'); }
        } catch (err) { setFormStatus('error'); }
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 selection:bg-red-100">
            
            {/* LIVE TICKER */}
            <div className="bg-slate-900 text-white text-xs font-bold py-2 text-center overflow-hidden">
                <div className="animate-pulse flex justify-center items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full inline-block"></span>
                    LIVE: 247 Tax Returns filed in the last hour.
                </div>
            </div>

            {/* NAVIGATION */}
            <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 py-4 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="text-2xl font-black italic tracking-tighter">TaxGlobal</div>
                    <div className="flex bg-slate-100 p-1 rounded-xl overflow-x-auto max-w-full">
                        {(Object.keys(TAX_DATA) as Array<keyof typeof TAX_DATA>).map((c) => (
                            <button key={c} onClick={() => { setCountry(c); setPincode(''); setStateManual(''); setPhone(''); setFormStatus('idle'); }}
                                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${country === c ? `${active.color} text-white shadow-md` : "text-slate-500 hover:text-slate-800"}`}>
                                {c}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12 space-y-32">
                
                {/* HERO SECTION */}
                <section className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 text-center lg:text-left">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${active.color} bg-opacity-10 ${active.text}`}>
                            <Star size={12} /> #1 Rated in {active.name}
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">
                            The {active.name} <br /><span className={active.text}>Tax Advantage.</span>
                        </h1>
                        <p className="text-lg md:text-xl text-slate-500 max-w-lg leading-relaxed mx-auto lg:mx-0">
                            Smart 2026 filing system. Automatically detects your provincial/state benefits based on location.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                            <button onClick={() => document.getElementById('booking')?.scrollIntoView({behavior: 'smooth'})} className={`px-8 py-4 ${active.color} text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-all`}>
                                Book Expert
                            </button>
                            <button onClick={() => document.getElementById('callback')?.scrollIntoView({behavior: 'smooth'})} className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-all">
                                Contact Us
                            </button>
                        </div>
                    </div>
                    {/* CALCULATOR */}
                    <div className="bg-slate-50 p-10 rounded-[3rem] border-2 border-slate-100 shadow-xl">
                        <h3 className="text-xs font-bold text-slate-400 uppercase mb-4 flex items-center gap-2"><Calculator size={18} /> Instant Savings Estimate</h3>
                        <input type="number" value={income} onChange={(e) => setIncome(Number(e.target.value))}
                            className="w-full bg-white border-0 rounded-2xl py-6 px-6 text-4xl font-black shadow-inner outline-none focus:ring-2 focus:ring-red-500" />
                        <div className={`mt-6 p-6 ${active.color} text-white rounded-3xl shadow-lg`}>
                            <p className="opacity-80 text-sm font-bold">Projected {active.name} Refund</p>
                            <p className="text-4xl font-black">{active.symbol}{(income * 0.15).toLocaleString()}</p>
                        </div>
                    </div>
                </section>

                {/* DYNAMIC HOW IT WORKS */}
                <section>
                    <div className="text-center mb-16 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-black tracking-tighter">Zero Friction Filing.</h2>
                        <p className="text-slate-500 text-lg">From chaotic receipts to a filed return in 3 simple steps.</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8 text-center relative">
                        <div className="hidden md:block absolute top-12 left-0 w-full h-1 bg-slate-100 -z-10"></div>
                        
                        {/* Mapped Process Steps */}
                        {active.process.map((step, i) => (
                            <div key={i} className="bg-white p-6 animate-in slide-in-from-bottom-4" style={{ animationDelay: `${i * 100}ms` }}>
                                <div className={`w-24 h-24 mx-auto ${active.color} rounded-full flex items-center justify-center text-white shadow-xl mb-6`}>
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-2">{i + 1}. {step.title}</h3>
                                <p className="text-slate-500 text-sm">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* BOOKING WIDGET */}
                <section id="booking" className="scroll-mt-32 bg-slate-900 text-white rounded-[3rem] p-8 md:p-12 overflow-hidden relative">
                    <div className={`absolute top-0 right-0 w-96 h-96 ${active.color} opacity-20 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2`}></div>

                    <div className="grid lg:grid-cols-2 gap-16 relative z-10">
                        <div className="space-y-6">
                            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">Talk to a Human.</h2>
                            <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
                                Complex situation? Stock options? Foreign income? Schedule a free 15-minute discovery call.
                            </p>
                            <div className="flex items-center gap-4 text-slate-300 font-bold">
                                <Video className={active.text} /> Online Meeting
                                <CreditCard className={active.text} /> Free Demo
                            </div>
                        </div>

                        {/* Booking UI */}
                        <div className="bg-white text-slate-900 rounded-3xl p-6 md:p-8 shadow-2xl">
                            {bookStatus === 'booked' ? (
                                <div className="text-center py-12 animate-in zoom-in">
                                    <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                                    <h3 className="text-2xl font-bold">Booking Confirmed!</h3>
                                    <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-left">
                                        <p className="text-slate-800 font-bold text-sm mb-1">📅 Next Steps:</p>
                                        <p className="text-slate-600 text-sm">
                                            We have received your request. To ensure security, we will email the <b>Meeting Link</b> to <span className="font-bold text-slate-900">{bookEmail}</span> exactly <span className="text-red-600 font-bold">1 hour before</span> your session.
                                        </p>
                                    </div>
                                    <button onClick={() => {setBookStatus('idle'); setBookDate(null); setBookTime(null); setBookEmail(''); setBookState('')}} className="mt-6 text-sm font-bold text-blue-600 underline">Book another slot</button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div>
                                        <label className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2 block">1. Select Date (Available from Tomorrow)</label>
                                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                            {availableDates.map((date) => (
                                                <button key={date} onClick={() => setBookDate(date)} className={`flex-1 py-3 px-4 rounded-xl border-2 font-bold text-sm transition-all whitespace-nowrap ${bookDate === date ? `${active.color} border-transparent text-white` : "border-slate-100 hover:border-slate-300"}`}>{date}</button>
                                            ))}
                                        </div>
                                    </div>
                                    {bookDate && (
                                        <div className="animate-in slide-in-from-top-4 fade-in">
                                            <label className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-2 block">2. Select Time</label>
                                            <div className="grid grid-cols-2 gap-2">
                                                {['10:00 AM', '02:00 PM', '04:30 PM'].map((time) => (
                                                    <button key={time} onClick={() => setBookTime(time)} className={`py-3 rounded-xl border-2 font-bold text-sm transition-all ${bookTime === time ? "bg-slate-900 border-slate-900 text-white" : "border-slate-100 hover:border-slate-300"}`}>{time}</button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {bookDate && bookTime && (
                                        <div className="animate-in slide-in-from-top-4 fade-in space-y-4">
                                            <label className="text-xs font-bold uppercase text-slate-400 tracking-wider block">3. Your Details</label>
                                            <div className="relative"><Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/><input type="email" value={bookEmail} onChange={(e) => setBookEmail(e.target.value)} placeholder="Enter your email address" className="w-full p-4 pl-12 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold outline-none focus:border-slate-900 transition-colors" /></div>
                                            <div className="relative"><MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"/><input type="text" value={bookState} onChange={(e) => setBookState(e.target.value)} placeholder={country === 'India' ? "State (e.g., Delhi, Kerala)" : "State/Province (e.g., Cali, Ontario)"} className="w-full p-4 pl-12 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold outline-none focus:border-slate-900 transition-colors" /></div>
                                        </div>
                                    )}
                                    <button disabled={!bookDate || !bookTime || !bookEmail || !bookState || bookStatus === 'sending'} onClick={handleBooking} className="w-full py-4 bg-slate-900 text-white rounded-xl font-black text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] transition-transform shadow-lg">{bookStatus === 'sending' ? "Registering..." : "Confirm Booking"}</button>
                                    {bookStatus === 'error' && <p className="text-center text-red-500 font-bold text-sm">Something went wrong. Try again.</p>}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* DYNAMIC WHY US SECTION */}
                <section className="py-12">
                    <div className="text-center mb-12">
                         <h2 className="text-3xl font-black tracking-tighter">Why Choose {active.name}?</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Mapped Services */}
                        {active.services.map((service, i) => (
                            <div key={i} className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-shadow animate-in fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                                <div className={`w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 ${active.text}`}>
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                                <p className="text-slate-500 leading-relaxed">{service.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* DYNAMIC FAQ SECTION */}
                <section className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-black text-center mb-8">Common Questions in {active.name}</h2>
                    <div className="space-y-4">
                        {active.faqs.map((item, i) => (
                            <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden">
                                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex justify-between items-center p-6 bg-slate-50 font-bold text-left hover:bg-slate-100 transition-colors">
                                    {item.q}
                                    {openFaq === i ? <ChevronUp size={20}/> : <ChevronDown size={20}/>}
                                </button>
                                {openFaq === i && <div className="p-6 bg-white text-slate-500 leading-relaxed animate-in slide-in-from-top-2">{item.a}</div>}
                            </div>
                        ))}
                    </div>
                </section>

                {/* CONTACT FORM SECTION */}
                <section id="callback" className="scroll-mt-32 bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-2xl grid lg:grid-cols-2 gap-16 relative overflow-hidden">
                    <div className="space-y-8 relative z-10">
                        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter text-slate-900">Expert Review.</h2>
                        <p className="text-lg md:text-xl text-slate-500 leading-relaxed">Request a callback. Your country is locked to <b>{active.name}</b>.</p>
                        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                            <div className="flex items-center gap-4 text-slate-600 font-bold tracking-tight"><Globe className="text-blue-500" size={20} /> Region: {active.name}</div>
                            <div className="flex items-center gap-4 text-slate-600 font-bold tracking-tight"><ShieldCheck className="text-blue-500" size={20} /> AES-256 Bit Encryption</div>
                        </div>

                        {/* Company Contact Display */}
                        <div className="pt-6 border-t border-slate-100">
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2">Support & Inquiries</p>
                            <div className="flex items-center gap-3 text-lg font-bold">
                                <Mail className="text-slate-900" size={24} />
                                <a href="mailto:info@tprcs.com" className="hover:text-blue-600 transition-colors">info@tprcs.com</a>
                            </div>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-6 md:p-10 rounded-[3rem] shadow-inner relative z-10">
                        {formStatus === 'success' ? (
                            <div className="text-center py-16 animate-in fade-in zoom-in">
                                <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
                                <h3 className="text-3xl font-bold">Request Sent!</h3>
                                <p className="text-slate-500 font-medium mt-2">A specialist will reach out shortly.</p>
                                <button onClick={() => setFormStatus('idle')} className="mt-8 text-blue-600 font-bold underline">Send another request</button>
                            </div>
                        ) : (
                            <form onSubmit={handleContactSubmit} className="space-y-5">
                                
                                {/* COUNTRY SELECTOR */}
                                <div className="bg-slate-100 p-2 rounded-xl flex items-center justify-between mb-2">
                                     <span className="text-slate-500 font-bold text-sm ml-3">I am filing for:</span>
                                     <div className="relative">
                                         <select 
                                             value={country}
                                             onChange={(e) => {
                                                 setCountry(e.target.value as keyof typeof TAX_DATA);
                                                 setPincode(''); 
                                                 setStateManual('');
                                             }}
                                             className="bg-white border border-slate-200 text-slate-900 font-bold py-2 px-4 pr-8 rounded-lg outline-none focus:border-slate-900 appearance-none cursor-pointer"
                                         >
                                             {Object.keys(TAX_DATA).map((c) => (
                                                 <option key={c} value={c}>{c}</option>
                                             ))}
                                         </select>
                                         <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
                                     </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <input name="name" required placeholder="Full Name" className="w-full p-5 bg-white rounded-2xl outline-none shadow-sm focus:ring-2 focus:ring-red-500 font-medium" />
                                    <input name="email" type="email" required placeholder="Email Address" className="w-full p-5 bg-white rounded-2xl outline-none shadow-sm focus:ring-2 focus:ring-red-500 font-medium" />
                                </div>

                                <div className="relative group">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-slate-200 pr-3 h-2/3 pointer-events-none">
                                        <Phone size={18} className="text-slate-400" />
                                        <span className="font-bold text-slate-600">{active.phoneCode}</span>
                                    </div>
                                    <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} placeholder="Phone Number" className="w-full p-5 pl-24 bg-white rounded-2xl outline-none shadow-sm focus:ring-2 focus:ring-red-500 font-bold tracking-widest" />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <input 
                                            type="text" 
                                            value={pincode} 
                                            onChange={(e) => setPincode(e.target.value.toUpperCase())} 
                                            placeholder={country === 'India' ? "PIN Code" : "Postal Code"} 
                                            className="w-full p-5 bg-white rounded-2xl outline-none border-2 border-transparent focus:border-red-500 shadow-sm font-bold uppercase" 
                                        />
                                        {isLocLoading && <div className="absolute right-4 top-5 animate-spin text-red-500"><MapPin size={20} /></div>}
                                    </div>
                                    
                                    {/* READ-ONLY STATE */}
                                    <div className="relative">
                                        <input 
                                            value={stateManual} 
                                            readOnly 
                                            placeholder="State (Verify PIN)" 
                                            className="w-full p-5 bg-slate-100 text-slate-500 rounded-2xl outline-none border-2 border-transparent cursor-not-allowed font-bold" 
                                        />
                                        <Lock size={16} className="absolute right-4 top-5 text-slate-400" />
                                    </div>
                                </div>

                                <input 
                                    value={referral}
                                    onChange={(e) => setReferral(e.target.value)}
                                    placeholder="Referral Code (Optional)"
                                    className="w-full p-5 bg-white rounded-2xl outline-none shadow-sm focus:ring-2 focus:ring-red-500 font-medium"
                                />

                                <textarea name="message" required rows={3} placeholder="Tell us about your tax situation..." className="w-full p-5 bg-white rounded-2xl outline-none shadow-sm focus:ring-2 focus:ring-red-500"></textarea>

                                <button 
                                    disabled={formStatus === 'sending' || !stateManual} 
                                    className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black text-xl hover:bg-black transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {formStatus === 'sending' ? "Sending..." : "Request Callback"}
                                </button>
                                {formStatus === 'error' && <p className="text-red-500 text-center font-bold">Failed to send. Please try again.</p>}
                            </form>
                        )}
                    </div>
                </section>
            </main>

            <footer className="py-20 text-center border-t bg-slate-50">
                <div className="max-w-7xl mx-auto px-6 space-y-6">
                    <div className="text-2xl font-black italic tracking-tighter text-slate-300">TaxGlobal</div>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                        © 2026 GlobalTax. Certified Secure Filing Infrastructure.
                    </p>
                    <div className="flex justify-center gap-6 text-sm text-slate-400 font-medium">
                        <a href="#" className="hover:text-slate-600">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-600">Terms of Service</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}