'use client';

import { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react';

export default function BookingForm() {
    const [formData, setFormData] = useState({
        parentName: '',
        phone: '',
        email: '',
        childName: '',
        childAge: '',
        program: '',
        preferredDate: '',
        preferredTime: '',
        message: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Booking submitted:', formData);
        // Handle booking submission
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section className="py-16 lg:py-24 bg-gradient-to-br from-orange-50 via-white to-orange-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-3">
                            Book your assessment session
                        </h2>
                        <p className="text-gray-600">
                            Fill out the form below and our team will contact you within 24 hours to confirm your appointment.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Parent Information */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <User className="w-5 h-5 text-orange-600" />
                                Parent/Guardian Information
                            </h3>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="parentName" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="parentName"
                                        name="parentName"
                                        value={formData.parentName}
                                        onChange={handleChange}
                                        placeholder="e.g. Adebisi Okafor"
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
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
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                        required
                                    />
                                </div>
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
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Child Information */}
                        <div className="space-y-6 pt-6 border-t border-gray-200">
                            <h3 className="text-xl font-bold text-gray-900">
                                Child Information
                            </h3>

                            <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="childName" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Child's Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="childName"
                                        name="childName"
                                        value={formData.childName}
                                        onChange={handleChange}
                                        placeholder="Child's full name"
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
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
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-white"
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
                            </div>

                            <div>
                                <label htmlFor="program" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Program of Interest *
                                </label>
                                <select
                                    id="program"
                                    name="program"
                                    value={formData.program}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-white"
                                    required
                                >
                                    <option value="">Select a program</option>
                                    <option value="dyslexia">Dyslexia</option>
                                    <option value="adhd">ADHD</option>
                                    <option value="autism">Autism Spectrum</option>
                                    <option value="speech">Speech Disorders</option>
                                    <option value="dyspraxia">Dyspraxia</option>
                                    <option value="learning-delays">Learning Delays</option>
                                    <option value="assessment">General Assessment</option>
                                </select>
                            </div>
                        </div>

                        {/* Scheduling */}
                        <div className="space-y-6 pt-6 border-t border-gray-200">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-orange-600" />
                                Preferred Schedule
                            </h3>

                            <div className="grid sm:grid-cols-2 gap-6">
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
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
                                        required
                                    />
                                </div>

                                <div>
                                    <label htmlFor="preferredTime" className="block text-sm font-semibold text-gray-700 mb-2">
                                        Preferred Time *
                                    </label>
                                    <select
                                        id="preferredTime"
                                        name="preferredTime"
                                        value={formData.preferredTime}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all bg-white"
                                        required
                                    >
                                        <option value="">Select time</option>
                                        <option value="morning">Morning (8am - 12pm)</option>
                                        <option value="afternoon">Afternoon (12pm - 4pm)</option>
                                        <option value="evening">Evening (4pm - 6pm)</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Additional Information */}
                        <div>
                            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                Additional Information (Optional)
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Tell us about your child's specific challenges or any questions you have..."
                                rows={4}
                                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all shadow-lg hover:shadow-xl"
                        >
                            Confirm Booking
                        </button>

                        <p className="text-sm text-gray-600 text-center">
                            By submitting this form, you agree to be contacted by our team regarding your booking.
                        </p>
                    </form>
                </div>
            </div>
        </section>
    );
}
