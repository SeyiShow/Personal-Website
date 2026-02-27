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

export async function POST() {
    try {
        const portfolioCollection = await getCollection("portfolio");
        const testimonialsCollection = await getCollection("testimonials");

        // Clear existing data
        await portfolioCollection.deleteMany({});
        await testimonialsCollection.deleteMany({});

        // Insert seed data
        const portfolioItems = portfolioSeed.map((item) => ({
            ...item,
            createdAt: new Date(),
        }));
        const testimonialItems = testimonialsSeed.map((item) => ({
            ...item,
            createdAt: new Date(),
        }));

        await portfolioCollection.insertMany(portfolioItems);
        await testimonialsCollection.insertMany(testimonialItems);

        return NextResponse.json({
            message: "Database seeded successfully",
            portfolio: portfolioItems.length,
            testimonials: testimonialItems.length,
        });
    } catch (error) {
        console.error("Seed error:", error);
        return NextResponse.json(
            { error: "Failed to seed database" },
            { status: 500 }
        );
    }
}
