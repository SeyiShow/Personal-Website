"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Portfolio.module.css";

const fallbackItems = [
    {
        _id: "1",
        title: "Témìlóràn",
        description: "A complete brand identity for Témìlóràn — a luxury beauty and lifestyle brand.",
        image: "/images/port1.png",
        category: "Personal Brands",
        tags: ["BRANDING", "SOCIALS"],
        link: "https://dribbble.com/shots/temiloran-branding"
    },
    {
        _id: "2",
        title: "5TH Events",
        description: "A vibrant Valentine's Day promotional campaign for 5TH Events.",
        image: "/images/port2.png",
        category: "Small Businesses",
        tags: ["CAMPAIGN"],
        link: "https://dribbble.com/shots/5th-events-valentine"
    },
    {
        _id: "3",
        title: "Global Workforce Innovation Summit",
        description: "Brand identity and event collateral for the Global Workforce Innovation Summit.",
        image: "/images/port3.png",
        category: "Non-Profits",
        tags: ["IDENTITY"],
        link: "https://dribbble.com/shots/gwis-identity"
    },
    {
        _id: "4",
        title: "Neowe Technologies",
        description: "End-to-end branding for Neowe Technologies.",
        image: "/images/port4.png",
        category: "Startups",
        tags: ["BRANDING", "UI/UX"],
        link: "https://dribbble.com/shots/neowe-tech-branding"
    },
];

const categories = ["All", "Non-Profits", "Startups", "Personal Brands", "Small Businesses", "Agencies"];

export default function Portfolio() {
    const [items, setItems] = useState(fallbackItems);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        async function fetchPortfolio() {
            try {
                const res = await fetch("/api/portfolio");
                if (res.ok) {
                    const data = await res.json();
                    if (data.length > 0) setItems(data);
                }
            } catch (e) {
                // fallback already set
            }
        }
        fetchPortfolio();
    }, []);

    const filtered = activeCategory === "All"
        ? items
        : items.filter((item) => item.category === activeCategory);

    // Grid layout mapping helper
    const renderCard = (item, extraClass = "") => {
        if (!item) return null;

        return (
            <div className={`${styles.card} ${extraClass}`} key={item._id}>
                <a
                    href={item.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.cardInner}
                >
                    <Image
                        src={item.image}
                        alt={item.title}
                        width={800}
                        height={item.image === "/images/port1.png" ? 1000 : 400}
                        className={styles.img}
                    />
                    <div className={styles.hoverOverlay}>
                        <div className={styles.tags}>
                            {(item.tags || []).map((tag, i) => (
                                <span key={i} className={styles.tag}>{tag}</span>
                            ))}
                        </div>
                        <h3 className={styles.hoverTitle}>
                            {item.title.split(" — ")[0]} <br />
                            {item.title.split(" — ")[1] || ""}
                        </h3>
                    </div>
                </a>
            </div>
        );
    };

    return (
        <section id="portfolio" className={styles.portfolio}>
            <div className="">
                <div className={styles.portfolioBox}>
                    <div className={styles.header}>
                        <h2 className={styles.title}>Portfolio</h2>
                        <p className={styles.subtitle}>
                            I&apos;ve shaped the brand journey of thriving businesses — bringing together engineering
                            precision and human-centered design.
                        </p>
                    </div>

                    <div className={styles.categories}>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                className={`${styles.pill} ${activeCategory === cat ? styles.active : ""}`}
                                onClick={() => setActiveCategory(cat)}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className={styles.grid}>
                        {/* First Item: Large Card */}
                        {renderCard(filtered[0], styles.largeCard)}

                        <div className={styles.rightSection}>
                            <div className={styles.topRow}>
                                {/* Second and Third Items */}
                                {renderCard(filtered[1])}
                                {renderCard(filtered[2])}
                            </div>
                            {/* Fourth Item: Wide Card */}
                            {renderCard(filtered[3], styles.wideCard)}
                        </div>
                    </div>


                </div>
            </div>
        </section>
    );
}
