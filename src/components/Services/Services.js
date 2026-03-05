import Image from "next/image";
import styles from "./Services.module.css";

const services = [
    {
        title: "Personal Branding",
        description: "Clarifying who you are and how your story shapes your brand.",
    },
    {
        title: "Brand Consultation",
        description: "Helping businesses gain direction and find the best path forward.",
    },
    {
        title: "Brand Strategy & Design",
        description: "Building clear, intentional, repeatable brands.",
    },
    {
        title: "UI/UX Design",
        description: "Designing simple, modern digital experiences.",
    },
    {
        title: "Marketing & Communications",
        description: "Turning deals into real-time messages that land.",
    },
];

export default function Services() {
    return (
        <section className={styles.services}>
            <div className={`${styles.servicesInner}`}>
                <div className={styles.imageCol}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/images/seyi.jpeg"
                            alt="Skills and services"
                            width={480}
                            height={560}
                            className={styles.photo}
                        />
                    </div>
                </div>
                <div className={styles.contentCol}>
                    <p className="section-label">SKILLS &amp; PURPOSE</p>
                    <h2 className={styles.title}>
                        What I bring to the table...
                    </h2>
                    <div className={styles.grid}>
                        {services.map((service, i) => (
                            <div key={i} className={styles.serviceItem}>
                                <h3 className={styles.serviceTitle}>{service.title}</h3>
                                <p className={styles.serviceDesc}>{service.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
