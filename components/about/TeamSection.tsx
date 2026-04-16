import Image from 'next/image';

export default function TeamSection() {
    const teamMembers = [
        {
            name: 'Dr. Ngozi Adeyemi',
            role: 'Cognitive Director · 20 yrs',
            initials: 'NA',
            color: 'bg-orange-100',
            textColor: 'text-orange-700',
            image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
        },
        {
            name: 'Mr. Tunde Balogun',
            role: 'Lead Dyslexia Specialist',
            initials: 'TB',
            color: 'bg-blue-100',
            textColor: 'text-blue-700',
            image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop',
        },
        {
            name: 'Mrs. Chidinma Eze',
            role: 'ADHD & Autism Therapist',
            initials: 'CE',
            color: 'bg-orange-100',
            textColor: 'text-orange-700',
            image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
        },
    ];

    return (
        <section className="py-16 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12 lg:mb-16">
                    <p className="text-orange-600 font-semibold tracking-wide uppercase text-sm mb-3">
                        Our Specialists
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                        The team behind the results
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="group"
                        >
                            {/* Image/Avatar */}
                            <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-gray-100 to-gray-50">
                                <div className={`absolute inset-0 ${member.color} flex items-center justify-center`}>
                                    <span className={`text-6xl font-bold ${member.textColor}`}>
                                        {member.initials}
                                    </span>
                                </div>
                                {/* Uncomment when you have actual images */}
                                {/* <Image
                                    src={member.image}
                                    alt={member.name}
                                    fill
                                    className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                /> */}
                            </div>

                            {/* Info */}
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                    {member.name}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {member.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
