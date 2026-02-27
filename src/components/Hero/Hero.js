import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section id="mission" className={styles.hero}>
            <div className={`${styles.heroInner}`}>
                <div className={styles.heroContent}>
                    <p className="section-label">MISSION</p>
                    <h1 className={styles.heroTitle}>
                        Aligning Purpose with Impact—One Story at a Time.
                    </h1>
                    <div className={styles.heroTags}>
                        <span className={styles.tag}>BRANDING</span>
                        <span className={styles.tagDivider}></span>
                        <span className={styles.tag}>MARKETING</span>
                        <span className={styles.tagDivider}></span>
                        <span className={styles.tag}>DESIGN</span>
                    </div>
                    <p className={styles.heroDesc}>
                        I&apos;m an engineer-turned brand strategist. From industrial systems to
                        personal brands, I help individuals and startups articulate their
                        purposes purposefully.
                    </p>
                </div>
                <div className={styles.heroImage}>
                    <div className={styles.imageWrapper}>
                        <Image
                            src="/images/hero.png"
                            alt="Seyi Sorinade"
                            width={520}
                            height={600}
                            priority
                            className={styles.photo}
                        />
                        <Image
                            src="/images/meet.png"
                            alt="Seyi Sorinade Hover"
                            width={520}
                            height={600}
                            priority
                            className={`${styles.photo} ${styles.photoHover}`}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
