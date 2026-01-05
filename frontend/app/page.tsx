"use client";
import { useState, useEffect } from 'react';
import {
    CheckCircle, Globe, FileText, Calculator, TrendingUp,
    ArrowRight, ShieldCheck, Landmark, DollarSign,
    Mail, Phone, Send, Zap, Lock, Server, Clock,
    PieChart, HardDrive, MapPin, Shield, Gift, Hash
} from 'lucide-react';

const TAX_DATA = {
    Canada: {
        name: "Canada",
        apiCode: "ca",
        phoneCode: "+1",
        color: "bg-red-600",
        text: "text-red-600",
        symbol: "$",
        standardDeduction: "$16,452",
        timeline: ["Feb 24: Netfile Opens", "Apr 30: Deadline"],
        benefits: [
            { title: "RRSP Room", desc: "Reduce tax with contributions.", icon: <PieChart /> },
            { title: "FHSA Access", desc: "Tax-free savings for buyers.", icon: <HardDrive /> }
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
        timeline: ["Jan 20: Filing Opens", "Apr 15: Deadline"],
        benefits: [
            { title: "OBBB Credits", desc: "Up to $10k for EV loans.", icon: <Zap /> },
            { title: "HSA Savings", desc: "Tax-free health savings.", icon: <ShieldCheck /> }
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
        timeline: ["Apr 01: FY Starts", "July 31: ITR Deadline"],
        benefits: [
            { title: "87A Rebate", desc: "Zero tax up to ₹12.75L income.", icon: <Zap /> },
            { title: "DTAA Relief", desc: "Avoid double tax on foreign pay.", icon: <Globe /> }
        ]
    }
};

export default function TaxPage() {
    const [country, setCountry] = useState<keyof typeof TAX_DATA>('Canada');
    const [income, setIncome] = useState<number>(75000);
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

    const [pincode, setPincode] = useState('');
    const [stateManual, setStateManual] = useState('');
    const [referral, setReferral] = useState('');
    const [phone, setPhone] = useState('');
    const [isLocLoading, setIsLocLoading] = useState(false);

    const active = TAX_DATA[country];

    useEffect(() => {
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
                } catch (e) { console.error("Location lookup failed"); }
                finally { setIsLocLoading(false); }
            }
        };
        fetchLocation();
    }, [pincode, country]);

    const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('sending');
        const formData = new FormData(e.currentTarget);

        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: `${active.phoneCode} ${phone}`, // Combines country code with number
            message: formData.get('message'),
            country: country,
            pincode: pincode,
            state: stateManual,
            referral: referral,
            subject: formData.get('subject')
        };

        try {
            const res = await fetch('https://rajabackend.srikrishnatechhub.com/request-callback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (res.ok) setFormStatus('success'); else setFormStatus('error');
        } catch { setFormStatus('error'); }
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 selection:bg-red-100">
            <nav className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 py-4 px-6">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="text-2xl font-black italic tracking-tighter">TaxGlobal.ai</div>
                    <div className="flex bg-slate-100 p-1 rounded-xl">
                        {Object.keys(TAX_DATA).map((c) => (
                            <button key={c} onClick={() => { setCountry(c as any); setPincode(''); setStateManual(''); setPhone(''); }}
                                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${country === c ? `${active.color} text-white shadow-md` : "text-slate-500 hover:text-slate-800"}`}>
                                {c}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12 space-y-24">

                {/* Hero & Estimate */}
                <section className="grid lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <h1 className="text-7xl font-black leading-tight tracking-tighter">
                            The {active.name} <br /><span className={active.text}>Tax Advantage.</span>
                        </h1>
                        <p className="text-xl text-slate-500 max-w-lg leading-relaxed">Smart 2026 filing system. Automatically detects your provincial/state benefits based on location.</p>
                    </div>
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

                {/* Feature Map */}
                <section className="grid md:grid-cols-3 gap-8">
                    <div className="bg-slate-900 text-white p-10 rounded-[2.5rem] flex flex-col justify-between">
                        <h3 className="text-3xl font-bold italic">Secure. Fast. Trusted.</h3>
                        <p className="text-slate-400">Multi-factor encryption for your {active.name} tax documents.</p>
                    </div>
                    {active.benefits.map((b, i) => (
                        <div key={i} className="bg-white p-10 rounded-[2.5rem] border-2 border-slate-50 shadow-sm hover:shadow-lg transition-all">
                            <div className={`${active.text} mb-6 p-4 bg-slate-50 rounded-2xl w-fit`}>{b.icon}</div>
                            <h4 className="text-2xl font-bold mb-2">{b.title}</h4>
                            <p className="text-slate-500 leading-relaxed">{b.desc}</p>
                        </div>
                    ))}
                </section>

                {/* Dynamic Contact Form */}
                <section id="callback" className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-2xl grid lg:grid-cols-2 gap-16 relative overflow-hidden">
                    <div className="space-y-8 relative z-10">
                        <h2 className="text-5xl font-black italic tracking-tighter text-slate-900">Expert Review.</h2>
                        <p className="text-xl text-slate-500 leading-relaxed">Request a callback. Your country is locked to <b>{active.name}</b>.</p>
                        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100 space-y-4">
                            <div className="flex items-center gap-4 text-slate-600 font-bold tracking-tight"><Globe className="text-blue-500" size={20} /> Region: {active.name}</div>
                            <div className="flex items-center gap-4 text-slate-600 font-bold tracking-tight"><ShieldCheck className="text-blue-500" size={20} /> AES-256 Bit Encryption</div>
                        </div>
                    </div>

                    <div className="bg-slate-50 p-10 rounded-[3rem] shadow-inner relative z-10">
                        {formStatus === 'success' ? (
                            <div className="text-center py-16 animate-in fade-in zoom-in">
                                <CheckCircle size={80} className="text-green-500 mx-auto mb-6" />
                                <h3 className="text-3xl font-bold">Request Sent!</h3>
                                <p className="text-slate-500 font-medium mt-2">A specialist for {stateManual || "your region"} will call you at {active.phoneCode} {phone}.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleContactSubmit} className="space-y-5">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <input name="name" required placeholder="Full Name" className="w-full p-5 bg-white rounded-2xl outline-none shadow-sm focus:ring-2 focus:ring-red-500 font-medium" />
                                    <input name="email" type="email" required placeholder="Email Address" className="w-full p-5 bg-white rounded-2xl outline-none shadow-sm focus:ring-2 focus:ring-red-500 font-medium" />
                                </div>

                                {/* Mandatory Phone Field with Auto Country Code */}
                                <div className="relative group">
                                    <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center gap-2 border-r border-slate-200 pr-3 h-2/3 pointer-events-none">
                                        <Phone size={18} className="text-slate-400" />
                                        <span className="font-bold text-slate-600">{active.phoneCode}</span>
                                    </div>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))} // Numeric only
                                        placeholder="Phone Number (Required)"
                                        className="w-full p-5 pl-24 bg-white rounded-2xl outline-none shadow-sm focus:ring-2 focus:ring-red-500 font-bold tracking-widest"
                                    />
                                </div>

                                {/* Location Input Group */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={pincode}
                                            onChange={(e) => setPincode(e.target.value.toUpperCase())}
                                            placeholder={country === 'India' ? "PIN Code" : country === 'Canada' ? "3-Char Postal" : "Zip Code"}
                                            className="w-full p-5 bg-white rounded-2xl outline-none border-2 border-transparent focus:border-red-500 shadow-sm font-bold uppercase"
                                        />
                                        {isLocLoading && <div className="absolute right-4 top-5 animate-spin text-red-500"><MapPin size={20} /></div>}
                                    </div>
                                    <input
                                        value={stateManual}
                                        onChange={(e) => setStateManual(e.target.value)}
                                        placeholder="State/Province"
                                        className="w-full p-5 bg-white rounded-2xl outline-none border-2 border-transparent focus:border-red-500 shadow-sm font-bold"
                                    />
                                </div>

                                {/* Fixed Country & Optional Referral */}
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    <div className="relative">
                                        <label className="absolute -top-6 left-2 text-[10px] font-bold text-slate-400 uppercase">Selected Country</label>
                                        <input
                                            readOnly
                                            value={active.name}
                                            className="w-full p-5 bg-slate-200/50 rounded-2xl outline-none text-slate-500 font-bold cursor-not-allowed border-2 border-slate-100"
                                        />
                                    </div>
                                    <div className="relative">
                                        <label className="absolute -top-6 left-2 text-[10px] font-bold text-slate-400 uppercase italic">Referral (Optional)</label>
                                        <input
                                            name="referral"
                                            value={referral}
                                            onChange={(e) => setReferral(e.target.value)}
                                            placeholder="Code"
                                            className="w-full p-5 bg-white rounded-2xl outline-none border-2 border-dashed border-slate-200 shadow-sm font-medium"
                                        />
                                    </div>
                                </div>

                                <textarea name="message" required rows={3} placeholder="Tell us about your tax situation..." className="w-full p-5 bg-white rounded-2xl outline-none shadow-sm focus:ring-2 focus:ring-red-500"></textarea>

                                <button disabled={formStatus === 'sending'} className="w-full py-6 bg-slate-900 text-white rounded-2xl font-black text-xl hover:bg-black transition-all shadow-xl disabled:opacity-50">
                                    {formStatus === 'sending' ? "Syncing..." : "Request Callback"}
                                </button>
                            </form>
                        )}
                    </div>
                </section>
            </main>

            <footer className="py-20 text-center border-t bg-slate-50 text-slate-400 font-bold uppercase tracking-widest text-xs">
                © 2026 GlobalTax AI. Certified Secure Filing Infrastructure.
            </footer>
        </div>
    );
}