import styles from "./BrandMarquee.module.css";

const WebflowLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.63 20H18.91L24 6.94H22.1L18.88 15.25L15.35 6H12.92L10.97 10.9L9.07 6H6.62L0 23h2.15L6.68 11.23L8.85 16.89L11.02 11.23L14.47 20h2.16z" />
    </svg>
);

const RelumeLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.954 2.11a1 1 0 01.092 0l9 5A1 1 0 0122 8v8a1 1 0 01-.51.87l-9 5a1 1 0 01-.98 0l-9-5A1 1 0 012 16V8a1 1 0 01.51-.87l9-5zM4 15.22V8.78l8-4.44l8 4.44v6.44l-8 4.44l-8-4.44zm8-2.66L6.5 9.5L12 6.44L17.5 9.5L12 12.56z" />
    </svg>
);

const brands = [
    { name: "Webflow", icon: <WebflowLogo /> },
    { name: "Relume", icon: <RelumeLogo /> },
    { name: "Webflow", icon: <WebflowLogo /> },
    { name: "Relume", icon: <RelumeLogo /> },
    { name: "Webflow", icon: <WebflowLogo /> },
    { name: "Relume", icon: <RelumeLogo /> },
];

export default function BrandMarquee() {
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
                                {[...brands, ...brands].map((brand, i) => (
                                    <div key={i} className={styles.brandItem}>
                                        {brand.icon}
                                        <span className={styles.brandName}>{brand.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
