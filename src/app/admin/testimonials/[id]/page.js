"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import styles from "../../admin.module.css";

export default function TestimonialForm({ params }) {
    const { id } = use(params);
    const isNew = id === "new";
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        quote: "",
        avatar: "",
        rating: 5,
    });
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (!isNew) {
            fetch(`/api/testimonials/${id}`)
                .then(res => res.json())
                .then(data => {
                    if (data && !data.error) setFormData(data);
                });
        }
    }, [id, isNew]);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        const uploadFormData = new FormData();
        uploadFormData.append("file", file);

        try {
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: uploadFormData,
            });
            const data = await res.json();
            if (data.imageUrl) {
                setFormData(prev => ({ ...prev, avatar: data.imageUrl }));
            } else {
                alert(data.error || "Upload failed");
            }
        } catch (err) {
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const url = isNew ? "/api/testimonials" : `/api/testimonials/${id}`;
        const method = isNew ? "POST" : "PUT";

        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push("/admin");
                router.refresh();
            } else {
                const errorData = await res.json();
                alert(errorData.error || "Failed to save testimonial");
            }
        } catch (error) {
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "rating" ? parseInt(value) : value });
    };

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1>{isNew ? "Add Testimonial" : "Edit Testimonial"}</h1>
                <button onClick={() => router.push("/admin")} className={styles.tabsBtn}>Back to Dashboard</button>
            </header>

            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                    <label>Name</label>
                    <input name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>Role / Company</label>
                    <input name="role" value={formData.role} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>Quote</label>
                    <textarea name="quote" value={formData.quote} onChange={handleChange} rows="4" required />
                </div>
                <div className={styles.formGroup}>
                    <label>Avatar</label>
                    <input type="file" onChange={handleFileUpload} accept="image/*" className={styles.fileInput} />
                    {uploading && <p className={styles.uploadStatus}>Uploading avatar...</p>}
                    {formData.avatar && (
                        <img src={formData.avatar} alt="Preview" className={styles.imagePreview} />
                    )}
                </div>
                <div className={styles.formGroup}>
                    <label>Rating (1-5)</label>
                    <input name="rating" type="number" min="1" max="5" value={formData.rating} onChange={handleChange} />
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" className={styles.addBtn} disabled={loading || uploading}>
                        {loading ? "Saving..." : "Save Testimonial"}
                    </button>
                </div>
            </form>
        </div>
    );
}
