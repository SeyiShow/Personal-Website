"use client";
import { useState } from "react";
import styles from "./FAQs.module.css";

const faqs = [
    {
        question: "Can you help if I only have an idea?",
        answer:
            "Yes. In fact, that’s the best time to work together. I help shape ideas into clear, structured brands or products.",
    },
    {
        question: "Do you only work on design?",
        answer:
            "No. I focus on strategy first. Design and execution come after clarity.",
    },
    {
        question: "What is your price range?",
        answer:
            "Keeping costs reasonable for clients is a priority. My rates vary depending on the needs of the project. That said, my most basic package starts at $150.",
    },
    {
        question: "What tools / platforms do you use?",
        answer:
            "I primarily use Adobe packages I also use Figma.",
    },
    {
        question: "Do you work remotely?",
        answer:
            "Yes, I work with clients locally and internationally.",
    },
];

export default function FAQs() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    return (
        <section className={styles.faqs}>
            <div className="">
                <h2 className={`section-title ${styles.title}`}>FAQs</h2>

                <div className={styles.list}>
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className={`${styles.item} ${openIndex === i ? styles.open : ""}`}
                        >
                            <button className={styles.question} onClick={() => toggle(i)}>
                                <span>{faq.question}</span>
                                <span className={styles.icon}>{openIndex === i ? "−" : "+"}</span>
                            </button>
                            <div className={styles.answer}>
                                <p>{faq.answer}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
