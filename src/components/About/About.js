import Image from "next/image";
import styles from "./About.module.css";

export default function About() {
    return (
        <section id="about" className={styles.about}>
            <div className={`${styles.aboutInner}`}>
                <div className={styles.contentCol}>
                    <p className={styles.label}>MEET ME</p>
                    <h2 className={styles.title}>
                        Aligning Purpose with Impact—One Story at a Time.
                    </h2>
                    <div className={styles.desc}>
                        <p>
                            I&apos;m Oluwaseyi Victor Sorinade, driven by the belief that meaningful societal change begins with individuals gaining clarity about who they are and the value they bring. I guide people through a process of self-discovery, helping them align their strengths with impact. Through personal branding, I help individuals articulate their value with clarity and authenticity, not just to be seen, but to be trusted.

                        </p>
                        <p>
                            Professionally, with a background in industrial and
                            electrical engineering, I&apos;ve partnered with multiple successful
                            startups, helping them shape their identity through brand strategy,
                            design and excellent communication. I believe business success
                            starts with brand-awareness.
                        </p>
                    </div>
                </div>
                <div className={styles.imageCol}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/images/meet.png"
                            alt="Seyi Sorinade - Brand Strategist and Designer"
                            fill
                            sizes="(max-width: 968px) 100vw, 40vw"
                            className={styles.photo}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
