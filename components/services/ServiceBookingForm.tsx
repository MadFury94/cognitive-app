'use client';

import { useState } from 'react';
import { Calendar, Phone, Mail, User } from 'lucide-react';

interface ServiceBookingFormProps {
    serviceName: string;
    serviceSlug: string;
}

export default function ServiceBookingForm({ serviceName, serviceSlug }: ServiceBookingFormProps) {
    const [formData, setFormData] = useState({
        parentName: '',
        phone: '',
        email: '',
        childAge: '',
        preferredDate: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Service booking:', { ...formData, service: serviceSlug });
        // Handle booking submission
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8 sticky top-24">
            <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Book {serviceName} Assessment
                </h3>
                <p className="text-sm text-gray-600">
                    Fill out the form and we'll contact you within 24 hours
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="parentName" className="block text-sm font-semibold text-gray-700 mb-2">
                        Parent/Guardian Name *
                    </label>
                    <input
                        type="text"
                        id="parentName"
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number *
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+234 800 000 0000"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address *
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="childAge" className="block text-sm font-semibold text-gray-700 mb-2">
                        Child's Age *
                    </label>
                    <select
                        id="childAge"
                        name="childAge"
                        value={formData.childAge}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-white text-sm"
                        required
                    >
                        <option value="">Select age</option>
                        <option value="3-5">3-5 years</option>
                        <option value="6-8">6-8 years</option>
                        <option value="9-12">9-12 years</option>
                        <option value="13-16">13-16 years</option>
                        <option value="17+">17+ years</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="preferredDate" className="block text-sm font-semibold text-gray-700 mb-2">
                        Preferred Date *
                    </label>
                    <input
                        type="date"
                        id="preferredDate"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all text-sm"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Additional Notes
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your concerns..."
                        rows={3}
                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none text-sm"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                    Request Assessment
                </button>

                <p className="text-xs text-gray-600 text-center">
                    We'll contact you to confirm your appointment
                </p>
            </form>
        </div>
    );
}
