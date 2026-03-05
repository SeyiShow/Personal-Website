import styles from "./ConsultationCTA.module.css";

export default function ConsultationCTA() {
    return (
        <section id="consultation" className={styles.cta}>
            <div className={`container ${styles.ctaInner}`}>
                <p className={styles.label}>Not sure where to start?</p>
                <h2 className={styles.title}>
                    Start with a free design Consultation.
                </h2>

                <div style={{ marginBottom: "var(--space-md)" }}>
                    <p className={`section-label ${styles.darkLabel}`}>WHAT YOU GET</p>
                </div>

                <div className={styles.stepBox}>
                    <div className={styles.stepNumber}>01</div>
                    <p className={styles.desc}>
                        A 30-minute chat to discuss ways of
                        possible improvement or direction.
                    </p>
                </div>

                <a href="https://calendly.com/oyeyemivictor1/30min" className={`btn btn-outline ${styles.ctaBtn}`}>
                    Get Started
                </a>
            </div>
        </section>
    );
}
