import styles from "./Statement.module.css";

export default function Statement() {
    return (
        <section className={styles.statement}>
            <div className="container">
                <div style={{ textAlign: "center" }}>
                    <p className="section-label">
                        WHY WORK WITH ME
                    </p>
                </div>
                <h2 className={styles.title}>Turning ideas into brands people trust and choose</h2>
                <p className={styles.desc}>
                    I help turn ideas into clean brands, working products, and strong messages.
                    I combine purpose, creativity, and strategy to help people build something real, and do it
                    well.
                </p>
            </div>
        </section>
    );
}
