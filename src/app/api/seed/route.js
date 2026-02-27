import { NextResponse } from "next/server";
import { getCollection } from "@/lib/db";

const portfolioSeed = [
    {
        title: "Témìlóràn — Brand Identity",
        description:
            "A complete brand identity for Témìlóràn — a luxury beauty and lifestyle brand. From logo design to packaging, every element reflects elegance and cultural richness.",
        image: "/images/port1.png",
        category: "Personal Brands",
        tags: ["BRANDING", "SOCIALS"],
        link: "https://dribbble.com/shots/temiloran-branding",
        order: 1,
    },
    {
        title: "5TH Events — Valentine Campaign",
        description:
            "A vibrant Valentine's Day promotional campaign for 5TH Events. Bold visuals with playful typography to drive engagement and conversions.",
        image: "/images/port2.png",
        category: "Small Businesses",
        tags: ["CAMPAIGN"],
        link: "https://dribbble.com/shots/5th-events-valentine",
        order: 2,
    },
    {
        title: "Global Workforce Innovation Summit — Identity",
        description:
            "Brand identity and event collateral for the Global Workforce Innovation Summit. A professional, tech-forward visual language.",
        image: "/images/port3.png",
        category: "Non-Profits",
        tags: ["IDENTITY"],
        link: "https://dribbble.com/shots/gwis-identity",
        order: 3,
    },
    {
        title: "Neowe Technologies — Security Branding",
        description:
            "End-to-end branding for Neowe Technologies — a security and surveillance tech company. Clean, corporate design across all touchpoints.",
        image: "/images/port4.png",
        category: "Startups",
        tags: ["BRANDING", "UI/UX"],
        link: "https://dribbble.com/shots/neowe-tech-branding",
        order: 4,
    },
];

const testimonialsSeed = [
    {
        name: "Marie Kurosee",
        role: "Founder, Crescent Yume",
        quote:
            "Seyi has an incredible eye for detail. He took our rough ideas and turned them into a cohesive brand system that we are proud to show the world. His process is thorough and professional.",
        avatar: "",
        rating: 5,
    },
    {
        name: "David Olanrewaju",
        role: "CEO, TechBridge Africa",
        quote:
            "Seyi transformed our brand from a generic startup look into something that truly represents our mission. His strategic thinking combined with design excellence is rare to find.",
        avatar: "",
        rating: 5,
    },
    {
        name: "Amara Nwosu",
        role: "Creative Director, Bloom Studio",
        quote:
            "Working with Seyi was a game-changer. He didn't just design — he understood our story and translated it into a visual language that resonates with our audience.",
        avatar: "",
        rating: 5,
    },
];

const partnersSeed = [
    {
        name: "Webflow",
        logo: "data:image/svg+xml;utf8,%3Csvg%20width=%2224%22%20height=%2224%22%20viewBox=%220%200%2024%2024%22%20fill=%22white%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d=%22M16.63%2020H18.91L24%206.94H22.1L18.88%2015.25L15.35%206H12.92L10.97%2010.9L9.07%206H6.62L0%2023h2.15L6.68%2011.23L8.85%2016.89L11.02%2011.23L14.47%2020h2.16z%22%20/%3E%3C/svg%3E",
        order: 1,
    },
    {
        name: "Relume",
        logo: "data:image/svg+xml;utf8,%3Csvg%20width=%2224%22%20height=%2224%22%20viewBox=%220%200%2024%2024%22%20fill=%22white%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cpath%20d=%22M11.954%202.11a1%201%200%2001.092%200l9%205A1%201%200%200122%208v8a1%201%200%2001-.51.87l-9%205a1%201%200%2001-.98%200l-9-5A1%201%200%20012%2016V8a1%201%200%2001.51-.87l9-5zM4%2015.22V8.78l8-4.44l8%204.44v6.44l-8%204.44l-8-4.44zm8-2.66L6.5%209.5L12%206.44L17.5%209.5L12%2012.56z%22%20/%3E%3C/svg%3E",
        order: 2,
    },
];

export async function POST() {
    try {
        const portfolioCollection = await getCollection("portfolio");
        const testimonialsCollection = await getCollection("testimonials");
        const partnersCollection = await getCollection("partners");

        // Clear existing data
        await portfolioCollection.deleteMany({});
        await testimonialsCollection.deleteMany({});
        await partnersCollection.deleteMany({});

        // Insert seed data
        const portfolioItems = portfolioSeed.map((item) => ({
            ...item,
            createdAt: new Date(),
        }));
        const testimonialItems = testimonialsSeed.map((item) => ({
            ...item,
            createdAt: new Date(),
        }));
        const partnerItems = partnersSeed.map((item) => ({
            ...item,
            createdAt: new Date(),
        }));

        await portfolioCollection.insertMany(portfolioItems);
        await testimonialsCollection.insertMany(testimonialItems);
        await partnersCollection.insertMany(partnerItems);

        return NextResponse.json({
            message: "Database seeded successfully",
            portfolio: portfolioItems.length,
            testimonials: testimonialItems.length,
            partners: partnerItems.length,
        });
    } catch (error) {
        console.error("Seed error:", error);
        return NextResponse.json(
            { error: "Failed to seed database" },
            { status: 500 }
        );
    }
}
