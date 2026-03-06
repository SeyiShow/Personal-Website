import "./globals.css";

export const metadata = {
  title: "Seyi Sorinade | Brand Strategist & Designer Portfolio",
  description: "Official portfolio of Seyi Sorinade - An engineer-turned brand strategist helping individuals and startups articulate their purpose through design and strategy.",
  keywords: ["Brand Strategist", "UI/UX Designer", "Marketing Consultant", "Seyi Sorinade", "Seyi Show", "Personal Branding", "Seyi Sorinade Portfolio"],
  authors: [{ name: "Seyi Sorinade" }],
  creator: "Seyi Sorinade",
  publisher: "Seyi Sorinade",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://oluwaseyi.ng"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Seyi Sorinade | Brand Strategist & Designer",
    description: "Aligning Purpose with Impact—One Story at a Time. Brand strategy, design, and marketing portfolio.",
    url: "https://oluwaseyi.ng",
    siteUrl: "https://oluwaseyi.ng",
    siteName: "Seyi Sorinade Portfolio",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "Seyi Sorinade Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seyi Sorinade | Brand Strategist & Designer",
    description: "Aligning Purpose with Impact—One Story at a Time.",
    images: ["/images/hero.png"],
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
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Seyi Sorinade",
              "url": "https://oluwaseyi.ng",
              "image": "https://oluwaseyi.ng/images/hero.png",
              "jobTitle": "Brand Strategist & Designer",
              "description": "An engineer-turned brand strategist helping individuals and startups articulate their purpose purposefully.",
              "sameAs": [
                "https://www.linkedin.com/in/oluwaseyi-sorinade-a519b81a0/",
                "https://www.instagram.com/oluwaseyi.so/",
                "https://x.com/ThatVerySeyi"
              ]
            }),
          }}
        />
        {children}
      </body>
    </html>
  );
}
