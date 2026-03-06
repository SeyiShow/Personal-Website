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
                            I&apos;m Oluwaseyi Victor Sorinade and I am driven by the belief that
                            societal change starts with individuals discovering their purpose. I
                            guide people on a journey of self-discovery, aligning their unique
                            strengths with positive impact. Through personal branding, I help
                            people articulate their value authentically, fostering integrity and
                            purpose.
                        </p>
                        <p>
                            Professionally, With a background in industrial and
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
