'use client';

import { MapPin, Mail, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function ContactSection() {
    const [formData, setFormData] = useState({
        parentName: '',
        phone: '',
        email: '',
        childAge: '',
        condition: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-50 via-amber-50 to-orange-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Left - Form */}
                    <div>
                        <p className="text-orange-600 font-semibold tracking-wide uppercase text-sm mb-3">
                            GET IN TOUCH
                        </p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Let's talk about your child
                        </h2>
                        <p className="text-gray-600 mb-8">
                            One of our specialists will reach out within 24 hours.
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-2">
                                    Parent / guardian name
                                </label>
                                <input
                                    type="text"
                                    id="parentName"
                                    name="parentName"
                                    value={formData.parentName}
                                    onChange={handleChange}
                                    placeholder="e.g. Adebisi Okafor"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+234 800 000 0000"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="childAge" className="block text-sm font-medium text-gray-700 mb-2">
                                    Child's age
                                </label>
                                <select
                                    id="childAge"
                                    name="childAge"
                                    value={formData.childAge}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-white"
                                    required
                                >
                                    <option value="">Select age range</option>
                                    <option value="3-5">3-5 years</option>
                                    <option value="6-8">6-8 years</option>
                                    <option value="9-12">9-12 years</option>
                                    <option value="13-16">13-16 years</option>
                                    <option value="17+">17+ years</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="condition" className="block text-sm font-medium text-gray-700 mb-2">
                                    Main concern
                                </label>
                                <select
                                    id="condition"
                                    name="condition"
                                    value={formData.condition}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-white"
                                    required
                                >
                                    <option value="">Select condition</option>
                                    <option value="dyslexia">Dyslexia</option>
                                    <option value="adhd">ADHD</option>
                                    <option value="autism">Autism spectrum</option>
                                    <option value="speech">Speech disorders</option>
                                    <option value="dyspraxia">Dyspraxia</option>
                                    <option value="learning-delays">Learning delays</option>
                                    <option value="other">Other / Not sure</option>
                                </select>
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                    Tell us more (optional)
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Describe what you've noticed..."
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                                />
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-6 text-lg font-semibold"
                            >
                                Request assessment
                            </Button>
                        </form>
                    </div>

                    {/* Right - Contact Info */}
                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <MapPin className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold tracking-wide uppercase mb-1">
                                        LOCATION
                                    </p>
                                    <p className="text-gray-900 font-medium">
                                        25 Oladimeji Alo Street, Lekki Phase 1, Lagos
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Mail className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold tracking-wide uppercase mb-1">
                                        EMAIL
                                    </p>
                                    <a
                                        href="mailto:cogniskills@gmail.com"
                                        className="text-gray-900 font-medium hover:text-orange-600 transition-colors"
                                    >
                                        cogniskills@gmail.com
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Phone className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold tracking-wide uppercase mb-1">
                                        PHONE
                                    </p>
                                    <a
                                        href="tel:+2348038586878"
                                        className="text-gray-900 font-medium hover:text-orange-600 transition-colors block"
                                    >
                                        0803 858 6878
                                    </a>
                                    <a
                                        href="tel:+2349011811088"
                                        className="text-gray-900 font-medium hover:text-orange-600 transition-colors block"
                                    >
                                        0901 181 1088
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Clock className="w-5 h-5 text-orange-600" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 font-semibold tracking-wide uppercase mb-1">
                                        HOURS
                                    </p>
                                    <p className="text-gray-900 font-medium">
                                        Mon–Fri, 8am–6pm
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Button
                            size="lg"
                            className="w-full bg-green-500 hover:bg-green-600 text-white py-6 text-lg font-semibold flex items-center justify-center gap-2"
                            asChild
                        >
                            <a href="https://wa.me/2348000000000" target="_blank" rel="noopener noreferrer">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                                Chat on Whatsapp
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
