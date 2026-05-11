import type { Metadata } from "next";
import { Fredoka, Inter } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-fredoka",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const BASE_URL = "https://cogniskillsleh.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Cogniskills | Cognitive Skills Training for Children in Lagos, Nigeria",
    template: "%s | Cogniskills",
  },
  description:
    "Cogniskills is Lagos' leading cognitive skills training centre for children with dyslexia, ADHD, autism, dyspraxia, and learning delays. Scientifically grounded brain training that transforms learning.",
  keywords: [
    "cognitive skills training Lagos",
    "children learning difficulties Nigeria",
    "dyslexia treatment Lagos",
    "ADHD support children Nigeria",
    "autism learning centre Lagos",
    "brain training children",
    "learning delays Nigeria",
    "dyspraxia therapy Lagos",
    "speech therapy children Nigeria",
    "cognitive assessment children",
    "Cogniskills Nigeria",
  ],
  authors: [{ name: "Cogniskills Learning Enhancement Center" }],
  creator: "Cogniskills",
  publisher: "Cogniskills",
  category: "Education",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: BASE_URL,
    siteName: "Cogniskills",
    title: "Cogniskills | Cognitive Skills Training for Children in Lagos",
    description:
      "Scientifically grounded cognitive training for children with dyslexia, ADHD, autism, and learning delays. We train the brain, not just the subject.",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 800,
        alt: "Cogniskills - Cognitive Skills Training for Children",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cogniskills | Cognitive Skills Training for Children in Lagos",
    description:
      "Scientifically grounded cognitive training for children with dyslexia, ADHD, autism, and learning delays.",
    images: ["/logo.png"],
    creator: "@cogniskills",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: BASE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fredoka.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="theme-color" content="#ea580c" />
        {/* Local Business Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "Cogniskills Learning Enhancement Center",
              url: BASE_URL,
              logo: `${BASE_URL}/logo.png`,
              image: `${BASE_URL}/logo.png`,
              description:
                "Lagos' leading cognitive skills training centre for children with dyslexia, ADHD, autism, dyspraxia, and learning delays.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lagos",
                addressCountry: "NG",
              },
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "customer service",
                availableLanguage: "English",
              },
              sameAs: [],
              offers: {
                "@type": "Offer",
                description: "Cognitive skills training programs for children",
              },
            }),
          }}
        />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
