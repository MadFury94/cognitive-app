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

    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError('');

        try {
            const res = await fetch('/api/booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    parentName: formData.parentName,
                    phone: formData.phone,
                    email: formData.email,
                    childName: '',
                    childAge: formData.childAge,
                    program: serviceSlug,
                    preferredDate: formData.preferredDate,
                    message: formData.message,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setSubmitted(true);
            } else {
                setSubmitError(data.error || 'Something went wrong. Please try again.');
            }
        } catch {
            setSubmitError('Connection error. Please try again.');
        }

        setSubmitting(false);
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
                    Fill out the form and we&apos;ll contact you within 24 hours
                </p>
            </div>

            {submitted ? (
                <div className="text-center py-8">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Request received!</h4>
                    <p className="text-sm text-gray-600">We&apos;ll contact you within 24 hours to confirm your appointment.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    {submitError && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                            {submitError}
                        </div>
                    )}
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
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-sm"
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
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-sm"
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
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-sm"
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
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all bg-white text-sm"
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
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-sm"
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
                            className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all resize-none text-sm"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:opacity-50"
                    >
                        {submitting ? 'Sending...' : 'Request Assessment'}
                    </button>

                    <p className="text-xs text-gray-600 text-center">
                        We&apos;ll contact you to confirm your appointment
                    </p>
                </form>
            )}
        </div>
    );
}
