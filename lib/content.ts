/**
 * Central content store for Cogniskills website.
 * All static copy lives here. Components import from this file.
 * Source of truth: COGNIGYM_REFERENCE.md
 */

// Hero Section

export const heroContent = {
    eyebrow: 'Cognigym Brain Training · Lagos, Nigeria',
    headline: 'We train the brain,',
    headlineAccent: 'not just the subject',
    description:
        'Cogniskills uses the Cognigym program, a structured, evidence-based system that builds the underlying cognitive skills children need to read, focus, remember, and learn. Not tutoring. Brain training.',
    primaryCta: { label: 'Book assessment', href: '/booking' },
    secondaryCta: { label: 'Take brain test', href: '/brain-test' },
    stats: [
        { value: '20+', label: 'Years experience' },
        { value: '300+', label: 'Students helped' },
        { value: '8', label: 'Conditions treated' },
        { value: '95%', label: 'Parent satisfaction' },
    ],
    overlayStats: [
        { value: '20+', label: 'Years of excellence' },
        { value: '300+', label: 'Families transformed' },
    ],
    images: [
        {
            src: 'https://res.cloudinary.com/dqwfjxn8g/image/upload/v1776381482/cognitive_kids_1_qlg5xu.jpg',
            alt: 'Children in a Cognigym training session',
        },
        {
            src: 'https://res.cloudinary.com/dqwfjxn8g/image/upload/q_auto/f_auto/v1776381460/front-view-smiley-girl-making-puzzle_blmt0y.jpg',
            alt: 'Girl working on a cognitive puzzle activity',
        },
        {
            src: 'https://res.cloudinary.com/dqwfjxn8g/image/upload/q_auto/f_auto/v1776381449/boy-doing-occupational-therapy-session_wtaz1e.jpg',
            alt: 'Boy in an occupational therapy session',
        },
    ],
};

// Problem / Solution Section

export const problemSolutionContent = {
    problemsHeading: 'Is your child facing these?',
    solutionsHeading: 'The Cognigym difference',
    problems: [
        'Struggles to read or spell despite trying hard',
        'Cannot focus or stay on task at school',
        'Falling behind peers academically',
        'Growing frustration and loss of confidence',
        "Teachers say they're not trying enough",
        'Tutoring helps temporarily but nothing sticks',
    ],
    solutions: [
        'Full cognitive profile to map the root cause',
        'Cognigym brain training, not subject tutoring',
        'Trains auditory processing, memory, attention and more',
        'Measurable improvement tracked every session',
        'Better reading, focus, confidence, and self-image',
        'Regular progress updates for parents and teachers',
    ],
};

// Programs Section

export const programsSectionContent = {
    eyebrow: 'What We Treat',
    heading: 'A Cognigym program for every challenge',
    description:
        "Each program targets the specific cognitive skills behind your child's difficulty. Not the symptoms, but the root cause.",
};

// How It Works Section

export const howItWorksContent = {
    eyebrow: 'How It Works',
    heading: 'From assessment to transformation',
    description:
        "The Cognigym process is structured, measurable, and built around each child's unique cognitive profile.",
    steps: [
        {
            number: '1',
            title: 'Cognitive assessment',
            description:
                "We map your child's full cognitive profile: auditory processing, memory, attention, processing speed, and more.",
            image: '/how%20it%20works/step1.jpg',
            imageAlt: 'Child during a cognitive assessment session',
        },
        {
            number: '2',
            title: 'Cognigym program',
            description:
                "A personalised Cognigym training plan built around your child's specific cognitive gaps.",
            image: '/how%20it%20works/step2.jpg',
            imageAlt: 'Specialist building a personalised training plan',
        },
        {
            number: '3',
            title: 'Structured sessions',
            description:
                'One-on-one sessions using the Cognigym toolkit. Metronome-paced, intensive, and measurable.',
            image: '/how%20it%20works/step3.jpg',
            imageAlt: 'Child in a one-on-one Cognigym training session',
        },
        {
            number: '4',
            title: 'Track and report',
            description:
                'Regular progress reviews with clear metrics shared with parents and teachers.',
            image: '/how%20it%20works/step4.jpg',
            imageAlt: 'Parent reviewing child progress report with specialist',
        },
    ],
};

// Testimonials Section

export const testimonialsSectionContent = {
    eyebrow: 'Success Stories',
    heading: 'What parents are saying',
};

// CTA Section

export const ctaContent = {
    heading: "Ready to find out what's really holding your child back?",
    description:
        "Book a cognitive skill assessment and get a full picture of your child's brain skills. Then let the Cognigym program do the rest.",
    primaryCta: { label: 'Book assessment', href: '/booking' },
    secondaryCta: { label: 'Speak to a specialist', href: '/contact' },
};

// About Page

export const aboutContent = {
    hero: {
        eyebrow: 'Our Story',
        heading: 'Two decades of transforming how children learn',
        paragraphs: [
            'Cogniskills was founded on the belief that every child can learn. Sometimes the brain just needs the right training to unlock that ability. Since 2004, our certified specialists have helped hundreds of Nigerian families find hope and lasting results.',
            'We use the Cognigym program, a structured, evidence-based cognitive training system developed by Anayo Ezennia. It trains the underlying brain skills children need to learn: auditory processing, working memory, attention, processing speed, and more.',
        ],
        cta: { label: 'Meet our team', href: '/about#team' },
    },
    stats: [
        { value: 20, suffix: '+', label: 'Years in practice' },
        { value: 300, suffix: '+', label: 'Students trained' },
        { value: 8, suffix: '+', label: 'Conditions treated' },
        { value: 95, suffix: '%', label: 'Parent satisfaction' },
    ],
    approach: {
        eyebrow: 'Our Approach',
        heading: 'How we make a difference',
        pillars: [
            {
                title: 'Science-based methods',
                description:
                    'The Cognigym program is built on proven neuroscience and cognitive psychology. Every procedure has a defined purpose and measurable passing criteria.',
            },
            {
                title: 'Personalised training',
                description:
                    "Every child gets a custom program designed around their unique cognitive profile. We train the specific skills that are holding your child back.",
            },
            {
                title: 'Measurable progress',
                description:
                    'Regular assessments track improvement in reading, focus, memory, and processing speed. Parents receive clear reports at every stage.',
            },
            {
                title: 'Family partnership',
                description:
                    'We work closely with parents and teachers to reinforce skills at home and school, so progress continues between sessions.',
            },
        ],
    },
    whyChoose: {
        eyebrow: 'Why Choose Us',
        heading: "Nigeria's trusted partner in learning transformation",
        description:
            "We don't tutor subjects. We train the brain to learn better. Our evidence-based approach has helped hundreds of Nigerian families unlock their children's true potential.",
        reasons: [
            'Over 20 years of specialised experience in cognitive training',
            'Certified specialists trained in the Cognigym methodology',
            'Proven track record with 300+ successful student transformations',
            "Personalised programs tailored to each child's unique cognitive profile",
            'Regular progress tracking with measurable, reportable results',
            'Strong partnership with parents and schools throughout the program',
            'Comprehensive support for multiple learning difficulties',
            '95% parent satisfaction rate',
        ],
    },
    team: {
        eyebrow: 'Our Specialists',
        heading: 'The team behind the results',
    },
};

// Programs Page

export const programsPageContent = {
    header: {
        label: 'OUR PROGRAMS',
        title: 'A Cognigym program for every child',
        description:
            "Each program is built around the specific cognitive skills behind your child's difficulty. We train the brain, not just the subject.",
    },
};

// Stories Page

export const storiesPageContent = {
    header: {
        label: 'SUCCESS STORIES',
        title: 'Real families, real results',
        description:
            'Hear from parents whose children have been transformed through the Cognigym program at Cogniskills.',
    },
};

// Booking Page

export const bookingPageContent = {
    header: {
        label: 'BOOK A SESSION',
        title: "Start your child's transformation",
        description:
            "Schedule a comprehensive cognitive assessment. Our specialists will map your child's cognitive profile and build a personalised Cognigym training plan.",
    },
};

// Brain Test Page

export const brainTestPageContent = {
    header: {
        label: 'FREE CHILD SCREENING',
        title: 'Is your child struggling to learn?',
        description:
            "Answer 10 quick questions about your child's behaviour and learning. We'll identify which cognitive skills may need support and what to do next.",
    },
};

// Contact Page

export const contactPageContent = {
    header: {
        label: 'GET IN TOUCH',
        title: "Let's talk about your child",
        description:
            'One of our specialists will reach out within 24 hours to discuss how we can help.',
    },
};

// Footer

export const footerContent = {
    tagline:
        'Cogniskills Learning Enhancement Center uses the Cognigym program to train the underlying brain skills children need to read, focus, and learn.',
    quickLinks: [
        { label: 'About Us', href: '/about' },
        { label: 'Our Programs', href: '/programs' },
        { label: 'Success Stories', href: '/stories' },
        { label: 'Contact Us', href: '/contact' },
    ],
    serviceLinks: [
        { label: 'Dyslexia', href: '/services/dyslexia' },
        { label: 'ADHD', href: '/services/adhd' },
        { label: 'Autism Spectrum', href: '/services/autism' },
        { label: 'Speech Disorders', href: '/services/speech' },
        { label: 'Dyspraxia', href: '/services/dyspraxia' },
        { label: 'Learning Delays', href: '/services/learning-delays' },
    ],
};

// Site-wide metadata

export const siteContent = {
    name: 'Cogniskills',
    fullName: 'Cogniskills Learning Enhancement Center',
    tagline: 'We train the brain, not just the subject.',
    location: 'Lagos, Nigeria',
    address: '25 Oladimeji Alo Street, Lekki Phase 1, Lagos',
    phone: '0803 858 6878',
    phone2: '0901 181 1088',
    email: 'cogniskills@gmail.com',
    hours: 'Mon to Fri, 8am to 6pm',
    url: 'https://cogniskillsleh.com',
    whatsapp: 'https://wa.me/2348000000000',
};

// Cognitive Skills (from Cognigym reference)

export const cognitiveSkills = [
    { name: 'Auditory Processing', definition: 'Process sounds; hear difference, order, and number of sounds in words' },
    { name: 'Working Memory', definition: 'Retain information while processing or using it' },
    { name: 'Processing Speed', definition: 'Speed at which the brain processes information' },
    { name: 'Sustained Attention', definition: 'Ability to stay on task' },
    { name: 'Divided Attention', definition: 'Handle two or more tasks simultaneously' },
    { name: 'Visualization', definition: 'Create mental images or pictures' },
    { name: 'Logic and Reasoning', definition: 'Reason, plan, and think' },
    { name: 'Sensory-Motor Integration', definition: 'Sensory skills working with motor skills (eye-hand coordination)' },
];
