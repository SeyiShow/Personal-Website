"use client";
import { useState, useEffect } from "react";
import styles from "./Testimonials.module.css";

const fallbackTestimonials = [
    {
        _id: "1",
        name: "Marie Kurosee",
        role: "Founder, Crescent Yume",
        quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.",
        rating: 5,
    },
];

export default function Testimonials() {
    const [testimonials, setTestimonials] = useState(fallbackTestimonials);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        async function fetchTestimonials() {
            try {
                const res = await fetch("/api/testimonials");
                if (res.ok) {
                    const data = await res.json();
                    if (data.length > 0) setTestimonials(data);
                }
            } catch (e) {
                // fallback already set
            }
        }
        fetchTestimonials();
    }, []);

    const nextTestimonial = () => {
        setCurrent((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const t = testimonials[current];

    return (
        <section className={styles.testimonials}>
            <div className="container">
                <div style={{ textAlign: "center" }}>
                    <p className="section-label">
                        TESTIMONIAL
                    </p>
                </div>

                <div className={styles.card}>
                    <div className={styles.stars}>
                        {[...Array(t.rating || 5)].map((_, i) => (
                            <span key={i} className={styles.star}>★</span>
                        ))}
                    </div>

                    <blockquote className={styles.quote}>
                        &ldquo;{t.quote}&rdquo;
                    </blockquote>

                    <div className={styles.author}>
                        <div className={styles.avatar}>
                            {t.name?.charAt(0)}
                        </div>
                        <div>
                            <p className={styles.authorName}>{t.name}</p>
                            <p className={styles.authorRole}>{t.role}</p>
                        </div>
                    </div>

                    {testimonials.length > 1 && (
                        <div className={styles.controls}>
                            <button onClick={prevTestimonial} className={styles.controlBtn} aria-label="Previous">
                                ←
                            </button>
                            <div className={styles.dots}>
                                {testimonials.map((_, i) => (
                                    <span
                                        key={i}
                                        className={`${styles.dot} ${i === current ? styles.activeDot : ""}`}
                                        onClick={() => setCurrent(i)}
                                    />
                                ))}
                            </div>
                            <button onClick={nextTestimonial} className={styles.controlBtn} aria-label="Next">
                                →
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
