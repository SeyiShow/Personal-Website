"use client";

import { useEffect, useState } from "react";
import styles from "./BrandMarquee.module.css";
import Image from "next/image";

export default function BrandMarquee() {
    const [partners, setPartners] = useState([]);

    useEffect(() => {
        const fetchPartners = async () => {
            try {
                const res = await fetch("/api/partners");
                if (res.ok) {
                    const data = await res.json();
                    setPartners(data);
                }
            } catch (err) {
                console.error("Error fetching partners:", err);
            }
        };
        fetchPartners();
    }, []);

    // If no partners are loaded yet or none exist, show nothing or a placeholder
    if (partners.length === 0) return null;

    // Multiply the partners array to ensure it's wide enough to fill the screen
    // so that the -50% translation is smooth and continuous
    const displayPartners = Array.from({ length: 8 }).flatMap(() => partners);

    return (
        <section className={styles.brandSection}>
            <div className="">
                <div className={styles.brandCard}>
                    <div className={styles.textContent}>
                        <p>We have worked with a wide range of clients and organizations, including:</p>
                    </div>

                    <div className={styles.marqueeArea}>
                        <div className={styles.pillContainer}>
                            <span className={styles.pill}>BRANDS THAT TRUST ME</span>
                        </div>
                        <div className={styles.marqueeWrapper}>
                            <div className={styles.marqueeTrack}>
                                {/* First part */}
                                <div className={styles.marqueeScrollPart}>
                                    {displayPartners.map((brand, i) => (
                                        <div key={`p1-${i}`} className={styles.brandItem}>
                                            <div className={styles.logoWrapper}>
                                                <img
                                                    src={brand.logo}
                                                    alt={brand.name}
                                                    className={styles.brandLogo}
                                                />
                                            </div>
                                            {/* <span className={styles.brandName}>{brand.name}</span> */}
                                        </div>
                                    ))}
                                </div>
                                {/* Second part */}
                                <div className={styles.marqueeScrollPart}>
                                    {displayPartners.map((brand, i) => (
                                        <div key={`p2-${i}`} className={styles.brandItem}>
                                            <div className={styles.logoWrapper}>
                                                <img
                                                    src={brand.logo}
                                                    alt={brand.name}
                                                    className={styles.brandLogo}
                                                />
                                            </div>
                                            {/* <span className={styles.brandName}>{brand.name}</span> */}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
