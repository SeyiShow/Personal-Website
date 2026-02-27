import styles from "./TargetAudience.module.css";

export default function TargetAudience() {
    return (
        <section className={styles.targetAudience}>
            <div className="container">
                <div className={styles.inner}>
                    <p className={`section-label ${styles.label}`}>
                        WHO I LOVE TO WORK WITH
                    </p>
                    <div className={styles.tagsContainer}>
                        <span className={styles.tag}>Non-Profits</span>
                        <span className={styles.tag}>Startups</span>
                        <span className={styles.tag}>Personal Brands</span>
                        <span className={styles.tag}>Small Businesses</span>
                        <span className={styles.tag}>Agencies</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
